function Book(title, author, pages, readFlag){
    if(!new.target){
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readFlag = readFlag;

    this.info = function(){
        let readBook = "";
        if (this.readFlag===true){
            readBook = "not read yet";
        }
        else{
            readBook = "already read";
        }
        return  `${this.title} by ${this.author} of ${this.pages} pages, ${readBook}`;
    }
}

let book = new Book("aomondo", "bibbulu", 128, true)
console.log(book.info())
book = new Book("labbolo", "costanzo", 12248, false)
console.log(book.info())