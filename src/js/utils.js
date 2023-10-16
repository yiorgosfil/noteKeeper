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

export { addEventOnElements, getGreetingMsg }