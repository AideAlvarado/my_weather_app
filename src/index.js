/*let weather = [
  { name: "paris", temp: 19.7, humidity: 80 },
  { name: "tokio", temp: 17.3, humidity: 50 },
  { name: "lisbon", temp: 30.2, humidity: 20 },
  { name: "san francisco", temp: 20.9, humidity: 100 },
  { name: "moscow", temp: -5, humidity: 20 }
];

function minusculas(linea) {
  let respuesta = linea.toLowerCase();
  respuesta = linea.trim();
  return respuesta;
}
*/

// Para mostrar la fecha y hra actual:
let now = new Date();
let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = [now.getDay()];
let year = now.getFullYear();
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
let Month = months[now.getMonth()];
let texto = document.getElementById("fecha");
texto.innerHTML = ` ${Month} ${date} ${year}, ${hours}:${minutes}`;

//Para obtener la ciudad y mostrarla en el h1:
/*
  try {
    apiRes = await axios.get('https://silex.edgeprop.my/api/v1/a');
  } catch (err) {
    apiRes = err.response;
  } finally {
    console.log(apiRes); // Could be success or error
  }
*/
function city(event) {
  event.preventDefault();
  let showCity = document.getElementById("form-city");
  let destino = document.getElementById("ciudaddestino");
  let key = "09c4248a521300b214dab61c69efdff2";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${showCity.value}&appid=${key}&units=metric`;
  destino.innerHTML = `${showCity.value}`;
  console.log(`url-->${url}`);
  axios.get(url).then(showTemperature2);
  console.log(`--> ciudad :${showCity.value}`);
}
let showCity = document.getElementById("search");
showCity.addEventListener("click", city);
let geol = document.getElementById("geol");
geol.addEventListener("click", getCurrentPosition);
//Obtener Temp de ciudad destino

function showTemperature(response) {
  console.log(response.data);
  console.log(response.data.main.temp);

  let temperature = Math.round(response.data.main.temp);
  let showTemp = document.getElementById("temp");
  showTemp.innerHTML = `${temperature}`;
}
function showTemperature2(response) {
  console.log(response);
  console.log(response.data);
  let temperature = Math.round(response.data.main.temp);
  let cityName = response.data.name;
  console.log(`citiname -> ${cityName}`);
  console.log(`->data`, response.data);
  let showTemp = document.getElementById("temp");
  let showCity = document.getElementById("ciudaddestino");
  showTemp.innerHTML = `${temperature}`;
  showCity.innerHTML = `${cityName}`;
  document.getElementById("infoHum").innerHTML = `Humidity ${Math.round(
    response.data.main.humidity
  )}%`;
  document.getElementById("infoWin").innerHTML = `Wind ${Math.round(
    response.data.wind.speed
  )} Km/h`;
  document.getElementById("infoPre").innerHTML = `Precipitation ${Math.round(
    response.data.wind.speed
  )}% `;
}
let key = "09c4248a521300b214dab61c69efdff2";
let url = `https://api.openweathermap.org/data/2.5/weather?q=monterrey&appid=${key}&units=metric`;
let showTemp = document.getElementById("temp");
axios.get(url).then(showTemperature);

//geolocalización
function showPosition(position) {
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let key = "09c4248a521300b214dab61c69efdff2";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}&units=metric`;
  console.log(url);
  axios.get(url).then(showTemperature2);
}

function getCurrentPosition() {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

//Para convertir de Celsius a F y viceversa con un click:
function clickOnC(event) {
  event.preventDefault();
  console.log(event);
  console.log(celsius);

  let objetivo = document.getElementById("temp");
  let cTemp = objetivo.innerHTML;
  let letraC = document.getElementById("degreesC");
  let letraF = document.getElementById("degreesF");
  console.log(`cTemp es ${cTemp}`);
  console.log(letraC);

  let cToFahr = (cTemp * 9) / 5 + 32;
  let fToCelsius = Math.round(((cTemp - 32) * 5) / 9);
  if (event.srcElement.className === "celsius") {
    letraC.style.fontSize = "30px";
    letraF.style.fontSize = "20px";
    if (objetivo.className === "celsius") {
      console.log("no hago nada");
    } else {
      objetivo.innerHTML = fToCelsius;
      objetivo.className = "celsius";
    }
  } else {
    letraC.style.fontSize = "20px";
    letraF.style.fontSize = "30px";
    if (objetivo.className === "celsius") {
      objetivo.innerHTML = cToFahr;
      objetivo.className = "fahrenheit";
    } else {
      console.log("no hago nada");
    }
  }
}
let celsius = document.getElementById("degreesC");
console.log(celsius.innerHTML);
console.log(celsius);
celsius.addEventListener("click", clickOnC);
let fahrenheit = document.getElementById("degreesF");
console.log(fahrenheit);
fahrenheit.addEventListener("click", clickOnC);

/*let question = prompt(`Enter a city?`);
question = minusculas(question);

let ciudad = weather.find((element) => element.name === question);
if (ciudad === undefined) {
  alert(
    `Sorry, we don't know the weather for this city. Try going to  https://www.google.com/search?q=weather+${question}`
  );
} else {
  alert(
    `It is currently ${Math.round(ciudad.temp)}°C (${cToF(ciudad.temp)}°F) in ${
      ciudad.name
    } with a humidity of ${ciudad.humidity}%`
  );
}*/
