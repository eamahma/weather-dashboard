var cityInputEl = document.querySelector('#city-name');
var weatherContainerEl = document.querySelector('#weather-container');
var cityFormEl = document.querySelector('#city-form');

var city_name = 'London';
var API_key = "11f9582ece85ca8ef8b9f2b18446e134";
var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city_name + '&appid=' + API_key;

fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });


    var formSubmitHandler = function (event) {
        event.preventDefault();
      
        var city = cityInputEl.value.trim();
  //      console.log(city);
  //      city_name = city;
      
        if (city) {
           getCityWeather(city);
      
//          weatherContainerEl.textContent = '';
          cityInputEl.value = '';
        } else {
          alert('Please enter a City name');
        }
      };


var displayWeather = function (input) {
  var result = input.name;
  var currentDate = moment().format('L');
  result += " " + currentDate;
  $(".current-city").html(result);
  $("#temp").html("Temp: " + input.main.temp + "&deg;F");
  $("#wind").html("Wind: " + input.wind.speed + " MPH");
  $("#humidity").html("Humidity: " + input.main.humidity + "%");
  return;
}      

var getCityWeather = function (city) {
//          console.log(city);
  var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=' + API_key;

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
          displayWeather(data);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect to OpenWeather');
    });
};

  
      cityFormEl.addEventListener('submit', formSubmitHandler);

//      console.log(city_name);

//      var currentDate = moment().format('L');
//      var currentDate = moment().date();
      // console.log(currentDate);
      // $(".current-city").html(city_name + currentDate);