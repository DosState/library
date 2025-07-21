function Book(title, author, pages, readFlag){
    if(!new.target){
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readFlag = readFlag;
    this.id = crypto.randomUUID();
}

Book.prototype.info = function(){
    let readBook = "";
    if (this.readFlag===true){
        readBook = "not read yet";
    }
    else{
        readBook = "already read";
    }
    return  `${this.title} by ${this.author} of ${this.pages} pages, ${readBook}`;
}

Book.prototype.toggleReadStatus = function() {
    this.readFlag = !this.readFlag;
}


function addBookToLibrary(title, author, pages, readFlag){
    let book = new Book(title, author, pages, readFlag);
    myLibrary.push(book);
    populateTable()
}

function removeBookFromLibrary(bookId) {
    const index = myLibrary.findIndex(book => book.id === bookId);
    if (index !== -1) {
        myLibrary.splice(index, 1);
        populateTable();
    }
}

function toggleBookReadStatus(bookId) {
    const book = myLibrary.find(book => book.id === bookId);
    if (book) {
        book.toggleReadStatus();
        populateTable();
    }
}

function populateTable(){
    const tableBody = document.querySelector('table tbody');
            
    // Clear existing rows
    tableBody.innerHTML = '';
    
    myLibrary.forEach(book => {
        const row = tableBody.insertRow();
        row.setAttribute('data-book-id', book.id);
        
        const idCell = row.insertCell(0);
        const titleCell = row.insertCell(1);
        const authorCell = row.insertCell(2);
        const pagesCell = row.insertCell(3);
        const readCell = row.insertCell(4);
        const actionsCell = row.insertCell(5);
        
        idCell.textContent = book.id.slice(0, 8) + '...';
        idCell.title = book.id; // Full ID on hover
        titleCell.textContent = book.title;
        authorCell.textContent = book.author;
        pagesCell.textContent = book.pages;
        
        // Style read status
        readCell.textContent = book.readFlag ? "Yes" : "No";
        readCell.className = book.readFlag ? "read-yes" : "read-no";
        
        // Action buttons
        actionsCell.innerHTML = `
            <button class="action-btn toggle-read-btn" onclick="toggleBookReadStatus('${book.id}')">
                ${book.readFlag ? 'Mark Unread' : 'Mark Read'}
            </button>
            <button class="action-btn remove-btn" onclick="removeBookFromLibrary('${book.id}')">
                Remove
            </button>
        `;
    });
}

// Dialog management functions
function openNewBookDialog() {
    const dialog = document.getElementById('newBookDialog');
    dialog.showModal();
}

function closeNewBookDialog() {
    const dialog = document.getElementById('newBookDialog');
    const form = document.getElementById('newBookForm');
    form.reset(); // Clear form data
    dialog.close();
}

// Form submission handler
document.getElementById('newBookForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
    
    // Get form data
    const formData = new FormData(event.target);
    const title = formData.get('title');
    const author = formData.get('author');
    const pages = parseInt(formData.get('pages'));
    const read = formData.get('read') === 'on';
    
    // Add book to library
    addBookToLibrary(title, author, pages, read);
    
    // Close dialog
    closeNewBookDialog();
});

// Close dialog when clicking outside of it
document.getElementById('newBookDialog').addEventListener('click', function(event) {
    if (event.target === this) {
        closeNewBookDialog();
    }
});

// Initialize library with some sample books
const myLibrary = [];
addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 180, true);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, false);
addBookToLibrary("1984", "George Orwell", 328, true);
