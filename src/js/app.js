import { 
  addEventOnElements, 
  getGreetingMsg, 
  activeNotebook,
  makeElemEditable,
} from "./utils.js"
import { Tooltip } from "./components/Tooltip.js"
import { NoteModal } from "./components/Modal.js"
import { client } from "./client.js"
import { db } from './db.js'

// Toggle sidebar in small screen
const $sidebar = document.querySelector('[data-sidebar]')
const $sidebarTogglers = document.querySelectorAll('[data-sidebar-toggler]')
const $overlay = document.querySelector('[data-sidebar-overlay]')

addEventOnElements($sidebarTogglers, 'click', () => {
  $sidebar.classList.toggle('active')
  $overlay.classList.toggle('active')
})

// Initialize tooltip behavior for every element with 'data-tooltip' attribute
const $tooltipElems = document.querySelectorAll('[data-tooltip]')
$tooltipElems.forEach($elem => Tooltip($elem))

// Show greeting msg on homepage
const $greetElem = document.querySelector('[data-greeting]')
const currentHour = new Date().getHours()
$greetElem.textContent = getGreetingMsg(currentHour)

// Show current date on homepage
const $currentDateElem = document.querySelector('[data-current-date]')
$currentDateElem.textContent = new Date().toDateString().replace(' ', ', ')

// Notebook create field
const $sidebarList = document.querySelector('[data-sidebar-list]')
const $addNotebookBtn = document.querySelector('[data-add-notebook]')

// Shows a notebook creation field in the sidebar
const showNotebookField = () => {
  const $navItem = document.createElement('div')
  $navItem.classList.add('nav-item')
  $navItem.innerHTML = `
    <span class='text text-label-large' data-notebook-field></span>
    <div class='state-layer'></div>
  `
  $sidebarList.appendChild($navItem)
  const $navItemField = $navItem.querySelector('[data-notebook-field]')

  // Activate newest created notebook and deactivate the previous one
  activeNotebook.call($navItem)

  // Make notebook editable and focus onto
  makeElemEditable($navItemField)

  // Create a notebook on enter keydown
  $navItemField.addEventListener('keydown', createNotebook)
}
$addNotebookBtn.addEventListener('click', showNotebookField)

// Create new notebook
const createNotebook = (event) => {
  if (event.key === 'Enter') {
    // Store newly created notebook to the database
    const notebookData = db.post.notebook(this.textContent || 'Untitled') // this: $navItemField
    this.parentElement.remove()

    // Render $navItem
    client.notebook.create(notebookData)
  }
}

// Renders the existing notebook list by retrieving data from the database
const renderExistedNotebook = () => {
  const notebookList = db.get.notebook()
  client.notebook.read(notebookList)
}
renderExistedNotebook()

// Create new note
const $noteCreateBtns = document.querySelectorAll('[data-note-create-btn]')
addEventOnElements($noteCreateBtns, 'click', () => {
  // Create and open the modal
  const modal = NoteModal()
  modal.open()

  // Handle the submission of the new note to the database and client
  modal.onSubmit(noteObj => {
    const activeNotebookId = document.querySelector('[data-notebook].active').dataset.notebook
    const noteData = db.post.note(activeNotebookId, noteObj)
    client.note.create(noteData)
    modal.close()
  })
})

// Renders existing notes in the active notebook
const renderExistedNote = () => {
  const activeNotebookId = document.querySelector('[data-notebook].active')?.dataset.notebook
  if (activeNotebookId) {
    const noteList = db.get.note(activeNotebookId)
    client.note.read(noteList)
  }
}
renderExistedNote()