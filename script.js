/// theme toggle start --------------------------------------------
const toggleButtonTheme = document.getElementById('theme-toggle');
const root = document.documentElement;

/// Preferences
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

var RulesWindowStatus = false;
function APIRules() {
 if (RulesWindowStatus === false) {
   document.getElementById('APIRules').style.display = 'block';
     RulesWindowStatus = true}
  else if (RulesWindowStatus === true) {
    document.getElementById('APIRules').style.display = 'none';
      RulesWindowStatus = false}
}
/// API toggle end ------------------------------------------------
/// API function start
function APICall() {
  var APIInput = document.getElementById('APIInput').value;
    if (!(APIInput.length === 16)) 
      console.log("Not an API key")
    else {
      fetch(`https://api.torn.com/v2/user/hof?comment=SpendTheirNW&key=${APIInput}`)
      .then (response => response.json())
      .catch ((error) => console.log(error))
      .then (data => {
        var MoneyOfUser = data.hof.networth.value
        console.log(`API's owner networth: ${MoneyOfUser}`)
        document.getElementById("balance").innerText = new Intl.NumberFormat().format(MoneyOfUser)
})}
}
function APINameCall() {
  var APIInput = document.getElementById('APIInput').value;
  let APINameInput = document.getElementById('APINameInput').value;
    if (isNaN(Number(APINameInput)))
      console.log("Not an ID, use numbers.")
    else {
      console.log(`Player's ID: ${APINameInput}`)
      console.log(`API key: ${APIInput}`)
      fetch(`https://api.torn.com/v2/user/${APINameInput}/personalstats?stat=networth&comment=SpendTheirNW&key=${APIInput}`)
      .then (response => response.json())
      .catch ((error) => console.log(error))
      .then (data => {
        var MoneyOfUser = data.personalstats[0].value
        console.log(`Player's networth: ${MoneyOfUser}`)
        document.getElementById("balance").innerText = new Intl.NumberFormat().format(MoneyOfUser)})
      
      fetch(`https://api.torn.com/v2/user/${APINameInput}/basic?comment=SpendTheirNW&key=${APIInput}`)
      .then (response => response.json())
      .catch ((error) => console.log(error))
      .then (data => {        
      var NameOfUser = data.profile.name
      console.log(`Player's name: ${NameOfUser}`)
      document.getElementById("NameApiCall").innerText = NameOfUser
})
    }}

/// API function end

function buyItem(button) {
  let currentbalance = Number( document.getElementById("balance").textContent.replace(/[\s,\.]/g, ""))
  const input = button.parentElement.querySelector('input');
  const itemname = input.id
  const priceofitem = Number(document.getElementById(`itemprice_${itemname}`).textContent);
  if (currentbalance >= priceofitem) {
    input.value = Number(input.value || 0) + 1
    input.dispatchEvent( new Event('input', {bubbles: true}) )}
}
function sellItem(button) {
  let currentbalance = Number( document.getElementById("balance").textContent.replace(/[\s,\.]/g, ""))
  const input = button.parentElement.querySelector('input');
  const itemname = input.id
  const priceofitem = Number(document.getElementById(`itemprice_${itemname}`).textContent);
  let value = Number(input.value) || 0;
  if (value > 0) {
    input.value = value - 1;
    input.dispatchEvent( new Event('input', {bubbles: true}))}
}

const previousValues = {}
///--------------------------------------------------
/// Input listener
///--------------------------------------------------
document.addEventListener('input', (ReadInput) => {
  if (!ReadInput.target.matches('.counter input')) return

  var input = ReadInput.target
  var itemname = input.id
  var oldValue = previousValues[itemname] ?? 0
  var newValue = input.value === '' ? 0 : Number(input.value)
  var diff = newValue - oldValue // rozdíl mezi novou a starou hodnotou
  var priceofitem = Number(
    document.getElementById(`itemprice_${itemname}`).textContent)
  let currentbalance = Number(
    document.getElementById("balance").textContent.replace(/[\s,\.]/g, ""))
  if (diff > 0 && currentbalance < priceofitem) {
    input.value = oldValue
    return}
  // pokud chceš kontrolovat, že je to v rámci balancu
  if (currentbalance >= priceofitem * diff) {
    var newbalance = currentbalance - priceofitem * diff
    document.getElementById("balance").textContent = new Intl.NumberFormat().format(newbalance)
    previousValues[itemname] = newValue
  } else {
    var limitedbuy = Math.floor(currentbalance / priceofitem)
    // nastavím input na max možný
    input.value = oldValue + limitedbuy
    var newbalance = currentbalance - limitedbuy * priceofitem
    document.getElementById("balance").textContent =
      new Intl.NumberFormat().format(newbalance)
    previousValues[itemname] = input.value
  }
})


document.querySelectorAll('.counter input').forEach(input => {
  input.addEventListener('input', () => {
    if (input.value < 0) {input.value = ""}})})
