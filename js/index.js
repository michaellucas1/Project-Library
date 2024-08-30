const myLibrary=[];
const availableId=[];
const openModal = document.querySelector(".display-modal");
const dialog =document.querySelector("dialog");
const closeModal=document.querySelector(".close-modal");
const form=document.querySelector('.book-form');
const libraryContainer = document.querySelector(".library-container");
let bookCounter=0;


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
    const radioButtonYes = document.createElement("input");
    const radioButtonNo = document.createElement("input");
    const labelYes =document.createElement("label");
    const labelNo =document.createElement("label");
    const radioContainer=document.createElement("span");
    const radioForm = document.createElement("form");
    bookContainer.className="book-container";
    bookInfoContainer.className="book-info-container";
    bookEntry.className="book-entry";
    title.className="title";
    author.className="author-name";
    numberOfPage.className="total-pages";
    readStatus.className="status";
    radioButtonYes.setAttribute("type","radio");
    radioButtonYes.setAttribute("id",`yes${currentBook.ID}`);
    radioButtonYes.setAttribute("name","readingStatus");
    radioButtonYes.setAttribute("value","yes");
    labelYes.setAttribute("for",`yes${currentBook.ID}`);
    radioButtonNo.setAttribute("type","radio");
    radioButtonNo.setAttribute("id",`no${currentBook.ID}`)
    radioButtonNo.setAttribute("name","readingStatus");
    radioButtonNo.setAttribute("value","no");
    labelNo.setAttribute("for",`no${currentBook.ID}`);
    
    title.textContent=`${currentBook["title"]}`;
    author.textContent=`By: ${currentBook["author"]}`;
    numberOfPage.textContent=`Pages: ${currentBook["numberOfPage"]}`;
    removeButton.innerHTML=`&#10006;`;
    readStatus.textContent=`Reading: ${currentBook["readStatus"]}`;
    labelYes.textContent=` Yes `;
    labelNo.textContent=` No `;
    removeButton.addEventListener("click",()=>{
        availableId.push(currentBook.ID);
        libraryContainer.removeChild(bookEntry);
        myLibrary.splice(librarySearch(currentBook.ID),1);
    });
    radioButtonYes.addEventListener("change",(event)=>{
        myLibrary[librarySearch(currentBook.ID)].readStatus="Already read";
        bookInfoContainer.children[2].textContent=`Reading: ${currentBook["readStatus"]}`;
    });
    radioButtonNo.addEventListener("change",(event)=>{
        myLibrary[librarySearch(currentBook.ID)].readStatus="Not yet";
        bookInfoContainer.children[2].textContent=`Reading: ${currentBook["readStatus"]}`;
    });
    bookContainer.appendChild(title);
    bookInfoContainer.appendChild(author);
    bookInfoContainer.appendChild(numberOfPage);
    bookInfoContainer.appendChild(readStatus);
    radioContainer.appendChild(radioButtonYes);
    radioContainer.appendChild(labelYes);
    radioContainer.appendChild(radioButtonNo);
    radioContainer.appendChild(labelNo);
    radioForm.appendChild(radioContainer);
    bookEntry.appendChild(removeButton);
    bookEntry.appendChild(bookContainer);
    bookEntry.appendChild(bookInfoContainer);
    bookEntry.appendChild(radioForm);
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
bookExamples();
