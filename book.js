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

function addBookToLibrary(title, author, pages, library){
    let book = new Book(title, author, pages, false);
    library.push(book);
}

const myLibrary = [];
addBookToLibrary("aomondo", "bibbulu", 128, myLibrary)
console.log(myLibrary)
addBookToLibrary("labbolo", "costanzo", 12248, myLibrary)
console.log(myLibrary)