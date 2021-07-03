//var cityInputEl = document.querySelector('#city-name');
var cityInputEl = document.querySelector('.input');
var weatherContainerEl = document.querySelector('#weather-container');
//var cityFormEl = document.querySelector('#city-form');
var cityFormEl = document.querySelector('.button');
var cityLat = 0;
var cityLon = 0;
const input = document.querySelector('input');

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
$("#current-image").children("img").attr("src", weatherIcon);
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

  var date = moment().add(1,'days').format('L');
  $("#day1").html(date);
  var weatherIcon = "http://openweathermap.org/img/wn/" + input.daily[0].weather[0].icon + "@2x.png"
  console.log(input.daily[0].weather[0].icon);
  $("#day1-image").children("img").attr("src", weatherIcon);
  $("#day1-temp").html("Temp: " + input.daily[0].temp.day + "&deg;F");
  console.log(input.daily[0].temp.day);
  $("#day1-wind").html("Wind: " + input.daily[0].wind_speed + " MPH");
  $("#day1-humidity").html("Humidity: " + input.daily[0].humidity + "%");

  var date = moment().add(2,'days').format('L');
  $("#day2").html(date);
  var weatherIcon = "http://openweathermap.org/img/wn/" + input.daily[1].weather[0].icon + "@2x.png"
  console.log(input.daily[1].weather[0].icon);
  $("#day2-image").children("img").attr("src", weatherIcon);
  $("#day2-temp").html("Temp: " + input.daily[1].temp.day + "&deg;F");
  console.log(input.daily[1].temp.day);
  $("#day2-wind").html("Wind: " + input.daily[1].wind_speed + " MPH");
  $("#day2-humidity").html("Humidity: " + input.daily[1].humidity + "%");

  var date = moment().add(2,'days').format('L');
  $("#day3").html(date);
  var weatherIcon = "http://openweathermap.org/img/wn/" + input.daily[2].weather[0].icon + "@2x.png"
  console.log(input.daily[2].weather[0].icon);
  $("#day3-image").children("img").attr("src", weatherIcon);
  $("#day3-temp").html("Temp: " + input.daily[2].temp.day + "&deg;F");
  console.log(input.daily[2].temp.day);
  $("#day3-wind").html("Wind: " + input.daily[2].wind_speed + " MPH");
  $("#day3-humidity").html("Humidity: " + input.daily[2].humidity + "%");

  var date = moment().add(3,'days').format('L');
  $("#day4").html(date);
  var weatherIcon = "http://openweathermap.org/img/wn/" + input.daily[3].weather[0].icon + "@2x.png"
  console.log(input.daily[3].weather[0].icon);
  $("#day4-image").children("img").attr("src", weatherIcon);
  $("#day4-temp").html("Temp: " + input.daily[3].temp.day + "&deg;F");
  console.log(input.daily[3].temp.day);
  $("#day4-wind").html("Wind: " + input.daily[3].wind_speed + " MPH");
  $("#day4-humidity").html("Humidity: " + input.daily[3].humidity + "%");

  var date = moment().add(4,'days').format('L');
  $("#day5").html(date);
  var weatherIcon = "http://openweathermap.org/img/wn/" + input.daily[4].weather[0].icon + "@2x.png"
  console.log(input.daily[4].weather[0].icon);
  $("#day5-image").children("img").attr("src", weatherIcon);
  $("#day5-temp").html("Temp: " + input.daily[4].temp.day + "&deg;F");
  console.log(input.daily[4].temp.day);
  $("#day5-wind").html("Wind: " + input.daily[4].wind_speed + " MPH");
  $("#day5-humidity").html("Humidity: " + input.daily[4].humidity + "%");

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
    var apiUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&exclude=hourly&units=imperial&appid=' + mykey;
  
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
      input.addEventListener('change', formSubmitHandler);

//      console.log(city_name);

//      var currentDate = moment().format('L');
//      var currentDate = moment().date();
      // console.log(currentDate);
      // $(".current-city").html(city_name + currentDate);