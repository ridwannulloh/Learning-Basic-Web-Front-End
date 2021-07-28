const UNCOMPLETED_LIST_BOOK_ID = "incompleteBookshelfList";
const COMPLETED_LIST_BOOK_ID = "completeBookshelfList";
const BOOK_ITEMID = "itemId";


function makeBook(title, author, year, isComplete) {
    const textTitle = document.createElement("h3");
    textTitle.innerText = title;

    const textAuthor = document.createElement("p");
    textAuthor.innerText = "Penulis: "+ author;

    const textYear = document.createElement("p");
    textYear.innerText = "Tahun: "+ year;

    const divAction = document.createElement("div");
    divAction.classList.add("action")

    const article = document.createElement("article");
    article.classList.add("book_item")
    article.append(textTitle, textAuthor, textYear, divAction);

    if(isComplete){
        divAction.append(
            createInCompleteButton("Belum selesai di Baca"),
            createDeleteButton("Hapus buku")
        );
    } else {
        divAction.append(
            createCompleteButton("Selesai di Baca"),
            createDeleteButton("Hapus buku")
        );
    }

    return article;
}

function createInCompleteButton(textButton) {
    return createButton("green", textButton, function(event){
        setBookAsInComplete(event.target.parentElement.parentElement);
    });
}

function createCompleteButton(textButton) {
    return createButton("green", textButton, function(event){
        setBookAsComplete(event.target.parentElement.parentElement);
    });
}

function createDeleteButton(textButton) {
    return createButton("red", textButton, function(event){
        removeBook(event.target.parentElement.parentElement);
    });
}

function createButton(buttonTypeClass, textButton, eventListener ) {
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.innerHTML = textButton;
    button.addEventListener("click", function (event) {
        eventListener(event);
    });
    return button;
}

function setBookAsComplete(booksElement) {
    const listCompleted = document.getElementById(COMPLETED_LIST_BOOK_ID);
    const textTitle = booksElement.querySelector("h3").innerText;
    const paragraph = booksElement.querySelectorAll("p");
    const textAuthor = paragraph[0].innerText.split(" ")[1];
    const textYear = paragraph[1].innerText.split(" ")[1];

    const newBook = makeBook(textTitle, textAuthor, textYear, true);
    
    const book = findBook(booksElement[BOOK_ITEMID]);
    book.isCompleted = true;
    newBook[BOOK_ITEMID] = book.id;
    
    listCompleted.append(newBook);
    booksElement.remove();

    updateDataToStorage();
}

function removeBook(booksElement) {
    const bookPosition = findBookIndex(booksElement[BOOK_ITEMID]);
    books.splice(bookPosition, 1);

    booksElement.remove();
    updateDataToStorage();
}

function setBookAsInComplete(booksElement){
    const listInCompleted = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);
    const textTitle = booksElement.querySelector("h3").innerText;
    const paragraph = booksElement.querySelectorAll("p");
    const textAuthor = paragraph[0].innerText.split(" ")[1];
    const textYear = paragraph[1].innerText.split(" ")[1];

    const newBook = makeBook(textTitle, textAuthor, textYear, false);

    const book = findBook(booksElement[BOOK_ITEMID]);
    book.isCompleted = false;
    newBook[BOOK_ITEMID] = book.id;

    listInCompleted.append(newBook);
    booksElement.remove();

    updateDataToStorage();
}

function addBooks() {
    const uncompletedBOOKList = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);
    const completedBOOKList = document.getElementById(COMPLETED_LIST_BOOK_ID);
    const title = document.getElementById("inputBookTitle").value;
    const author = document.getElementById("inputBookAuthor").value;
    const year = document.getElementById("inputBookYear").value;
    const isComplete = document.getElementById("inputBookIsComplete").checked;
    console.log(isComplete)

    const book = makeBook(title, author, year, isComplete);

    const bookObject = composeBookObject(title, author, year, isComplete);
    
    book[BOOK_ITEMID] = bookObject.id;
    books.push(bookObject);
    
    if (isComplete) {
        console.log("complete")
        completedBOOKList.append(book)
    } else {
        console.log("uncomplete")
        uncompletedBOOKList.append(book);
    }

    updateDataToStorage();
}
