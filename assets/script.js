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
    var currentWeatherRightNow=document.createElement("h3")
    currentWeatherCard.classList= "card"
    currentWeatherBody.classList= "card-body" 
    currentWeatherTemp.classList="card-text"
    currentWeatherHumidity.classList="card-text"
    currentWeatherWind.classList="card-text"
    currentWeatherRightNow.classList="card-text"

    currentWeatherTitle.textContent=data.name;
    currentWeatherRightNow.textContent="Current Weather"
    currentWeatherTemp.textContent= data.main.temp + "°F"
    currentWeatherHumidity.textContent=data.main.humidity + "%"+" humidity"
    currentWeatherWind.textContent=data.wind.speed + "MPH"+" windspeed"
    //creates the icon for weather display
    currentWeatherImg.setAttribute("src", "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png")

    currentWeather.appendChild(currentWeatherCard)
    currentWeatherCard.appendChild(currentWeatherBody)
    currentWeatherBody.appendChild(currentWeatherTitle)
    currentWeatherBody.appendChild(currentWeatherRightNow) 
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
function getFiveDayForecast(event) {
    event.preventDefault()
    var fiveDayUrl = "https://api.openweathermap.org/data/2.5/forecast?q="+searchText.value+"&appid="+apiKey+"&units=imperial" 
    fetch(fiveDayUrl)
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        console.log(data) 
        for (let i = 0; i < data.list.length; i++) { 
            var currentWeather=document.querySelector("#current-day")
            //currentWeather.innerHTML=""
            var currentWeatherCard=document.createElement("div")
            var currentWeatherBody=document.createElement("div")
            var currentWeatherImg= document.createElement("img")
            var currentWeatherTemp=document.createElement("h6")
            var currentWeatherHumidity=document.createElement("h6")
            var currentWeatherWind=document.createElement("h6")
            var currentWeatherTitle=document.createElement("h2") 
            var currentWeatherDateAndTime=document.createElement("h3") 
            currentWeatherCard.classList= "card"
            currentWeatherBody.classList= "card-body" 
            currentWeatherTemp.classList="card-text"
            currentWeatherHumidity.classList="card-text"
            currentWeatherWind.classList="card-text" 
            currentWeatherDateAndTime.classList="card-text"

            currentWeatherTitle.textContent=data.city.name;
            currentWeatherDateAndTime.textContent=data.list[i].dt_txt
            currentWeatherTemp.textContent= data.list[i].main.temp + "°F"
            currentWeatherHumidity.textContent=data.list[i].main.humidity + "%"+" humidity"
            currentWeatherWind.textContent=data.list[i].wind.speed + "MPH"+" windspeed"
            //creates the icon for weatherdisplay
            currentWeatherImg.setAttribute("src", "https://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png")

            currentWeather.appendChild(currentWeatherCard)
            currentWeatherCard.appendChild(currentWeatherBody)
            currentWeatherBody.appendChild(currentWeatherTitle)
            currentWeatherBody.appendChild(currentWeatherDateAndTime) 
            currentWeatherBody.appendChild(currentWeatherTemp)
            currentWeatherTitle.appendChild(currentWeatherImg)
            currentWeatherBody.appendChild(currentWeatherHumidity) 
            currentWeatherBody.appendChild(currentWeatherWind) 
            
        }
    });
} 

function appendLocalStorage() {
    for (let i = 0; i < archive.length; i++) {
        var ulEl=document.getElementById("local-storage") 
        var liEl=document.createElement("li")
        var button=document.createElement("button") 
        button.setAttribute("data-city", archive[i])
        button.textContent="search"
        button.addEventListener("click",function(event) {
            console.log(event.target.getAttribute("data-city"))
            searchText.value=event.target.getAttribute("data-city")
            getCurrentWeather(event)
            getFiveDayForecast(event)
        })
        liEl.textContent=archive[i] 
        ulEl.appendChild(liEl)
        liEl.appendChild(button) 
    }
} 


appendLocalStorage()

searchButton.addEventListener("click", getCurrentWeather) 

searchButton.addEventListener("click", getFiveDayForecast)






