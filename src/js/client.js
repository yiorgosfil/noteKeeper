'use strict'

import { NavItem } from './components/NavItem.js'
import { Card } from './components/Card.js'
import { activeNotebook } from './utils.js'

const $sidebarList = document.querySelector('[data-sidebar-list]')
const $notePanelTitle = document.querySelector('[data-note-panel-title]')
const $notePanel = document.querySelector('[data-note-panel]')
const $noteCreateBtns = document.querySelectorAll('[data-note-create-btn]')
const emptyNotesTemplate = `
  <div class='empty-notes'>
    <span class='material-symbols-rounded' aria-hidden='true'>note_stack</span>
    <div class='text-headline-small'>No notes</div>
  </div>
`

// Function that enables/disables 'Create Note' btns if isThereAnyNotebook
// @param isThereAnyNotebook - Indicates whether there are any notebooks
const disableNoteCreateBtns = (isThereAnyNotebook) => {
  $noteCreateBtns.forEach($item => {
    $item[isThereAnyNotebook ? 'removeAttribute' : 'setAttribute']('disabled', '')
  })
}

// The client object manages interactions with the UI to create, read, update and 
// delete notebooks and notes
export const client = {
  notebook: {
    // Creates a new notebook in the UI
    // @param {Object} notebookData - Data representing the new notebook
    create(notebookData) {
      const $navItem = NavItem(notebookData.id, notebookData.name)
      $sidebarList.appendChild($navItem)
      activeNotebook.call($navItem)
      $notePanelTitle.textContent = notebookData.name
      $notePanel.innerHTML = emptyNotesTemplate
      disableNoteCreateBtns(true)
    },
    // Reads and displays a list of notebooks in the UI
    // @param {ArrayObject} notebookList - List of notebooks to display
    read(notebookList) {
      disableNoteCreateBtns(notebookList.length)
      notebookList.forEach((notebookData, index) => {
        const $navItem = NavItem(notebookData.id, notebookData.name)

        if (index === 0) {
          activeNotebook.call($navItem)
          $notePanelTitle.textContent = notebookData.name
        }
        $sidebarList.appendChild($navItem)
      })
    }
  }
}
