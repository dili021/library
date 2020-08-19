const myLibrary = [];
const libraryEl = document.querySelector(".my-library");

function addBookToLibrary(book) {
  myLibrary.push(book);
}

class Book {
  constructor(title, author, rating, isRead, pages) {
    this.title = title;
    this.author = author;
    this.rating = rating;
    this.isRead = isRead;
    this.pages = pages;
  }
}
book1 = new Book("L.O.T.R.", "J.R.Tolkien", 5, true, 600);
book2 = new Book("Rich Dad Poor Dad", "Robert Kiyosaki", 5, true, 250);
book3 = new Book("Two States", "Chetan Bhagat", 5, true, 400);

function createDOMLibrary() {
  return myLibrary
    .map(
      book => `
  <div class="book-card">
  <ul>
    <li>${book.title}</li>
    <li>by: ${book.author}</li>
    <li>Rating:${book.rating}</li>
    <li>Already read: ${book.isRead}</li>
    <li>${book.pages} pages</li>
    </ul>
  </div>
  `
    )
    .join("");
}

function render() {
  libraryEl.innerHTML = createDOMLibrary();
}

addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);
render();
