/// theme toggle start --------------------------------------------
const toggleButtonTheme = document.getElementById('theme-toggle');
const root = document.documentElement;

function updateToggleIcon() {
  const isDark = root.getAttribute('data-theme') === 'dark';
  toggleButtonTheme.textContent = isDark ? '☀️' : '🌙';
}

window.addEventListener('DOMContentLoaded', () => {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches; 
  document.getElementById("balance").textContent = new Intl.NumberFormat().format(Number(document.getElementById("balance").textContent)); //bal format
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
   document.getElementById('APIInput').focus();
   document.getElementById('APIInfo').style.visibility = 'visible';
   WindowStatus = true}
  else if (WindowStatus === true) {
    document.getElementById('APIInput').style.visibility = 'hidden';
    document.getElementById('APIInfo').style.visibility = 'hidden';
    WindowStatus = false}
}

var RulesWindowStatus = false;
function APIRules() {
 if (RulesWindowStatus === false) {
   document.getElementById('APIRules').style.display = 'block';
     RulesWindowStatus = true}
  else if (WindowStatus === true) {
    document.getElementById('APIRules').style.display = 'none';
      RulesWindowStatus = false}
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
        document.getElementById("balance").innerText = new Intl.NumberFormat().format(newbalance)
})}
}
/// API function end

function buyItem(button) {
  let currentbalance = Number( document.getElementById("balance").textContent.replace(/[\s,\.]/g, ""))
  const input = button.parentElement.querySelector('input');
  const itemname = input.id
  const priceofitem = Number(document.getElementById(`itemprice_${itemname}`).textContent);
  if (currentbalance >= priceofitem) {
    input.value = Number(input.value || 0) + 1
    newbalance = currentbalance - priceofitem
    document.getElementById("balance").textContent = new Intl.NumberFormat().format(newbalance)}
}
function sellItem(button) {
  let currentbalance = Number( document.getElementById("balance").textContent.replace(/[\s,\.]/g, ""))
  const input = button.parentElement.querySelector('input');
  const itemname = input.id
  const priceofitem = Number(document.getElementById(`itemprice_${itemname}`).textContent);
  let value = Number(input.value) || 0;
  if (value > 0) {
    input.value = value - 1;
    newbalance = currentbalance + priceofitem
    document.getElementById("balance").innerText = new Intl.NumberFormat().format(newbalance)}
}

document.querySelectorAll('.counter input').forEach(input => {
  input.addEventListener('input', () => {
    if (input.value < 0) {input.value = ""}})})
