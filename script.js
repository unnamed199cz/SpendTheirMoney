const toggleButton = document.getElementById('theme-toggle');
const root = document.documentElement;

toggleButton.addEventListener('click', () => {
  const currentTheme = root.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  if(newTheme === 'dark') {
    root.setAttribute('data-theme', 'dark');
  } else {
    root.removeAttribute('data-theme'); // fallback to light
  }
  toggleButton.textContent = newTheme === 'dark' ? '☀️' : '🌙'; // 9
});
