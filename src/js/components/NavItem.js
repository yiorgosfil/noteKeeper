export const NanItem = function (id, name) {
  const $navItem = document.createElement('div')
  $navItem.classList.add('nav-item')
  $navItem.setAttribute('data-notebook', id)
  $navItem.innerHTML = html`
    
  `
}