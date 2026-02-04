/// theme toggle start --------------------------------------------
const toggleButtonTheme = document.getElementById('theme-toggle');
const root = document.documentElement;

/// Preferences
window.addEventListener('DOMContentLoaded', () => {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches; 
  document.getElementById("balance").textContent = new Intl.NumberFormat().format(Number(document.getElementById("balance").textContent)); //bal format
  document.querySelectorAll("[id^='itemprice_']").forEach(function (el) {
    el.textContent = new Intl.NumberFormat().format(Number(el.textContent))}) // prices format
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
 // updateToggleIcon();  throws errors??? 
});
/// theme toggle end ----------------------------------------------
/// Prices of items start ------------------------------------------
const itemIds = {
  EDVD: 366,
  Xanax: 206,
  DP: 283,
  FHC: 367,
  Drugpack: 370,
  XMass: 555,
  Taurine: 533,
  Carols: 561,
  ACache: 1118,
  MlCache: 1119,
  SCache: 1120,
  MCache: 1121,
  HCache: 1122,
  Ecstasy: 197,
  Cesium: 336,
  Wolverine: 261,
  Jacket: 48,
}

 async function itemnames(){
  const ids = Object.values(itemIds).join(",")
  const res = await fetch(   `https://api.torn.com/v2/torn/${ids}/items?sort=ASC&key=${APIInput}`)
  const data = await res.json()
  const itemPrices = {}
  const points = await (await fetch(
     `https://api.torn.com/torn/?key=${APIInput}&comment=SpendTheir&selections=stats`)).json()
  itemPrices.Points = points.stats.points_averagecost
  data.items.forEach(item => {
    const ID = Object.keys(itemIds).find(
        ID => itemIds[ID] === item.id)
    if (!ID) return
    itemPrices[ID] = item.value.market_price})
  Object.entries(itemPrices).forEach(([ITEMNAME, price]) => {
    const el = document.getElementById(`itemprice_${ITEMNAME}`)
    if (!el) return
    el.textContent = new Intl.NumberFormat().format(price)})
   console.log(itemPrices)
// Math prices
     const Refill = itemPrices.Points * 30
     const mathprices = {
       Refill: Refill,
       MuseumSet: itemPrices.Points * 10,
       LTRefill: Refill * 365 * 5,
       LTXanax: itemPrices.Xanax * 5475,
       HJ: itemPrices.Xanax * 4 + itemPrices.EDVD * 8 + itemPrices.Ecstasy + Refill,
       DB: itemPrices.Cesium * 100,
       SkipEdu: itemPrices.Carols * 3311, // 7years times 0,9 0,8 0,9 0.5(you skip but have to wait for 5mins and Booster CD)not exact
       Merit: itemPrices.Points * 300
     }
   console.log(mathprices)
     Object.entries(mathprices).forEach(([id, price]) => {
       const a = document.getElementById(`itemprice_${id}`)
       if (!a) return
       {a.textContent = new Intl.NumberFormat().format(price)}})
    sort()}
/// Prices of items end --------------------------------------------
/// Auto price sort start
 function sort() {
  const container = document.getElementById("startsection")
  const items = [...container.children]
  var dir = document.getElementById(`sorttext`).textContent
    if  (dir === "Asc") {
    items.sort((a, b) =>
      Number(a.querySelector("span[id^='itemprice']").textContent.replace(/[\s,\.]/g, "")) - Number(b.querySelector("span[id^='itemprice']").textContent.replace(/[\s,\.]/g, ""))) 
    items.forEach(item => container.appendChild(item))}
    else {
      items.sort((a, b) =>
        Number(b.querySelector("span[id^='itemprice']").textContent.replace(/[\s,\.]/g, "")) - Number(a.querySelector("span[id^='itemprice']").textContent.replace(/[\s,\.]/g, ""))) 
      items.forEach(item => container.appendChild(item))}}

window.addEventListener("DOMContentLoaded", sort)

function sortbutton() {
  var direct = document.getElementById(`sorttext`).textContent 
  if  (direct === "Asc") {
    document.getElementById(`sorttext`).textContent = "Desc"
    document.getElementById("sortbutton").style.backgroundImage =
    'var(--sortbuttondesc)'
    sort()}
  else {
    document.getElementById(`sorttext`).textContent = "Asc"
    document.getElementById("sortbutton").style.backgroundImage = 'var(--sortbuttonasc)'
    sort()}}

/// Auto price sort end
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
let APIInput;

function APICall() {
  APIInput = document.getElementById('APIInput').value;
    if (!(APIInput.length === 16)) 
      console.log("Not an valid API key")
    else {
      fetch(`https://api.torn.com/v2/user/hof?comment=SpendTheirNW&key=${APIInput}`)
      .then (response => response.json())
      .catch ((error) => console.log(error))
      .then (data => {
        var MoneyOfUser = data.hof.networth.value
        console.log(`API's owner networth: ${MoneyOfUser}`)
        document.getElementById("balance").innerText = new Intl.NumberFormat().format(MoneyOfUser)})
      itemnames()
      document.getElementById('APINameButton').disabled = false
      document.getElementById('APINameInput').disabled = false}}

function APINameCall() {
  APIInput = document.getElementById('APIInput').value
  if (!(APIInput.length === 16)) 
    console.log("Not an valid API key")
  let APINameInput = document.getElementById('APINameInput').value;
    if (isNaN(Number(APINameInput)) || APINameInput === "")
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
  const priceofitem = Number(document.getElementById(`itemprice_${itemname}`).textContent.replace(/[\s,\.]/g, ""));
  if (currentbalance >= priceofitem) {
    input.value = Number(input.value || 0) + 1
    input.dispatchEvent( new Event('input', {bubbles: true}) )}
}
function sellItem(button) {
  const input = button.parentElement.querySelector('input');
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
    document.getElementById(`itemprice_${itemname}`).textContent.replace(/[\s,\.]/g, ""))
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
