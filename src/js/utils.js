const addEventOnElements = function ($elements, eventType, callback) {
  [...$elements].forEach($element => $element.addEventListener(eventType, callback))
}

export { addEventOnElements }