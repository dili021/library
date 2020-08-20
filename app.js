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
  <div class="is-read">
    <label htmlFor="isRead">Have you read it?</label>
    <input type="checkbox" name="isRead" id="isRead"/>
    </div>
  <label htmlFor="pages">How many pages?</label>
  <input type="number" min="1" max="10000" name="pages" id="pages"/>
  <button type="submit">Add</button>
`;

const libraryEl = document.querySelector(".my-library");

const myLibrary = JSON.parse(localStorage.getItem("library"))
  ? JSON.parse(localStorage.getItem("library"))
  : [];

function updateLibraryLS() {
  localStorage.setItem("library", JSON.stringify(myLibrary));
}

function addBookToLibrary(book) {
  myLibrary.push(book);
  updateLibraryLS();
  render();
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

function inputIsValid(inputsArray) {
  let result = true;
  inputsArray.forEach(input => {
    if (input === "") {
      result = false;
    }
  });
  if (!result) {
    alert("You need to fill out at least the title and author");
  }
  return result;
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
  if (inputIsValid([title, author])) {
    addBookToLibrary(book);
  }
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
