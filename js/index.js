
class Book {
    #ID;
    constructor(dataObject) {
        this.title = dataObject["title"];
        this.author = dataObject["author"];
        this.numberOfPage = dataObject["numberOfPage"];
        this.readStatus = dataObject["readStatus"];
        this.setID=(value)=>{this.#ID=value};
        this.getID=()=>{return this.#ID};
    }
    getID(){
        return this.#ID;
    }
    setID(value){
        this.#ID=value;
    }
}
class ExampleBook{
    #titleArray=[];
    #authorArray=[];
    #numberOfPageArray=[];
    #readStatusArray=[];
    constructor(){
        this.#initialize();
    }
    #initialize(){
        this.#titleArray =[
            "The Lightning Thief",
            "The Maze of Bones", 
            "Pride and Prejudice",
            "The Adventures of Huckleberry Finn"
        ];
        this.#authorArray=[
            "Rick Riordan",
            "Rick Riordan", 
            "Jane Austen",
            "Mark Twain"
        ];
        this.#numberOfPageArray=[377,220,279,327];
        this.#readStatusArray=["Not yet","Not yet","Not yet","Not yet"];
    }
    getTitleArray(){
        return this.#titleArray;
    }
    getAuthorArray(){
        return this.#authorArray;
    }
    getNumberOfPageArray(){
        return this.#numberOfPageArray;
    }
    getReadStatusArray(){
        return this.#readStatusArray;
    }
}
class Library{
    #myLibrary=[];
    #availableId=[];
    #bookCounter=0;
    constructor(){
        this.libraryContainer = document.querySelector(".library-container");
        this.resetStorage = document.querySelector(".reset-library");
        this.form=document.querySelector('.book-form'); 
        this.#initialize();
    }
    #initialize(){
        this.form.addEventListener("submit",this.#submit.bind(this));
        window.addEventListener("beforeunload",this.#saveData.bind(this));
        this.resetStorage.addEventListener("click",this.resetLibrary.bind(this));
    }
    #incrementCounter(){
        this.#bookCounter+=1;
    }
    #setCounter(value){
        this.#bookCounter=value;
    }
    #getCounter(){
        return this.#bookCounter;
    }
    #saveData(event){
        for(let i=0;i <this.#myLibrary.length;i++){
            localStorage.setItem(`mySavedLibrary${i}`,JSON.stringify(this.#myLibrary[i]));
        }
        localStorage.setItem("savedBookCounter", JSON.stringify(this.#getCounter()));
    }
    resetLibrary(){
        localStorage.clear();
        this.removeAllBooks();
        this.#bookExamples();
    }
    removeAllBooks(){
        while (this.libraryContainer.firstChild) {
            this.#myLibrary.pop();
            this.libraryContainer.removeChild(this.libraryContainer.firstChild);
        }
    }
    #bookExamples(){
        const examples = new ExampleBook();
        for(let i=0;i<examples.getTitleArray().length;i++){
            const book = {
                title:`${examples.getTitleArray()[i]}`,
                author:`${examples.getAuthorArray()[i]}`,
                numberOfPage:`${examples.getNumberOfPageArray()[i]}`,
                readStatus:`${examples.getReadStatusArray()[i]}`
            }
            const newBook = new Book(book);
            this.#AddToLibrary(newBook);
        }
    }
    #librarySearch(bookID){
        for(let i=0;i<this.#myLibrary.length;i++){
            if(bookID===this.#myLibrary[i].getID()){
                return i;
            }
        }
    }
    #AddToLibrary(newBook){
        if(this.#availableId.length !== 0){
            newBook.setID(this.#availableId.pop());
        }
        else{
            this.#incrementCounter();
            newBook.setID(this.#getCounter());
        }
        this.#myLibrary.push(newBook);
        this.libraryContainer.appendChild(this.#generateElements(this.#myLibrary[this.#myLibrary.length-1]));
    }
    #submit(event){
        event.preventDefault();
        const myFormData = new FormData(event.target);
        const formDataObject = {};
        myFormData.forEach((value,key)=>(formDataObject[key]=value));
        const newBook = new Book(formDataObject);
        this.#AddToLibrary(newBook);
        form.reset()
    }
    #generateElements(currentBook){
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
            this.#availableId.push(currentBook.getID());
            this.libraryContainer.removeChild(bookEntry);
            this.#myLibrary.splice(this.#librarySearch(currentBook.getID()),1);
        });
        buttonRead.addEventListener("click",(event)=>{
            this.#myLibrary[this.#librarySearch(currentBook.getID())].readStatus="Already read";
            bookInfoContainer.children[2].textContent=`Reading: ${currentBook["readStatus"]}`;
            buttonRead.hidden=true;
            buttonNotRead.hidden=false;
        });
        buttonNotRead.addEventListener("click",(event)=>{
            this.#myLibrary[librarySearch(currentBook.getID())].readStatus="Not yet";
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
    retrieveData(){
        if(!(localStorage.length===0)){
            for(let i=0;i<localStorage.length-1;i++){
                const storedItem = localStorage.getItem(`mySavedLibrary${i}`);
                const book = JSON.parse(storedItem);
                const newBook = new Book(book);
                this.#AddToLibrary(newBook);
            }
            this.#setCounter(JSON.parse(localStorage.getItem("savedBookCounter")));
            localStorage.clear();
        }
        else{ 
             this.#bookExamples();                                      
    
        }
    }
}
class ModalEventListeners{
    constructor(){
        this.dialog =document.querySelector("dialog");
        this.closeModal=document.querySelector(".close-modal");  
        this.openModal = document.querySelector(".display-modal");
        this.#initialize();
    }
    #initialize(){
        this.openModal.addEventListener("click",this.#open.bind(this));
        this.closeModal.addEventListener("click",this.#close.bind(this));
        
    }
    #open(){
        this.dialog.showModal();
    }
    #close(){
        this.dialog.close();
    }
    
}
new ExampleBook();
new ModalEventListeners();
new Library().retrieveData();
