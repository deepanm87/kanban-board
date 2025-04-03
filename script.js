const addBtns = document.querySelectorAll('.add-btn:not(.solid)')
const saveItemBtns = document.querySelectorAll('.solid')
const addItemContainers = document.querySelectorAll('.add-container')
const addItems = document.querySelectorAll('.add-item')
const listColumns = document.querySelectorAll('.drag-item-list')
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
let draggedItem
let currentColumn



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
  listEl.draggable = true
  listEl.setAttribute('ondragstart', 'drag(event)')
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
  updatedOnLoad = true
  updateSavedColumns()
}

function rebuildArrays() {
  backlogListArray = []
  for (let i = 0; i < backlogList.children.length; i++) {
    backlogListArray.push(backlogList.children[i].textContent)
  }
  progressListArray = []
  for (let i = 0; i < progressList.children.length; i++) {
    progressListArray.push(progressList.children[i].textContent)
  }
  completeListArray = []
  for (let i = 0; i < completeList.children.length; i++) {
    completeListArray.push(completeList.children[i].textContent)
  }
  onHoldListArray = []
  for (let i = 0; i < onHoldList.children.length; i++) {
    onHoldListArray.push(onHoldList.children[i].textContent)
  }
  updateDOM()
}

function drag(e) {
  draggedItem = e.target
}

function allowDrop(e) {
  e.preventDefault()
} 

function dragEnter(column) {
  listColumns[column].classList.add('over')
  currentColumn = column
}

function drop(e) {
  e.preventDefault()
  listColumns.forEach( column => {
    column.classList.remove('over')
  })
  const parent = listColumns[currentColumn]
  parent.appendChild(draggedItem)
  rebuildArrays()
}

updateDOM()

