import { addEventOnElements, getGreetingMsg } from "./utils.js"
import { Tooltip } from "./components/Tooltip.js"

const $sidebar = document.querySelector('[data-sidebar]')
const $sidebarTogglers = document.querySelectorAll('[data-sidebar-toggler]')
const $overlay = document.querySelector('[data-sidebar-overlay]')

addEventOnElements($sidebarTogglers, 'click', function() {
  $sidebar.classList.toggle('active')
  $overlay.classList.toggle('active')
})

// Initialize tooltip behavior for every element with 'data-tooltip' attribute
const $tooltipElements = querySelectorAll('[data-tooltip]')
$tooltipElems.forEach($elem => Tooltip($elem))

// Greeting msg on homepage
const $greetingMsg= document.querySelector('[data-greeting]')
const currentHour = new Date().getHours()
$greetingMsg.textContent = getGreetingMsg(currentHour)

// Current date on homepage
const $currentDateElem = document.querySelector('[data-current-date]')
$currentDateElem.textContent = new Date().toDateString().replace(' ', ', ')