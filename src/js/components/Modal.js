'use strict'

const $overlay = document.createElement('div')
$overlay.classList.add('overlay', 'modal-overlay')

// Function that creates and manages a modal for adding and editing notes.
// Allows users to input title and text, save and submit the note.
// @returs {Object} - An object containig functions to open & close the modal and handle note submissions.
const NoteModal = (title='Untitled', text='Add your note...', time='') => {
  const $modal = document.createElement('div')
  $modal.classList.add('modal')

  $modal.innerHTML = `
    <button class='icon-btn large' aria-label='Close modal' data-close-btn>
      <span class='material-symbols-rounded' aria-hidden='true'>close</span>
      <div class='state-layer'></div>
    </button>
    <input type='text' placeholder='Untitled' value='${title} class='modal-title text-title-medium' data-note-field>
    <textarea placeholder='Take a note...' class='modal-text text-body-large custom-scrollbar' data-note-field>
      ${text}
    </textarea>
    <div class='modal-footer'>
      <span class='time text-label-large'>${time}</span>
      <button class='btn text' data-submit-btn>
        <span class='text-label-large'>Save</span>
        <div class='state-layer'></div>
      </button>
    </div>
  `

  const $submitBtn = $modal.querySelector('[data-submit-btn]')
  $submitBtn.disabled = true

  const [$titleField, $textField] = $modal.querySelectorAll('[data-note-field]')

  // Disables the submitBtn if either of the values is empty
  const enableSubmit = () => {
    $submitBtn.disabled = !$titleField.value && !$textField.value
  }

  $titleField.addEventListener('keyup', enableSubmit)
  $textField.addEventListener('keyup', enableSubmit)

  // Opens the modal by appending it to the document body and setting focus on the title field
  const open = () => {
    document.body.appendChild($modal)
    document.body.appendChild($overlay)
    $titleField.focus()
  }

  // Closes the modal by removing it from the document body
  const close = () => {
    document.body.removeChild($modal)
    document.body.removeChild($overlay)
  }

  // Attach a click event to closeBtn (click calles the close modal function)
  const $closeBtn = $modal.querySelector('[data-close-btn]')
  $closeBtn.addEventListener('click', close)

  const onSubmit = (callback) => {
    $submitBtn.addEventListener('click', () => {
      const noteData = {
        title: $titleField.value,
        text: $textField.value
      }
      callback(noteData)
    })
  }
  return { open, close, onSubmit }
}


// Function that creates and manages a modal for deleting an item.
// @param {String} title - The title of the item to be deleted.
// @returs {Object} - An object containig functions to open & close the modal and handle confirmation. 
const DeleteConfirmModal = (title) => {
  const $modal = document.createElement('div')
  $modal.classList.add('modal')

  $modal.innerHTML = `
    <h3 class='modal-title text-title-medium'>
      Are you sure you want to delete <strong>${title}</strong>?
    </h3>
    <div class='modal-footer'>
      <button class='btn text' data-action-btn='false'>
        <span class='text-label-large'>Cancel</span>
        <div class='state-layer'></div>
      </button>
      <button class='btn fill' data-action-btn='true'>
        <span class='text-label-large'>Delete</span>
        <div class='state-layer'></div>
      </button>
    </div>
  `

  // Opens the delete confirmation modal by appending it to the document body
  const open = () => {
    document.body.appendChild($modal)
    document.body.appendChild($overlay)
  }

  // Closes the delete confirmation modal by removing it from the document body
  const close = () => {
    document.body.removeChild($modal)
    document.body.removeChild($overlay)
  }

  const onSubmit = (callback) => {
    $actionsBtns.forEach($btn => $btn.addEventListener('click', () => {
      const isConfirm = this.dataset.actionBtn === 'true' ? true : false

      callback(isConfirm)
    }))
  }
  return { open, close, onSubmit}
}

export { DeleteConfirmModal, NoteModal }