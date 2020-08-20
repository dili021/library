const formButton = document.createElement("button");
formButton.innerText = "Add New Book";
document.body.insertAdjacentElement("beforeend", formButton);
const bookForm = document.createElement("form");
bookForm.innerHTML = `
  <label htmlFor="title">title</label>
  <input type="text" name="title" id="title"/>
  <label htmlFor="Author">Author</label>
  <input type="text" name="Author" id="author"/>
  <label htmlFor="Rating">Rating</label>
  <input type="number" min="1" max="5" name="rating" id="rating"/>
  <label htmlFor="isRead">Have you read it?</label>
  <input type="checkbox" name="isRead" id="isRead"/>
  <label htmlFor="pages">How many pages?</label>
  <input type="number" min="1" max="10000" name="pages" id="pages"/>
  <button type="submit">Add</button>
`;

const myLibrary = JSON.parse(localStorage.getItem("library"))
  ? JSON.parse(localStorage.getItem("library"))
  : [];
const libraryEl = document.querySelector(".my-library");

function addBookToLibrary(book) {
  myLibrary.push(book);
  updateLibraryLS();
  render();
}

function updateLibraryLS() {
  localStorage.setItem("library", JSON.stringify(myLibrary));
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

function toggleStatus(idx) {
  const book = myLibrary[idx];
  book.isRead = !book.isRead;
  render();
}

book1 = new Book("L.O.T.R.", "J.R.Tolkien", 5, true, 600);
book2 = new Book("Rich Dad Poor Dad", "Robert Kiyosaki", 5, false, 250);
book3 = new Book("Two States", "Chetan Bhagat", 5, true, 400);

function createDOMLibrary() {
  return myLibrary
    .map(
      (book, idx) => `
  <div class="book-card">
    <ul>
      <li>${book.title}</li>
      <li>${book.author}</li>
      <li>Rating:${book.rating}</li>

      <li>${book.pages} pages</li>
    </ul>
    <div class="book-buttons">
      <div class="is-read">
       <button onclick="toggleStatus(${idx})" >${
        book.isRead ? "Already read" : "Not read yet"
        }</button>

      </div>
      <button id="remove-book" onclick="this.closest('.book-card').remove(); myLibrary.splice(${idx}, 1); updateLibraryLS()" >X</button>
    </div>
  </div>
  `
    )
    .join("");
}

function addNewBook(e) {
  e.preventDefault();
  const book = new Book(
    (title = e.target.title.value),
    (author = e.target.author.value),
    (rating = e.target.rating.value),
    (isRead = e.target.isRead.value),
    (pages = e.target.pages.value)
  );
  addBookToLibrary(book);
}

function render() {
  libraryEl.innerHTML = createDOMLibrary();
}

function renderForm() {
  document.body.appendChild(bookForm);
}

bookForm.addEventListener("submit", addNewBook);
formButton.addEventListener("click", renderForm);
render();
