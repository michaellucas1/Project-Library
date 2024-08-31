const myLibrary=[];
const availableId=[];
const openModal = document.querySelector(".display-modal");
const dialog =document.querySelector("dialog");
const closeModal=document.querySelector(".close-modal");
const form=document.querySelector('.book-form');
const libraryContainer = document.querySelector(".library-container");
const resetStorage=document.querySelector(".reset-library");
let bookCounter=0;

resetStorage.addEventListener("click",()=>{
    localStorage.clear();
    removeAllBooks();
    bookExamples();   
});
function removeAllBooks(){
    while (libraryContainer.firstChild) {
        myLibrary.pop();
        libraryContainer.removeChild(libraryContainer.firstChild);
    }
}
function retrieveData(){
    console.log(localStorage.length)
    if(!(localStorage.length===0)){
        for(let i=0;i<localStorage.length-1;i++){
            const storedItem = localStorage.getItem(`mySavedLibrary${i}`);
            AddToLibrary(JSON.parse(storedItem));
        }
        bookCounter=JSON.parse(localStorage.getItem("savedBookCounter"));
        localStorage.clear();
    }
    else{
         bookExamples();                                      

    }
}
function librarySearch(bookID){
    for(let i=0;i<myLibrary.length;i++){
        if(bookID===myLibrary[i].ID){
            return i;
        }
    }
}

const titleArray =[
    "The Lightning Thief",
    "The Maze of Bones", 
    "Pride and Prejudice",
    "The Adventures of Huckleberry Finn"
];
const authorArray=[
    "Rick Riordan",
    "Rick Riordan", 
    "Jane Austen",
    "Mark Twain"
];
const numberOfPageArray=[377,220,279,327];
const readStatusArray=["Not yet","Not yet","Not yet","Not yet"];
function bookExamples(){
    for(let i=0;i<titleArray.length;i++){
        const book = {
            title:`${titleArray[i]}`,
            author:`${authorArray[i]}`,
            numberOfPage:`${numberOfPageArray[i]}`,
            readStatus:`${readStatusArray[i]}`
        }
        const newBook = new Book(book);
        AddToLibrary(newBook);
    }
}

class Book {
    constructor(dataObject) {
        if(availableId.length !== 0){
            this.ID = availableId.pop();
        }
        else{
            this.ID = ++bookCounter;
        }
        this.title = dataObject["title"];
        this.author = dataObject["author"];
        this.numberOfPage = dataObject["numberOfPage"];
        this.readStatus = dataObject["readStatus"];
    }
}
function AddToLibrary(newBook){
    console.log(bookCounter);
    myLibrary.push(newBook);
    libraryContainer.appendChild(generateElements(myLibrary[myLibrary.length-1]));
}

function generateElements(currentBook){
    const bookContainer = document.createElement("div");
    const bookEntry = document.createElement("div");
    const bookInfoContainer = document.createElement("div");
    const title = document.createElement("p");
    const author = document.createElement("p");
    const numberOfPage = document.createElement("p");
    const readStatus = document.createElement("p");
    const removeButton = document.createElement("button");
    const buttonRead=document.createElement("button");
    const buttonNotRead=document.createElement("button");
    const readButtonSpan=document.createElement("span");

    bookContainer.className="book-container";
    bookInfoContainer.className="book-info-container";
    bookEntry.className="book-entry";
    title.className="title";
    author.className="author-name";
    numberOfPage.className="total-pages";
    readStatus.className="status";
    removeButton.setAttribute("type","button");
    buttonRead.setAttribute("type","button");
    buttonNotRead.setAttribute("type","button");
    title.textContent=`${currentBook["title"]}`;
    author.textContent=`By: ${currentBook["author"]}`;
    numberOfPage.textContent=`Pages: ${currentBook["numberOfPage"]}`;
    removeButton.innerHTML=`&#10006;`;
    readStatus.textContent=`Reading: ${currentBook["readStatus"]}`;
    buttonRead.textContent=` Read `;
    buttonNotRead.textContent=` Not Read `;
    removeButton.addEventListener("click",()=>{
        availableId.push(currentBook.ID);
        libraryContainer.removeChild(bookEntry);
        myLibrary.splice(librarySearch(currentBook.ID),1);
    });
    buttonRead.addEventListener("click",(event)=>{
        myLibrary[librarySearch(currentBook.ID)].readStatus="Already read";
        bookInfoContainer.children[2].textContent=`Reading: ${currentBook["readStatus"]}`;
        buttonRead.hidden=true;
        buttonNotRead.hidden=false;
    });
    buttonNotRead.addEventListener("click",(event)=>{
        myLibrary[librarySearch(currentBook.ID)].readStatus="Not yet";
        bookInfoContainer.children[2].textContent=`Reading: ${currentBook["readStatus"]}`;
        buttonNotRead.hidden=true;
        buttonRead.hidden=false;

    });
    bookContainer.appendChild(title);
    bookInfoContainer.appendChild(author);
    bookInfoContainer.appendChild(numberOfPage);
    bookInfoContainer.appendChild(readStatus);
    readButtonSpan.appendChild(buttonRead);
    readButtonSpan.appendChild(buttonNotRead);
    if(currentBook["readStatus"]==="Already read"){
        buttonRead.hidden=true;
        buttonNotRead.hidden=false;
    }
    else{
        buttonNotRead.hidden=true;
        buttonRead.hidden=false;
    } 
    bookEntry.appendChild(removeButton);
    bookEntry.appendChild(bookContainer);
    bookEntry.appendChild(bookInfoContainer);
    bookEntry.appendChild(readButtonSpan);
    return bookEntry;
}

form.addEventListener("submit",(event)=>{
    event.preventDefault();
    const myFormData = new FormData(event.target);
    const formDataObject = {};
    myFormData.forEach((value,key)=>(formDataObject[key]=value));
    const newBook = new Book(formDataObject);
    AddToLibrary(newBook);
    dialog.close();
    form.reset()

});
openModal.addEventListener("click",()=>{
    dialog.showModal();
});
closeModal.addEventListener("click", ()=>{
    dialog.close();
});


window.addEventListener("beforeunload",(event)=>{
    event.preventDefault();
    for(let i=0;i<myLibrary.length;i++){
        localStorage.setItem(`mySavedLibrary${i}`,JSON.stringify(myLibrary[i]))
    }
    localStorage.setItem("savedBookCounter", JSON.stringify(bookCounter));
    
});

retrieveData();
