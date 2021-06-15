var searchButton = document.querySelector("#search-button") 
var searchText = document.querySelector("#search-text")
var apiKey = "88600ab20da1ad63651c7d80a894f478" 
var archive= JSON.parse(window.localStorage.getItem("archive"))|| [];

function getCurrentWeather(event) { 
    event.preventDefault()
    console.log(searchText.value)
    var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q="+ searchText.value +"&appid="+apiKey+"&units=imperial"; 
    fetch(requestUrl)
    .then(function (response) { 
      return response.json(); 
    }) 
    .then(function(data) {  
        console.log(data)
        const coord= data.coord 
        const lat = coord.lat 
        const long = coord.long 
    var currentWeather=document.querySelector("#current-day")
    currentWeather.innerHTML=""
    var currentWeatherCard=document.createElement("div")
    var currentWeatherBody=document.createElement("div")
    var currentWeatherImg= document.createElement("img")
    var currentWeatherTemp=document.createElement("h6")
    var currentWeatherHumidity=document.createElement("h6")
    var currentWeatherWind=document.createElement("h6")
    var currentWeatherTitle=document.createElement("h2") 
    currentWeatherCard.classList= "card"
    currentWeatherBody.classList= "card-body" 
    currentWeatherTemp.classList="card-text"
    currentWeatherHumidity.classList="card-text"
    currentWeatherWind.classList="card-text"

    currentWeatherTitle.textContent=data.name;
    currentWeatherTemp.textContent= data.main.temp + "°F"
    currentWeatherHumidity.textContent=data.main.humidity + "%"
    currentWeatherWind.textContent=data.wind.speed + "MPH"

    currentWeatherImg.setAttribute("src", "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png")

    currentWeather.appendChild(currentWeatherCard)
    currentWeatherCard.appendChild(currentWeatherBody)
    currentWeatherBody.appendChild(currentWeatherTitle) 
    currentWeatherBody.appendChild(currentWeatherTemp)
    currentWeatherTitle.appendChild(currentWeatherImg)
    currentWeatherBody.appendChild(currentWeatherHumidity) 
    currentWeatherBody.appendChild(currentWeatherWind)
    })
    if(archive.indexOf(searchText.value)===-1) {
        archive.push(searchText.value);
        window.localStorage.setItem("archive", JSON.stringify(archive))
        //append this to list items
    }
} 
function getFiveDayForecast() {
    var fiveDayUrl = "https://api.openweathermap.org/data/2.5/forecast?q="+searchText.value+"&appid="+apiKey+"&units=imperial" 
    fetch(fiveDayUrl)
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        console.log(data)


    });
}
searchButton.addEventListener("click", getCurrentWeather) 

searchButton.addEventListener("click", getFiveDayForecast)






