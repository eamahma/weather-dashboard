//var cityInputEl = document.querySelector('#city-name');
var cityInputEl = document.querySelector('.input');
var weatherContainerEl = document.querySelector('#weather-container');
//var cityFormEl = document.querySelector('#city-form');
var cityFormEl = document.querySelector('.button');
var cityLat = 0;
var cityLon = 0;

var city_name = 'London';
var mykey = API_key;
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
        console.log(city);
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
//  result += " " + currentDate;
$("#current-city").html("City: " + result);
var weatherIcon = "http://openweathermap.org/img/wn/" + input.weather[0].icon + "@2x.png"
$(".image").children("img").attr("src", weatherIcon);
$("#current-date").html("Today: " + currentDate);
$("#temp").html("Temp: " + input.main.temp + "&deg;F");
  $("#wind").html("Wind: " + input.wind.speed + " MPH");
  $("#humidity").html("Humidity: " + input.main.humidity + "%");
  return;
}      

var displayForcast = function (input) {
//  var result = input.name;
//  var currentDate = moment().format('L');
// result += " " + currentDate;
//  $(".current-city").html(result);
//  $("#temp").html("Temp: " + input.main.temp + "&deg;F");
//  $("#wind").html("Wind: " + input.wind.speed + " MPH");
//  $("#humidity").html("Humidity: " + input.main.humidity + "%");
  $("#uvi-color").html(input.current.uvi);
  if (input.current.uvi < 3) {
    $("#uvi-color").attr("style", "background-color: lightgreen; padding: .5em; border-radius:20%")
  } else if (input.current.uvi < 6) {
    $("#uvi-color").attr("style", "background-color: yellow; padding: .5em; border-radius:20%")
  } else if (input.current.uvi < 8) {
    $("#uvi-color").attr("style", "background-color: orange; padding: .5em; border-radius:20%")
  } else {
    $("#uvi-color").attr("style", "background-color: red; padding: .5em; border-radius:20%")
  }
  return;
}  

var getCityWeather = function (city) {
//          console.log(city);
  var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=' + mykey;

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
          displayWeather(data);
          cityLat = data.coord.lat;
          cityLon = data.coord.lon;
          getCityForcast(cityLat, cityLon);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect to OpenWeather');
    });
};

var getCityForcast = function (latitude, longitude) {
//    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=' + mykey;
    var apiUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&exclude=hourly&appid=' + mykey;
  
    fetch(apiUrl)
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            console.log(data);
            displayForcast(data);
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      })
      .catch(function (error) {
        alert('Unable to connect to OpenWeather');
      });
  };

      cityFormEl.addEventListener('click', formSubmitHandler);

//      console.log(city_name);

//      var currentDate = moment().format('L');
//      var currentDate = moment().date();
      // console.log(currentDate);
      // $(".current-city").html(city_name + currentDate);