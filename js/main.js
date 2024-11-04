const storage_key = 'books'
let books = JSON.parse(localStorage.getItem(storage_key)) || []

document.addEventListener('DOMContentLoaded', () => {
    const submitFormBook = document.getElementById('bookForm')
    const incompleteBookList = document.getElementById('incompleteBookList')
    const completeBookList = document.getElementById('completeBookList')

    function submitBook() {
        localStorage.setItem(storage_key, JSON.stringify(books))
    }

    function addBook(title, author, year, isComplete) {
        const newBook = {
            id: new Date().getTime(),
            title,
            author,
            year,
            isComplete
        }

        books.push(newBook)
        submitBook()
        renderPage()
    }

    function renderPage() {
        incompleteBookList.innerHTML = ''
        completeBookList.innerHTML = ''

        books.forEach(book => {
            const divElement = document.createElement('div')
            divElement.setAttribute('data-bookid', book.id)
            divElement.setAttribute('data-testid', 'bookItem')
            divElement.classList.add('book-item')

            divElement.innerHTML = `
                <h3 data-testid="bookItemTitle" id="title">${book.title}</h3>
                <p data-testid="bookItemAuthor" id="author">Penulis: ${book.author}</p>
                <p data-testid="bookItemYear" id="year">Tahun: ${book.year}</p>
                <div>
                    <button data-testid="bookItemIsCompleteButton" onclick="checkBookStatus(${book.id})" id="isComplete">
                        ${book.isComplete ? 'Belum selesai dibaca' : 'Selesai dibaca'}
                    </button>
                    <button data-testid="bookItemDeleteButton" onclick="deleteBook(${book.id})" id="deleteBook">Hapus Buku</button>
                </div>
            `
            if (book.isComplete) {
                completeBookList.appendChild(divElement)
            } else {
                incompleteBookList.appendChild(divElement)
            }
        })
    }

    window.checkBookStatus = function (id) {
        const book = books.find(book => book.id === id)
        if (book) {
            book.isComplete = !book.isComplete
            submitBook()
            renderPage()
        }
    }
    
    window.deleteBook = function (id) {
        books = books.filter(book => book.id !== id)
        submitBook()
        renderPage()
    }

    submitFormBook.addEventListener('submit', event => {
        event.preventDefault()

        const title = document.getElementById('bookFormTitle').value
        const author = document.getElementById('bookFormAuthor').value
        const year = parseInt(document.getElementById('bookFormYear').value)
        const isComplete = document.getElementById('bookFormIsComplete').checked

        addBook(title, author, year, isComplete)
        submitFormBook.reset()
    })

    renderPage()
})
