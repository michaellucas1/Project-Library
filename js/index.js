const myLibrary=[];
const displayModal = document.querySelector(".display-modal");
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
function Book(formDataObject){
    this.ID=++bookCounter;
    this.title=formDataObject["title"];
    this.author=formDataObject["author"];
    this.numberOfPage = formDataObject["number-of-page"];
    this.readStatus=formDataObject["read-status"];   
}
function AddToLibrary(){}
function removeAllChildNodes(){
     while(libraryContainer.firstChild){
        libraryContainer.removeChild(libraryContainer.firstChild);
     }
}
function displayLibrary(){
    removeAllChildNodes(libraryContainer);
    for(let i=0;i<myLibrary.length;i++){
         libraryContainer.appendChild(generateElements(myLibrary[i]));
    }   
}
function generateElements(currentBook){
    const bookContainer = document.createElement("div");
    const title = document.createElement("p");
    const author = document.createElement("p")
    const numberOfPage = document.createElement("p");
    const readStatus = document.createElement("p");
    const removeButton = document.createElement("button");
    removeButton.addEventListener("click",()=>{
        libraryContainer.removeChild(bookContainer);
        myLibrary.splice(librarySearch(currentBook.ID),1);
    })
    title.textContent=`${currentBook["title"]}`;
    author.textContent=`${currentBook["author"]}`;
    numberOfPage.textContent=`${currentBook["numberOfPage"]}`;
    readStatus.textContent=`${currentBook["readStatus"]}`;
    bookContainer.appendChild(title);
    bookContainer.appendChild(author);
    bookContainer.appendChild(numberOfPage);
    bookContainer.appendChild(readStatus);
    bookContainer.appendChild(removeButton);
    return bookContainer;
}



form.addEventListener("submit",(event)=>{
    event.preventDefault();
    const myFormData = new FormData(event.target);
    
    const formDataObject = {};
    myFormData.forEach((value,key)=>(formDataObject[key]=value));
    const newBook = new Book(formDataObject);

    
    myLibrary.push(newBook);
    console.log(myLibrary);
    displayLibrary();
    dialog.close();

});
displayModal.addEventListener("click",()=>{
    dialog.showModal();
});
closeModal.addEventListener("click", ()=>{
    dialog.close();
});
