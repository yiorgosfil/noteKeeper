// Toggle theme and set it in local storage
const toggleTheme = function() {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'light'
  const newTheme = currentTheme === 'light' ? 'dark' : 'light'

  document.documentElement.setAttribute('data-theme', newTheme)
  localStorage.setItem('theme', newTheme)
}


// Initialize theme
const storedTheme = localStorage.getItem('theme')

const systemThemeIsDark = window.matchMedia('(prefers-color-scheme: dark)').matches

const initialTheme = storedTheme ?? (systemThemeIsDark ? 'dark' : 'light')

document.documentElement.setAttribute('data-theme', initialTheme)


// Click event to the theme button
window.addEventListener('DOMContentLoaded', function() {
  const $themeBtn = document.querySelector('[data-theme-btn]')
  if ($themeBtn) $themeBtn.addEventListener('click', toggleTheme)
})
