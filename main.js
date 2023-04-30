// VARIABLES
const inputField = document.querySelector('#ip-input')
const result = document.querySelectorAll('.result')
const btn = document.querySelector('.btn')

var lat = '47.52978'
var lng = '19.08068'

var map = L.map('map').setView([lat, lng], 13)
sendGetRequest()

async function sendGetRequest() {
  if (!inputField.value) {
    inputField.value = '92.249.207.29'
  }
  const response = await fetch(
    `https://geo.ipify.org/api/v2/country,city?apiKey=at_DmsiDI9h5sPJyuywZ9uJlzXYa2Jd5&ipAddress=${inputField.value}&domain=${inputField.value}`
  )
  const data = await response.json()
  let lat = data.location.lat
  let lng = data.location.lng
  result[0].innerText = data.ip
  result[1].innerText = data.location.city
  result[2].innerText = data.location.timezone
  result[3].innerText = data.isp
  map = L.map('map').setView([lat, lng], 13)
  L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
  }).addTo(map)

  var customIcon = L.icon({
    iconUrl: 'images/icon-location.svg',
    iconSize: [46, 56],
  })

  L.marker([lat, lng], { icon: customIcon }).addTo(map)
}

btn.addEventListener('click', (e) => {
  e.preventDefault()
  map.remove()
  sendGetRequest()
})
