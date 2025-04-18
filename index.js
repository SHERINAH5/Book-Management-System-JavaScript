// Get DOM references
const bookForm = document.getElementById("bookForm");
const bookList = document.getElementById("bookList");
const favoriteList = document.getElementById("favoriteList");
const unreadList = document.getElementById("unreadList");
const readList = document.getElementById("readList");

// Load books on page load
document.addEventListener("DOMContentLoaded", () => {
  loadBooks();
});

// Handle form submission
bookForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const bookId = document.getElementById("bookId").value.trim();
  const title = document.getElementById("title").value.trim();
  const author = document.getElementById("author").value.trim();
  const genre = document.getElementById("genre").value.trim();
  const status = document.getElementById("status").value;
  const imageInput = document.getElementById("image");

  if (!title || !author || !genre) {
    alert("All fields are required!");
    return;
  }

  const imageFile = imageInput.files[0];
  if (imageFile) {
    const reader = new FileReader();
    reader.onloadend = () => {
      saveBook(bookId, title, author, genre, status, reader.result);
    };
    reader.readAsDataURL(imageFile);
  } else {
    saveBook(bookId, title, author, genre, status, "");
  }
});

// Save or update book
function saveBook(bookId, title, author, genre, status, image) {
  let books = JSON.parse(localStorage.getItem("books")) || [];

  if (bookId) {
    // Update
    books = books.map(book =>
      book.id === bookId
        ? { ...book, title, author, genre, status, image: image || book.image }
        : book
    );
  } else {
    // Add
    const newBook = {
      id: crypto.randomUUID(),
      title,
      author,
      genre,
      status,
      image,
      favorite: false,
    };
    books.push(newBook);
  }

  localStorage.setItem("books", JSON.stringify(books));
  loadBooks();

  bookForm.reset();
  document.getElementById("bookId").value = "";
  bootstrap.Modal.getInstance(document.getElementById("addBookModal")).hide();
}

// Load books from localStorage
function loadBooks() {
  const books = JSON.parse(localStorage.getItem("books")) || [];

  bookList.innerHTML = "";
  favoriteList.innerHTML = "";
  unreadList.innerHTML = "";
  readList.innerHTML = "";

  books.forEach(book => {
    const card = createBookCard(book);
    bookList.appendChild(card);

    if (book.favorite) favoriteList.appendChild(createBookCard(book));
    if (book.status === "Unread") unreadList.appendChild(createBookCard(book));
    else readList.appendChild(createBookCard(book));
  });
}

// Create card
function createBookCard(book) {
  const card = document.createElement("div");
  card.className = "col-md-3 mb-3";
  card.innerHTML = `
    <div class="card shadow-sm">
      <img src="${book.image || "cover-placeholder.jpg"}" class="card-img-top" alt="Book Cover">
      <div class="card-body">
        <h5 class="card-title">${book.title}</h5>
        <p class="card-text">Author: ${book.author}</p>
        <p class="card-text"><small>Genre: ${book.genre}</small></p>
        <p class="card-text"><small>Status: ${book.status}</small></p>
        <button class="btn btn-sm btn-danger" onclick="deleteBook('${book.id}')">Delete</button>
        <button class="btn btn-sm btn-info" onclick="openEditBookModal('${book.id}')">Edit</button>
        <button class="btn btn-sm ${book.favorite ? "btn-warning" : "btn-outline-warning"}" onclick="toggleFavorite('${book.id}')">
          ${book.favorite ? "Unfavorite" : "Favorite"}
        </button>
      </div>
    </div>
  `;
  return card;
}

// Edit
function openEditBookModal(bookId) {
  const books = JSON.parse(localStorage.getItem("books")) || [];
  const book = books.find(b => b.id === bookId);

  if (!book) {
    console.error("Book not found!");
    return;
  }

  const modalElement = document.getElementById("addBookModal");
  const modal = new bootstrap.Modal(modalElement);
  modal.show();

  setTimeout(() => {
    document.querySelector(".modal-title").innerText = "Edit Book";
    document.querySelector("button[type='submit']").innerText = "Update Book";

    document.getElementById("bookId").value = book.id;
    document.getElementById("title").value = book.title;
    document.getElementById("author").value = book.author;
    document.getElementById("genre").value = book.genre;
    document.getElementById("status").value = book.status;
  }, 100);
}

//delete books
function deleteBook(bookId) {
  if (confirm("Are you sure you want to delete this book?")) {
    let books = JSON.parse(localStorage.getItem("books")) || [];
    books = books.filter((book) => book.id !== bookId);
    localStorage.setItem("books", JSON.stringify(books));
    loadBooks();
  }
}


// Toggle Favorite
function toggleFavorite(bookId) {
  let books = JSON.parse(localStorage.getItem("books")) || [];

  books = books.map(book => {
    if (book.id === bookId) {
      return { ...book, favorite: !book.favorite };
    }
    return book;
  });

  localStorage.setItem("books", JSON.stringify(books));
  loadBooks();
}

// Search
function searchBooks(input) {
  const query = input.value.toLowerCase().trim();
  const books = JSON.parse(localStorage.getItem("books")) || [];

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(query) ||
    book.author.toLowerCase().includes(query)
  );

  bookList.innerHTML = "";

  if (filteredBooks.length === 0) {
    bookList.innerHTML = `<p class="text-center text-muted">No books found</p>`;
    return;
  }

  filteredBooks.forEach(book => {
    bookList.appendChild(createBookCard(book));
  });
}

// Sort
function sortBooks(criteria) {
  let books = JSON.parse(localStorage.getItem("books")) || [];

  if (criteria === "az") {
    books.sort((a, b) => a.title.localeCompare(b.title));
  } else if (criteria === "za") {
    books.sort((a, b) => b.title.localeCompare(a.title));
  } else if (criteria === "author") {
    books.sort((a, b) => a.author.localeCompare(b.author));
  }

  bookList.innerHTML = "";
  books.forEach(book => bookList.appendChild(createBookCard(book)));
}
