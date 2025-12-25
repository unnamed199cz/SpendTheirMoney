const toggleButton = document.getElementById('theme-toggle');
const root = document.documentElement;

// Funkce pro aktualizaci ikony podle aktuálního tématu
function updateToggleIcon() {
  const isDark = root.getAttribute('data-theme') === 'dark';
  toggleButton.textContent = isDark ? '☀️' : '🌙';
}

// Při načtení stránky: detekce preferovaného tématu
window.addEventListener('DOMContentLoaded', () => {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Pokud je preferováno tmavé a zatím není dark theme, "stiskni" toggle
  if(prefersDark && root.getAttribute('data-theme') !== 'dark') {
    toggleButton.click();
  } else {
    updateToggleIcon(); // správná ikona pro světlo
  }
});

// Toggle button
toggleButton.addEventListener('click', () => {
  const currentTheme = root.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  if(newTheme === 'dark') {
    root.setAttribute('data-theme', 'dark');
  } else {
    root.removeAttribute('data-theme'); // fallback na light
  }

  updateToggleIcon();
});

var money;
function SpendMoney() {
 document. getElementsByClassName("SpendMoney").innerHTML = money
}
