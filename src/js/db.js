// Import utils
import { generateID } from "./utils.js"

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

const readDB = function () {
  notekeeper = JSON.parse(localStorage.getItem('notekeeperDB'))
}

const writeDB = function () {
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
    }
  }
}