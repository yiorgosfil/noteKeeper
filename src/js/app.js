import { 
  addEventOnElements, 
  getGreetingMsg, 
  activeNotebook,
  makeElemEditable 
} from "./utils.js"
import { Tooltip } from "./components/Tooltip.js"
import { db } from './db.js'

const $sidebar = document.querySelector('[data-sidebar]')
const $sidebarTogglers = document.querySelectorAll('[data-sidebar-toggler]')
const $overlay = document.querySelector('[data-sidebar-overlay]')

addEventOnElements($sidebarTogglers, 'click', function() {
  $sidebar.classList.toggle('active')
  $overlay.classList.toggle('active')
})

// Initialize tooltip behavior for every element with 'data-tooltip' attribute
const $tooltipElements = querySelectorAll('[data-tooltip]')
$tooltipElements.forEach($elem => Tooltip($elem))

// Greeting msg on homepage
const $greetingMsg= document.querySelector('[data-greeting]')
const currentHour = new Date().getHours()
$greetingMsg.textContent = getGreetingMsg(currentHour)

// Current date on homepage
const $currentDateElem = document.querySelector('[data-current-date]')
$currentDateElem.textContent = new Date().toDateString().replace(' ', ', ')

// Notebook create field
const $sidebarList = document.querySelector('[data-sidebar-list]')
const $addNotebookBtn = document.querySelector('[data-add-notebook]')

const showNotebookField = function () {
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

const createNotebook = function (event) {
  if (event.key === 'Enter') {
    // Store newly created notebook to the database
    
  }
}