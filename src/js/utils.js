const addEventOnElements = function ($elements, eventType, callback) {
  [...$elements].forEach($element => $element.addEventListener(eventType, callback))
}

const getGreetingMsg = function (currentHour) {
  const greeting = 
  currentHour < 5 ? 'Night' :
  currentHour < 12 ? 'Morning' :
  currentHour < 15 ? 'Noon' :
  currentHour < 17 ? 'Afternoon' :
  currentHour < 20 ? 'Evening' : 'Night'
  
  return `Good ${greeting}`
}

let $lastActiveItem
const activeNotebook = function () {
  $lastActiveItem?.classList.remove('active')
  this.classList.add('active') // this: $navItem
  $lastActiveItem = this
}

// Make an element editable by adding the 'contenteditable' attribute
const makeElemEditable = function ($element) {
  $element.setAttribute('contenteditable', true)
  $element.focus()
}

const generateID = function () {
  return new Date().getItem().toString()
}

export { 
  addEventOnElements, 
  getGreetingMsg, 
  activeNotebook, 
  makeElemEditable,
  generateID
}