// Get Time
let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
let Months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
let todayName = document.querySelector(".today .day-name")
let todayNum = document.querySelector(".today .day-month")
let tomorrow = document.querySelector(".tomorrow .date")
let thirdDay = document.querySelector(".third-day .date")

// Today
const today = new Date()
let dayNum = `${today}`.split(" ")[2]
todayName.innerHTML = days[(today.getDay())]
todayNum.innerHTML = `${(dayNum[0] == 0 ? dayNum[1]: dayNum)}${(Months[today.getMonth()])}`
// Tomorrow
const tomorrowDate = new Date()
let tomorrowNum = (tomorrowDate.getDay()+1)==days.length ? days[0] : days[(today.getDay())+1]
tomorrow.innerHTML = tomorrowNum
// Third Day
const thirdDayDate = new Date()
if( (thirdDayDate.getDay()+2)>=days.length) {
  if( (thirdDayDate.getDay()+1)==days.length) {
    thirdDay.innerHTML = days[1]
  } else {
    thirdDay.innerHTML = days[0]
  }
} else {
  thirdDay.innerHTML = days[(today.getDay())+2]
}



// ============================================== //
// Get & Display Weather
async function getWeather(location = "cairo") {
  let twoDays = document.querySelectorAll(".details")
  const apiKey = "f2dff1d7240d4ecc86e121218240607"
  const baseUrl = "http://api.weatherapi.com/v1/forecast.json"
  const response = await fetch(`${baseUrl}?key=${apiKey}&q=${location}&days=3`)
  console.log(response);
  const data = await response.json()
  const hours = new Date()
  let windDir = ""
  switch(data.forecast.forecastday[0].hour[hours.getHours()].wind_dir) {
    case 'N':
      windDir = 'North'
      break
    case 'S':
      windDir = 'South'
      break
    case 'E':
      windDir = 'East'
      break
    case 'W':
      windDir = 'West'
      break
  } 


  // Desplay weather

  document.querySelector(".today .details").innerHTML = `
    <div class="location fs-5">${data.location.name}</div>
    <div class="d-flex gap-5 align-items-center">
    <div class="degrees text-white fw-bold my-4 d-flex">${data.current.temp_c}<p class="degree">o</p>C</div>                
    <div class=""img>
    <img class="" src="http:${data.forecast.forecastday[0].hour[hours.getHours()].condition.icon}" class="cloud"></img></div>
    </div>
    <div class="cloud-status text-primary my-3">${data.forecast.forecastday[0].hour[hours.getHours()].condition.text}</div>
    <div class="more-det d-flex gap-4 align-items-center">
      <div class="rain d-flex align-items-center">
        <i class="fa-solid fa-umbrella me-1"></i>
        ${data.forecast.forecastday[0].hour[hours.getHours()].humidity}%
      </div>
      <div class="fog">
        <i class="fa-solid fa-wind me-1"></i>
        ${Math.round(data.forecast.forecastday[0].hour[hours.getHours()].wind_kph)}km/h
      </div>
      <div class="comp">
        <i class="fa-regular fa-compass me-1"></i>
        ${windDir}
        East
      </div>
    </div>`

    for (let i =1; i<twoDays.length; i++ ) {
      twoDays[i].innerHTML = `
        <div class="cloud">
        <img class="" src="${data.forecast.forecastday[i].hour[hours.getHours()].condition.icon}" class="cloud"></img>
        </div>
        <div class="max-deg text-white fs-4 fw-bold pt-3 d-flex justify-content-center">${data.forecast.forecastday[i].day.maxtemp_c}<p class="degree position-relative fs-6 fw-bold">o</p>C</div>
        <div class="min-deg d-flex justify-content-center">${data.forecast.forecastday[i].day.mintemp_c}<p class="degree position-relative">o</p>C</div>
        <div class="cloud-det pt-3 pb-4 pb-lg-0 text-primary">${data.forecast.forecastday[i].hour[hours.getHours()].condition.text}</div>
      `
    }
}
getWeather()


// On Input
let locationInp = document.getElementById("search")
console.log(locationInp.value);
locationInp.addEventListener("keyup", function(e) {
  getWeather(this.value)
})

