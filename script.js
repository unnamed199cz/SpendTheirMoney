/// theme toggle start --------------------------------------------
const toggleButtonTheme = document.getElementById('theme-toggle');
const root = document.documentElement;

function updateToggleIcon() {
  const isDark = root.getAttribute('data-theme') === 'dark';
  toggleButtonTheme.textContent = isDark ? '☀️' : '🌙';
}

window.addEventListener('DOMContentLoaded', () => {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if(prefersDark && root.getAttribute('data-theme') !== 'dark') 
  {toggleButtonTheme.click()} 
  else {updateToggleIcon()}
});

toggleButtonTheme.addEventListener('click', () => {
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
/// API toggle start -----------------------------------------------
var WindowStatus = false;
function APIWindow() {
 if (WindowStatus === false) {
   document.getElementById('APIInput').style.visibility = 'visible';
   WindowStatus = true}
  else if (WindowStatus === true) {
    document.getElementById('APIInput').style.visibility = 'hidden';
    WindowStatus = false}
}
/// API toggle end ------------------------------------------------
/// API function start
function APICall() {
  let APIInput = document.getElementById('APIInput').value;
    if (!(APIInput.length === 16)) 
      console.log("Not an API")
    else {
      fetch(`https://api.torn.com/v2/user/hof?comment=SpendTheirNW&key=${APIInput}`)
      .then (response => response.json())
      .catch ((error) => console.log(error))
      .then (data => {
        var MoneyOfUser = data.hof.networth.value
        console.log(`Players networth: ${MoneyOfUser}`)
        document.getElementById("balance").innerText =`${MoneyOfUser}`})}
}
/// API function end
function OriginalBalance() {
  // do api to get players balance
  //var balance = apicall..
}
function buyItem(button) {
  let currentbalance = Number(document.getElementById("balance").textContent)
  const input = button.parentElement.querySelector('input');
  const priceofitem = Number(document.getElementById("itemprice").textContent);
  if (currentbalance >= priceofitem) {
    input.value = Number(input.value || 0) + 1
    newbalance = currentbalance - priceofitem
    document.getElementById("balance").textContent =`${newbalance}`}
}
function sellItem(button) {
  let currentbalance = Number(document.getElementById("balance").textContent)
  const input = button.parentElement.querySelector('input');
  const priceofitem = Number(document.getElementById("itemprice").textContent);
  let value = Number(input.value) || 0;
  if (value > 0) {
    input.value = value - 1;
    newbalance = currentbalance + priceofitem
    document.getElementById("balance").innerText =`${newbalance}`}
}

document.querySelectorAll('.counter input').forEach(input => {
  input.addEventListener('input', () => {
    if (input.value < 0) {input.value = ""}})})
