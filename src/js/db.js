'use strict'

import { 
  generateID,
  findNotebook,
  findNotebookIndex,
  findNote,
  findNoteIndex } from "./utils.js"

// DB Object
let notekeeperDB = {}

// Initialize a local DB
const initDB = function () {
  const db = localStorage.getItem('notekeeperDB')

  if (db) {
    notekeeperDB = JSON.parse(db)
  } else {
    notekeeperDB.notebooks = []
    localStorage.setItem('notekeeperDB', JSON.stringify(notekeeperDB))
  }
}

initDB()

// Reads and loads the data from localStorage into the global variable 'notekeeperDB'
const readDB = () => {
  notekeeperDB = JSON.parse(localStorage.getItem('notekeeperDB'))
}

// Writes the current state of the 'notekeeperDB' to localStorage
const writeDB = () => {
  localStorage.setItem('notekeeperDB', JSON.stringify(notekeeperDB))
}

// CRUD operations in the DB
// The DB state is managed using global variables and localStorage
export const db = {
  post: {
    // Adds a notebook to the database
    notebook(name) {
      readDB()

      const notebookData = {
        id: generateID(),
        name,
        notes: []
      }
      notekeeperDB.notebooks.push(notebookData)
      writeDB()
      return notebookData
    },
    // Adds a new note to a specified notebook
    note(notebookId, object) {
      readDB()
      const notebook = findNotebook(notekeeperDB, notebookId)
      const noteData = {
        id: generateID(),
        notebookId,
        ...object,
        postedOn: new Date().getTime()
      }
      notebook.notes.unshift(noteData)
      writeDB()
      return noteData
    }
  },
  get: {
    // Retrives all the notebooks from the DB
    notebook() {
      readDB()
      return notekeeperDB.notebooks
    },
    // Retrieves all notes within a specified notebook
    note(notebookId) {
      readDB()
      const notebook = findNotebook(notekeeperDB, notebookId)
      return notebook.notes
    }
  },
  update: {
    // Updates the name of a notebook in the DB
    notebook(notebookId, name) {
      readDB()
      const notebook = findNotebook(notekeeperDB, notebookId)
      notebook.name = name
      writeDB()

      return notebook
    },
    // Updates the content of a note in the DB
    note(noteId, object) {
      readDB()
      const oldNote = findNote(notekeeperDB, noteId)
      const newNote = Object.assign(oldNote, object)
      writeDB()

      return newNote
    }
  },
  delete: {
    // Deletes a notebook from the DB
    notebook(notebookId) {
      readDB()
      const notebookIndex = findNotebookIndex(notekeeperDB, notebookId)
      notekeeperDB.notebooks.splice(notebookIndex, 1)
      writeDB()
    },
    // Deletes a note from a specified notebook in the DB
    note(notebookId, noteId) {
      readDB()
      const notebook = findNotebook(notekeeperDB, notebookId)
      const noteIndex = findNoteIndex(notebook, noteId)
      notebook.notes.splice(noteIndex, 1)
      writeDB()

      return notebook.notes
    }
  }
}