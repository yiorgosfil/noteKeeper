'use strict'

import { Tooltip } from "./Tooltip"
import { activeNotebook, makeElemEditable } from "../utils"
import { DeleteConfirmModal } from "./Modal"
import { client } from "../client"
import { db } from "../db"

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
}