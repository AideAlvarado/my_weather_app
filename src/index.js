function zfill(num, len) {
  return (Array(len).join("0") + num).slice(-len);
}
function vwTOpx(value) {
    var w = window,
      d = document,
      e = d.documentElement,
      g = d.getElementsByTagName('body')[0],
      x = w.innerWidth || e.clientWidth || g.clientWidth,
      y = w.innerHeight|| e.clientHeight|| g.clientHeight;

    var result = (x*value)/100;
    return result;
  }
function showTime() {
  let now = new Date();
  let date = now.getDate();
  let hours = zfill(now.getHours(), 2);
  let minutes = zfill(now.getMinutes(), 2);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[now.getDay()];
  let year = now.getFullYear();
  let texto = document.getElementById("weatherdate");
  texto.innerHTML = ` ${day}, ${hours}:${minutes}`;

  let dummy = document.getElementById("card-body")
  let backgroundsky= document.getElementById("skybg")
  backgroundsky.style.height=`${dummy.clientHeight + Math.round(vwTOpx(5))}px`
  console.log(dummy.clientHeight + vwTOpx(5))

}
function displayForecast(response) {
  let forecast = document.getElementById("forecast").querySelectorAll(".col3");

  for (let i = 0; i < 5; i++) {
    let hour = response.data.list[i].dt_txt.split(" ")[1].slice(0, 5);
    let tmax = Math.round(response.data.list[i].main.temp_max);
    let tmin = Math.round(response.data.list[i].main.temp_min);
    let wicon = `<img src="http://openweathermap.org/img/wn/${response.data.list[i].weather[0].icon}@2x.png">`;

    forecast[
      i
    ].innerHTML = `<p>${hour}</p>${wicon}<p>${tmin}ºC / ${tmax}ºC</p>`;
  }
}

function city(event) {
  event.preventDefault();
  let showCity = document.getElementById("form-city");
  let destino = document.getElementById("destinationcity");
  let key = "09c4248a521300b214dab61c69efdff2";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${showCity.value}&appid=${key}&units=metric`;
  destino.innerHTML = `${showCity.value}`;

  axios.get(url).then(showTemperature2);
}

function showTemperature2(response) {
  const conditions = {
    Thunderstorm: "stormy",
    Drizzle: "rainy",
    Rain: "rainy",
    Snow: "snowy",
    Atmosphere: "stormy",
    Clear: "sunny",
    Clouds: "cloudy",
    Mist: "cloudy",
    Smoke: "stormy",
    Haze: "rainy",
    Dust: "cloudy",
    Fog: "cloudy",
    Sand: "stormy",
    Ash: "stormy",
    Squall: "stormy",
    Tornado: "stormy"
  };

  let temperature = Math.round(response.data.main.temp);
  let cityName = response.data.name;
  let showTemp = document.getElementById("temp");
  let showCity = document.getElementById("destinationcity");
  showTemp.innerHTML = `${temperature}`;
  console.log(cityName.length);
  showCity.innerHTML = `&nbsp;&nbsp;${cityName}`;
  let letraC = document.getElementById("degreesC");
  let letraF = document.getElementById("degreesF");
  letraC.style.fontSize = "x-large";
  letraF.style.fontSize = "medium";
  let target = document.getElementById("temp");
  target.className = "celsius";
  document.getElementById("infoHum").innerHTML = `humidity<br> ${Math.round(
    response.data.main.humidity
  )}%`;
  document.getElementById("infoWin").innerHTML = `wind<br>${Math.round(
    response.data.wind.speed
  )} Km/h`;

  document.getElementById(
    "Description"
  ).innerHTML = `<h3>right now there</h3>${response.data.weather[0].description}`;
  let claseClima = conditions[response.data.weather[0].main];

  let weatherIcon = document.getElementById("weatherIcon");

  weatherIcon.className = claseClima;

  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${key}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
  showTime();
}

//geolocalización
function showPosition(position) {
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let key = "09c4248a521300b214dab61c69efdff2";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}&units=metric`;

  axios.get(url).then(showTemperature2);
}

function getCurrentPosition() {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

//Para convertir de Celsius a F y viceversa con un click:
function clickOnC(event) {
  event.preventDefault();

  let target = document.getElementById("temp");
  let cTemp = target.innerHTML;
  let letraC = document.getElementById("degreesC");
  let letraF = document.getElementById("degreesF");

  let cToFahr = (cTemp * 9) / 5 + 32;
  let fToCelsius = Math.round(((cTemp - 32) * 5) / 9);
  if (event.srcElement.className === "celsius") {
    letraC.style.fontSize = "x-large";
    letraF.style.fontSize = "medium";
    if (target.className === "fahrenheit") {
      target.innerHTML = fToCelsius;
      target.className = "celsius";
    }
  } else {
    letraC.style.fontSize = "medium";
    letraF.style.fontSize = "x-large";
    if (target.className === "celsius") {
      target.innerHTML = cToFahr;
      target.className = "fahrenheit";
    }
  }
}

let showCity = document.getElementById("search");
showCity.addEventListener("click", city);
let geol = document.getElementById("geol");
geol.addEventListener("click", getCurrentPosition);

//Obtener Temp de ciudad destino

let key = "09c4248a521300b214dab61c69efdff2";
let url = `https://api.openweathermap.org/data/2.5/weather?q=monterrey&appid=${key}&units=metric`;
//let showTemp = document.getElementById("temp");
axios.get(url).then(showTemperature2);

let celsius = document.getElementById("degreesC");
celsius.addEventListener("click", clickOnC);
let fahrenheit = document.getElementById("degreesF");

fahrenheit.addEventListener("click", clickOnC);

let dummy = document.getElementById("card-body")
let backgroundsky= document.getElementById("skybg")
backgroundsky.style.display ="none"
backgroundsky.style.height=`${dummy.clientHeight + Math.round(vwTOpx(5))}px`

backgroundsky.style.display ="block"

showTime();
