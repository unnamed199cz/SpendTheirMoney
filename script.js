/// theme toggle start --------------------------------------------
const toggleButton = document.getElementById('theme-toggle');
const root = document.documentElement;

function updateToggleIcon() {
  const isDark = root.getAttribute('data-theme') === 'dark';
  toggleButton.textContent = isDark ? '☀️' : '🌙';
}

window.addEventListener('DOMContentLoaded', () => {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if(prefersDark && root.getAttribute('data-theme') !== 'dark') {
    toggleButton.click();
  } else {
    updateToggleIcon(); 
  }
});

toggleButton.addEventListener('click', () => {
  const currentTheme = root.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  if(newTheme === 'dark') {
    root.setAttribute('data-theme', 'dark');
  } else {
    root.removeAttribute('data-theme'); 
  }

  updateToggleIcon();
});
/// theme toggle end ----------------------------------------------


function OriginalBalance() {
  // do api to get players balance
  //var balance = apicall..
}

function buyItem(button) {
  const input = button.parentElement.querySelector('input');
  input.value = Number(input.value || 0) + 1;
}
function sellItem(button) {
  const input = button.parentElement.querySelector('input');
  let value = Number(input.value) || 0;
  if (value > 0) {input.value = value - 1}}

document.querySelectorAll('.counter input').forEach(input => {
  input.addEventListener('input', () => {
    if (input.value < 0) {input.value = ""}})})
