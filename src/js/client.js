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
    },
    // Update the UI to reflect the changes in a notebook
    // @param {String} notebookId - ID of the notebook to update
    // @param {Object} notebookData - New data to update the notebook
    update(notebookId, notebookData) {
      const $oldNotebook = document.querySelector(`[data-notebook='${notebookId}']`)
      const $newNotebook = NavItem(notebookData.id, notebookData.name)

      $notePanelTitle.textContent = notebookData.name
      $sidebarList.replaceChild($newNotebook, $oldNotebook)
      activeNotebook.call($newNotebook)
    },
    // Deletes a notebook from the UI
    // @param {String} notebookId - ID of the notebook to delete
    delete(notebookId) {
      const $deletedNotebook = document.querySelector(`[data-notebook='${notebookId}']`)
      const $activeNavItem = $deletedNotebook.nextElementSibling ?? $deletedNotebook.previousElementSibling

      if ($activeNavItem) {
        $activeNavItem.click()
      } else {
        $notePanelTitle.innerHTML = ''
        $notePanel.innerHTML = ''
        disableNoteCreateBtns(false)
      }
      $deletedNotebook.remove()
    }
  },

  note: {
    // Creates a new note in the UI
    // @param {Object} noteData - Data representing the new note
    create(noteData) {
      // If there are no notes, it clears the content of the $notePanel
      if (!$notePanel.querySelector('[data-note]')) $notePanel.innerHTML = ''
      // Append card in notePanel
      const $card = Card(noteData)
      $notePanel.prepend($card)
    },
    // Reads and displays a list of notes in the UI
    // @param {ArrayObject} noteList - List of note data to display
    read(noteList) {
      if (noteList.length) {
        $notePanel.innerHTML = ''

        noteList.forEach(noteData => {
          const $card = Card(noteData)
          $notePanel.appendChild($card)
        })
      } else {
        $notePanel.innerHTML = emptyNotesTemplate
      }
    },
    // Updates a note card in the UI
    // @param {String} noteId - ID of the note to update
    // @param {Object} noteData - New data for the note
    update(noteId, noteData) {
      const $oldCard = document.querySelector(`[data-note='${noteId}']`)
      const $newCard = Card(noteData)
      $notePanel.replaceChild($newCard, $oldCard)
    },
    // Deletes a note card from the UI
    // @param {String} noteId - ID of the note to delete
    // @param {boolean} isNoteExists - Indicates whether other notes still exist
    delete(noteId, isNoteExists) {
      document.querySelector(`[data-note'${noteId}']`).remove()
      if (!isNoteExists) $notePanel.innerHTML = emptyNotesTemplate
    }
  }
}
