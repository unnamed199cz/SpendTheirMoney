const toggleButton = document.getElementById('theme-toggle');
const root = document.documentElement;

// Item prices
const PriceWolverine = 100;

// Money tracking
let money = 1000000;

// Funkce pro aktualizaci ikony podle aktuálního tématu
function updateToggleIcon() {
  const isDark = root.getAttribute('data-theme') === 'dark';
  toggleButton.textContent = isDark ? '☀️' : '🌙';
}

// Při načtení stránky: detekce preferovaného tématu
window.addEventListener('DOMContentLoaded', () => {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if(prefersDark && root.getAttribute('data-theme') !== 'dark') {
    toggleButton.click();
  } else {
    updateToggleIcon();
  }
  
  updateMoneyDisplay();
});

// Toggle button
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

// Buy item function
function buyItem(price) {
  if (money >= price) {
    money -= price;
    updateMoneyDisplay();
  } else {
    alert("You don't have enough money!");
  }
}

// Sell item function
function sellItem(price) {
  money += price;
  updateMoneyDisplay();
}

// Update money display
function updateMoneyDisplay() {
  const moneyDisplay = document.getElementById('money-display');
  if (moneyDisplay) {
    moneyDisplay.textContent = '$' + money.toLocaleString();
  }
}
