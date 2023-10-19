'use strict'

import { Tooltip } from "./Tooltip.js"
import { activeNotebook, makeElemEditable } from "../utils.js"
import { DeleteConfirmModal } from "./Modal.js"
import { client } from "../client.js"
import { db } from "../db.js"

const $notePanelTitle = document.querySelector('[data-note-panel-title]')

// Function that creates a navigation item representing a notebook.
// Allows editing and deletion, and dislpays its associated notes.
// @param {String} id - The unique identifier of the notebook
// @param {String} name - Notebook's name
// @returns {HTMLElement} - Element representing the navigation item of the notebook
export const NanItem = function (id, name) {
  const $navItem = document.createElement('div')
  $navItem.classList.add('nav-item')
  $navItem.setAttribute('data-notebook', id)

  $navItem.innerHTML = `
    <span class='text text-label-large' data-notebook-field>My Notebook</span>
    <button class='icon-btn small' aria-label='Edit notebook' data-tooltip='Edit notebook' data-edit-btn>
      <span class='material-symbols-rounded' aria-hidden='true'>Edit</span>
      <div class='state-layer'></div>
    </button>
    <button class='icon-btn small' aria-label='Delete notebook' data-tooltip='Delete notebook' data-delete-btn>
      <span class='material-symbols-rounded' aria-hidden='true'>Delete</span>
      <div class='state-layer'></div>
    </button>
    <div class='state-layer'></div>
  `

  // Show tooltip on edit and delete button
  const $tooltipElems = $navItem.querySelectorAll('[data-tooltip]')
  $tooltipElems.forEach($elem => Tooltip($elem))

  // Click event handler on the navigation item. Updates note's panel title, 
  // retrieves associated notes, marks them as active
  $navItem.addEventListener('click', () => {
    $notePanelTitle.textContent = name
    activeNotebook.call(this)

    const noteList = db.get.note(this.dataset.notebook)
    client.note.read(noteList)
  })

  // Edit notebook functionality
  const $navItemEditBtn = $navItem.querySelector('[data-edit-btn]')
  const $navItemField = $navItem.querySelector('[data-notebook-field]')

  $navItemEditBtn.addEventListener('click', makeElemEditable.bind(null, $navItemField))

  $navItemField.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      this.removeAttribute('contenteditable')

      // Update edited data in DB
      const updateNotebookData = db.update.notebook(id, this.textContent)

      // Render updated notebook
      client.notebook.update(id, updateNotebookData)
    }
  })

  // Notebook delete functionality
  const $navItemDeleteBtn = $navItem.querySelector('[data-delete-btn]')
  $navItemDeleteBtn.addEventListener('click', () => {
    const modal = DeleteConfirmModal(name)
    modal.open()

    modal.onSubmit((isConfirm) => {
      if (isConfirm) {
        db.delete.notebook(id)
        client.notebook.delete(id)
      }
      modal.close()
    })
  })
  return $navItem
}