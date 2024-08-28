const myLibrary=[];

function Book(){

}
function AddToLibrary(){}

const displayModal = document.querySelector(".display-modal");
const dialog =document.querySelector("dialog");
const closeModal=document.querySelector(".close-modal");
const form=document.querySelector('.book-form');


form.addEventListener("submit",(event)=>{
    event.preventDefault();
    console.dir(event);
    const myFormData = new FormData(event.target);
    
    const formDataObject = {};
    myFormData.forEach((value,key)=>(formDataObject[key]=value));
    console.log(formDataObject);
});
displayModal.addEventListener("click",()=>{
    dialog.showModal();
});
closeModal.addEventListener("click", ()=>{
    dialog.close();
});
