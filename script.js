const addBtns = document.querySelectorAll('.add-btn:not(.solid)')
const saveItemBtns = document.querySelectorAll('.solid')
const addItemContainers = document.querySelectorAll('.add-container')
const addItems = document.querySelectorAll('.add-item')
const itemLists = document.querySelectorAll('.drag-item-list')
const backlogList = document.getElementById('backlog-list')
const progressList = document.getElementById('progress-list')
const completeList = document.getElementById('complete-list')
const onHoldList = document.getElementById('on-hold-list')

let updatedOnLoad = false


let backlogListArray = []
let progressListArray = []
let completeListArray = []
let onHoldListArray = []
let listArrays = []

// Drag Functionality



function getSavedColumns() {
  if (localStorage.getItem('backlogItems')) {
    backlogListArray = JSON.parse(localStorage.backlogItems)
    progressListArray = JSON.parse(localStorage.progressItems)
    completeListArray = JSON.parse(localStorage.completeItems)
    onHoldListArray = JSON.parse(localStorage.onHoldItems)
  } else {
    backlogListArray = ['Release the course', 'Sit back and relax']
    progressListArray = ['Work on projects', 'Listen to music']
    completeListArray = ['Being cool', 'Getting stuff done']
    onHoldListArray = ['Being uncool']
  }
}

function updateSavedColumns() {
  listArrays = [backlogListArray, progressListArray, completeListArray, onHoldListArray]
  const arrayNames = ['backlog', 'progress', 'complete', 'onHold']
  arrayNames.forEach( (arrayName, index) => {
    localStorage.setItem(`${arrayName}Items`, JSON.stringify(listArrays[index]))
  })
}

function createItemEl(columnEl, column, item, index) {
  const listEl = document.createElement('li')
  listEl.classList.add('drag-item')
  listEl.textContent = item
  columnEl.appendChild(listEl)
}


function updateDOM() {
  if(!updatedOnLoad) {
    getSavedColumns()
  }

  backlogList.textContent = ''
  backlogListArray.forEach( (backlogItem, index) => {
    createItemEl(backlogList, 0, backlogItem, index)
  })

  progressList.textContent = ''
  progressListArray.forEach( (progressItem, index) => {
    createItemEl(progressList, 0, progressItem, index)
  })

  completeList.textContent = ''
  completeListArray.forEach( (completeItem, index) => {
    createItemEl(completeList, 0, completeItem, index)
  })

  onHoldList.textContent = ''
  onHoldListArray.forEach( (onHoldItem, index) => {
    createItemEl(onHoldList, 0, onHoldItem, index)
  })

  // Run getSavedColumns only once, Update Local Storage
}

updateDOM()

