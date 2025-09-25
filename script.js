//Targeting the elementd in the DOM
const showModal = document.querySelector(".open-modal");
const modal = document.querySelector("dialog");
const closeAddModal = document.querySelector("#cancel-add");
const closeRemoveModal =document.querySelector("#cancel-remove");
const closeInfoModal = document.querySelector("#ok");
const addBook = document.querySelector("#add-book");
const bookContainer = document.querySelector(".books");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const page = document.querySelector("#pages");
const statusOfBook = document.querySelector("#status");
const bookInfo = document.querySelector(".info")
const delModal = document.querySelector("#remove-modal");
const showBookInfo = document.querySelector("#showInfo");


//Opens the modal on the page
showModal.addEventListener('click', () => {
    modal.showModal();
});

// Closes the modal on the page
closeAddModal.addEventListener('click', (e) => {
    e.preventDefault();
    modal.close();
});

closeRemoveModal.addEventListener('click', (e) => {
    e.preventDefault();
    delModal.close();
});

closeInfoModal.addEventListener('click', (e) => {
    e.preventDefault();
    showBookInfo.close();
});

//Add a new book
addBook.addEventListener("click", () => {
    const bookTitle = title.value;
    const bookAuthor = author.value;
    const numPage = page.value;
    const bookstatus = statusOfBook.value;

    if (bookTitle === "" || bookAuthor === "" || numPage === "" || bookstatus === "") {
        return;
    } else {
        addToLibrary(bookTitle, bookAuthor, numPage, bookstatus);
    }


    displayBook();

});


// Delete a book from the library
let bookToDelete = null;

bookContainer.addEventListener('click', (e) => {
    if(e.target.classList.contains("remove")){
        bookToDelete = e.target.dataset.id;
        delModal.showModal();
    }
});

delModal.addEventListener('close', () => {
    if (delModal.returnValue === "confirm" && bookToDelete) {
        const index = myLibrary.findIndex(item => item.id === bookToDelete);
        if (index !== -1) {
            myLibrary.splice(index, 1);
        }

        bookToDelete = null;
        displayBook();
    }
});

// Toggling book status
bookContainer.addEventListener("change", (e) => {
  if (e.target.type === "checkbox") {
    const index = myLibrary.findIndex(item => item.id === e.target.dataset.id);
    if (index !== -1) {
      myLibrary[index].status = e.target.checked ? "read" : "unread";
    }
  }
});

//Show book information
bookContainer.addEventListener('click', (e) =>{
    if(e.target.classList.contains("details")){
        const index = myLibrary.findIndex(item => item.id === e.target.dataset.id);
        if(index !== -1){
            bookInfo.textContent= myLibrary[index].info();
            showBookInfo.showModal();
        }
    }
});


// Creating an Array to store the book objects
const myLibrary = [];

// Creating the 'Book' constructor
function Book(title, author, pages, status) {

    if (!new.target) {
        throw Error("Add the 'new' keyword when creating a new object with the constructor!!!")
    }

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;

    this.info = function () {
        return `${this.title} by ${this.author}, has ${this.pages} pages. It is ${this.status}.`
    }
}

//Creating the 'displayBook' function
function displayBook() {

    bookContainer.innerHTML = "";

    myLibrary.forEach((book) => {
        const card = document.createElement("div");
        card.classList.add("card");

        const title = document.createElement("p");
        title.classList.add("title");
        title.textContent = `${book.title}`;

        const detail = document.createElement("div");
        detail.classList.add("details");
        detail.setAttribute("data-id", book.id);
        detail.textContent = "Details....";

        const controls = document.createElement("div");
        controls.classList.add("card-control");

        const remove = document.createElement("img");
        remove.classList.add("remove");
        remove.setAttribute("src", "image/trash-can-outline.svg");
        remove.setAttribute("data-id", book.id);

        const div = document.createElement("div");
        div.textContent = "Read";

        const toggle = document.createElement("label");
        toggle.classList.add("toggle");

        const input = document.createElement("input");
        input.setAttribute("type", "checkbox");
        input.setAttribute("data-id", book.id);
        if (book.status === 'Read'.toLowerCase()) {
            input.checked = true;
        }

        toggle.appendChild(input);
        div.appendChild(toggle);
        controls.appendChild(remove);
        controls.appendChild(div);
        card.appendChild(title);
        card.appendChild(detail);
        card.appendChild(controls);

        bookContainer.appendChild(card);
    });

}


// Creating the 'addToLibrary' function 
function addToLibrary(title, author, pages, status) {

    const obj = new Book(title, author, pages, status);
    obj.id = crypto.randomUUID();
    myLibrary.push(obj);

}

addToLibrary("The Holy Bible", "Various Authors", 1200, "read");
addToLibrary("Things Fall Apart", "Chinua Achebe", 2, "read");
addToLibrary("War and Peace", "Leo Tolstoy", 1287, "read");
displayBook();