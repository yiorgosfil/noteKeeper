const addEventOnElements = ($elements, eventType, callback) => {
  $elements.forEach($element => $element.addEventListener(eventType, callback))
}

// Generates a greeting message based on the hour
const getGreetingMsg = (currentHour) => {
  const greeting = 
  currentHour < 5 ? 'Night' :
  currentHour < 12 ? 'Morning' :
  currentHour < 15 ? 'Noon' :
  currentHour < 17 ? 'Afternoon' :
  currentHour < 20 ? 'Evening' : 'Night'
  
  return `Good ${greeting}`
}

// Activates a navigation item and deactivates the previous active item
let $lastActiveNavItem
const activeNotebook = ($navItem) => {
  if ($lastActiveNavItem) {
    $lastActiveNavItem?.classList.remove('active')
  }
  this.classList.add('active') // this: $navItem
  $lastActiveNavItem = $navItem
}

// Makes an element editable by adding the 'contenteditable' attribute
const makeElemEditable = ($element) => {
  $element.setAttribute('contenteditable', true)
  $element.focus()
}

// Generates a unique ID based on the timestamp
const generateID = () => {
  return new Date().getTime().toString()
}

// Finds a notebook in the DB by its ID
const findNotebook = (db, notebookId) => {
  return db.notebooks.find(notebook => notebook.id === notebookId)
}

// Finds the index of a notebook in an array of notebooks based on its ID
const findNotebookIndex = (db, notebookId) => {
  return db.notebooks.findIndex(item => item.id === notebookId)
}

// Converts a timestamp from ms to human-readable
const getRelativeTime = (ms) => {
  const currentTime = new Date().getTime()
  const minute = Math.floor((currentTime - ms) / 1000 / 60)
  const hour = Math.floor(minute / 60)
  const day = Math.floor(hour / 24)

  return minute < 1 ? 'Just now' 
    : minute < 60 ? `${minute} min ago` 
    : hour < 24 ? `${hour} hours ago`
    : `${day} days ago`
}

// Finds a specific note by its ID within a DB of notebooks and their notes
const findNote = (db, noteId) => {
  let note
  for (const notebook of db.notebooks) {
    note = notebook.notes.find(note => note.id === noteId)
    if (note) break
  }
  return note
}

// Finds the index of a note in a notebook's array of notes based on its ID
const findNoteIndex = (notebook, noteId) => {
  return notebook.notes.findIndex(note => note.id === noteId)
}

export { 
  addEventOnElements, 
  getGreetingMsg, 
  activeNotebook, 
  makeElemEditable,
  generateID,
  findNotebook,
  findNotebookIndex,
  getRelativeTime,
  findNote,
  findNoteIndex 
}