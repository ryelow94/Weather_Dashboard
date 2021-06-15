var searchButton = document.querySelector("#search-button") 
var searchText = document.querySelector("#search-text")
var apiKey = "88600ab20da1ad63651c7d80a894f478" 
var weatherDataList = document.querySelector("#weather-data-list")

function getWeatherData(event) { 
    event.preventDefault()
    console.log(searchText.value)
    var requestUrl = "https://api.openweathermap.org/data/2.5/forecast?q="+ searchText.value +"&appid="+apiKey; 
    fetch(requestUrl)
    .then(function (response) { 
      return response.json(); 
    }) 
    .then(function(data) { 
        const weatherList = data.list
        console.log(data.list);
        for (let i = 0; i < weatherList.length; i++) {    
            var listItem = document.createElement("li") 
            listItem.textContent = weatherList[i].main.temp; 
            weatherDataList.appendChild(listItem);
        }
    });
} 
searchButton.addEventListener("click", getWeatherData) 



