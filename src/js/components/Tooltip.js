// Attaches a tooltip to a given DOM element.
// When the element is hovered, the specified tooltip content is dislpayed.
// @param $element - The DOM element to which the tooltip behavior is added.

export const Tooltip = function ($element) {
  const $tooltip = document.createElement('span')
  $tooltip.classList.add('tooltip', 'text-body-small')  
  $element.addEventListener('mouseenter', function () {
    $tooltip.textContent = this.dataset.tooltip

    const {
      top,
      left,
      height,
      width
    } = this.getBoundingClientRect()

    $tooltip.style.top = top + height + 4 +'px'
    $tooltip.style.left = left + (width / 2) + 'px'
    $tooltip.style.tranform = 'translate(-50%, 0)'
    document.body.appendChild($tooltip)
  })

  $element.addEventListener('mouseleave', $tooltip.remove.bind($tooltip))
}