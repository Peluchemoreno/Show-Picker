let displayText = document.querySelector("#display-text");
let showAddSection = document.querySelector('.show-add-modal');
let showAddSectionButton = document.querySelector('.show-add-section-button');
let value = document.querySelector('.userAddedValue');
let userInput = value.value;
let randomShow = document.querySelector('.random-show');
let showAllButton = document.querySelector('.show-all');
let modal = document.querySelector('.modal')
let modalBody = document.querySelector('.modal-body');
let modalClose = document.querySelector('.close-modal');
let show = document.querySelector('p');
let confirmationScreen = document.querySelector('.confirm-screen')
let confirmDelete = document.querySelector('.confirm-button');
let denyDelete = document.querySelector('.deny-button');
let homepageLogo = document.querySelector('.homepage-logo');
let showAddModalDialogue = document.querySelector('.show-add-modal-dialogue')
let localItemValues = [];
let currentShowCount = localStorage.length;
let localItemData = []
let everyShow = [];
for (i=0; i<localStorage.length; i++){
  localItemValues.push(i)
  localItemData.push(`${localStorage.getItem(i)}`)
};
let totalShowCount = everyShow.length;



showAddSectionButton.addEventListener('click', addShow);
randomShow.addEventListener('click', generateShow);
showAllButton.addEventListener('click', showAll);
modalClose.addEventListener('click', closeModal);
denyDelete.addEventListener('click', keepShow);
homepageLogo.addEventListener('click', ()=>{
  displayText.innerText = 'You cleared the database. Click Add Show to add shows.';
  localItemData = [];
  localItemValues = [];
  localStorage.clear();
})

function openAddShow(){
  showAddSection.style.display = 'flex';
  showAddModalDialogue.style.transition = "transform 200ms ease-in-out";
  setTimeout(()=>{
    showAddModalDialogue.style.transform = "translateY(1px)";
  }, 50)
}

function closeAddShow(){
  showAddSection.style.display = "none";
}

function clearText(input){
  input.value = "";
}


function addShow(e){
  e.preventDefault();
  if (value.value === ''){
    window.alert('Invalid input. No show added.')
    showAddSection.style.display = 'none';
  } else if (localItemData.includes(value.value)){
    window.alert('Show already added. Add another show.');
    
  } else {
    localStorage.setItem(`${localStorage.length}`, value.value);
    localItemData.push(value.value);
    everyShow.push(value.value);
    console.log(localItemData);
    clearText(value);
    //this is a temporary alert. come back to make a proper modal to notify when a show is added
    window.alert("Show added")
    showAddSection.style.display = 'none';
  }
}

function generateShow(){
  closeAddShow();
  if (localStorage.length === 0){
    displayText.innerText = `You haven't added any shows to the database yet. Click Add Show to begin`
  } else {
    let item = localStorage.getItem(`${Math.floor(Math.random()* localStorage.length)}`)
    displayText.innerText = item.toUpperCase()
  }
}


function showAll(e){
  e.preventDefault();
  modalBody.innerHTML = '';
  closeAddShow();
  modal.style.display = 'block';
  let shows = [];
  for (i=0; i<localStorage.length; i++){
    shows.push(localStorage.getItem(i));
    let item = document.createElement("p");
    item.classList.add('item');
    item.classList.add(i);
    modalBody.appendChild(item);
    item.innerText = `${localStorage.getItem(i).toUpperCase()}`;
    console.log(item.innerText);
    item.addEventListener('click' , (e)=>{
      var databaseKey = parseInt(item.classList[1]);
      var databaseValue = localStorage.getItem(databaseKey);
      askConfirmation()
      confirmDelete.addEventListener('click', ()=>{
        confirmationScreen.style.display = 'none';
        localStorage.removeItem(databaseKey);
        localItemData = localItemData.filter((list)=>{
          return list !== databaseValue;
        })
        console.log(localItemData)
        modalBody.removeChild(item);
      });
    })
  }
}

function closeModal(){
  modal.style.display = 'none';
}


function askConfirmation(e){
  confirmationScreen.style.display = 'flex';
}

function keepShow(){
  confirmationScreen.style.display = 'none';
}

