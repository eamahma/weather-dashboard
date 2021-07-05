//var cityInputEl = document.querySelector('#city-name');
var cityInputEl = document.querySelector('.input');
var weatherContainerEl = document.querySelector('#weather-container');
//var cityFormEl = document.querySelector('#city-form');
var cityFormEl = document.querySelector('.button');
var searchBoxEl = document.querySelector('#seachbox');
var cityLat = 0;
var cityLon = 0;
const input = document.querySelector('input');
var cityArray = [];

var city_name = 'London';
var mykey = API_key;
var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city_name + '&appid=' + API_key;

$(document).ready(function() {
  fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
//      console.log(data);
    });


    var formSubmitHandler = function (event) {
        event.preventDefault();

      
        var city = cityInputEl.value.trim();
        if (city) {
          getCityWeather(city);
          cityInputEl.value = '';
        } else {
          alert('Please enter a City name');
        }
      };


var displayWeather = function (input) {
  var result = input.name;
  var currentDate = moment().format('L');
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

  for (var i = 0; i < cityArray.length; i++){
    $("#M"+ i).text(localStorage.getItem(i));
  }

  // UV index display on today forecast and background color
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

  // Day 1 forcast
  var date = moment().add(1,'days').format('L');
  $("#day1").html(date);
  var weatherIcon = "http://openweathermap.org/img/wn/" + input.daily[0].weather[0].icon + "@2x.png"
  $("#day1-image").children("img").attr("src", weatherIcon);
  $("#day1-temp").html("Temp: " + input.daily[0].temp.day + "&deg;F");
  $("#day1-wind").html("Wind: " + input.daily[0].wind_speed + " MPH");
  $("#day1-humidity").html("Humidity: " + input.daily[0].humidity + "%");

  // Day 2 forcast
  var date = moment().add(2,'days').format('L');
  $("#day2").html(date);
  var weatherIcon = "http://openweathermap.org/img/wn/" + input.daily[1].weather[0].icon + "@2x.png"
  $("#day2-image").children("img").attr("src", weatherIcon);
  $("#day2-temp").html("Temp: " + input.daily[1].temp.day + "&deg;F");
  $("#day2-wind").html("Wind: " + input.daily[1].wind_speed + " MPH");
  $("#day2-humidity").html("Humidity: " + input.daily[1].humidity + "%");

  // Day 3 forcast
  var date = moment().add(3,'days').format('L');
  $("#day3").html(date);
  var weatherIcon = "http://openweathermap.org/img/wn/" + input.daily[2].weather[0].icon + "@2x.png"
  $("#day3-image").children("img").attr("src", weatherIcon);
  $("#day3-temp").html("Temp: " + input.daily[2].temp.day + "&deg;F");
  $("#day3-wind").html("Wind: " + input.daily[2].wind_speed + " MPH");
  $("#day3-humidity").html("Humidity: " + input.daily[2].humidity + "%");

  // Day 4 forcast
  var date = moment().add(4,'days').format('L');
  $("#day4").html(date);
  var weatherIcon = "http://openweathermap.org/img/wn/" + input.daily[3].weather[0].icon + "@2x.png"
  $("#day4-image").children("img").attr("src", weatherIcon);
  $("#day4-temp").html("Temp: " + input.daily[3].temp.day + "&deg;F");
  $("#day4-wind").html("Wind: " + input.daily[3].wind_speed + " MPH");
  $("#day4-humidity").html("Humidity: " + input.daily[3].humidity + "%");

  // Day 5 forcast
  var date = moment().add(5,'days').format('L');
  $("#day5").html(date);
  var weatherIcon = "http://openweathermap.org/img/wn/" + input.daily[4].weather[0].icon + "@2x.png"
  $("#day5-image").children("img").attr("src", weatherIcon);
  $("#day5-temp").html("Temp: " + input.daily[4].temp.day + "&deg;F");
  $("#day5-wind").html("Wind: " + input.daily[4].wind_speed + " MPH");
  $("#day5-humidity").html("Humidity: " + input.daily[4].humidity + "%");

  return;
}  

var getCityWeather = function (city) {
  var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=' + mykey;

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          cityArray.unshift(city);
          storeCity();
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

  var storeCity = function () {
    for (var i = 0; i < 8; i ++){
      localStorage.setItem(i, cityArray[i]);
    }
    return;
  };
 
// set the time blocks color based on current time
// $.each(cityArray, function (i) {
//   $("#M"+ i).text(localStorage.getItem(i));
//   console.log("#M" + i, i, cityArray[i]);
//   return;
// });
  
// eventlistner on both text change and dblclick
  $('#searchbox').on('change dblclick', formSubmitHandler);

  $('#M0').on('click', function(){
    cityInputEl.value = $('#M0').text();
    getCityWeather(cityInputEl.value);
  })

  $('#M1').on('click', function(){
    cityInputEl.value = $('#M1').text();
    getCityWeather(cityInputEl.value);
  })

  $('#M2').on('click', function(){
    cityInputEl.value = $('#M2').text();
    getCityWeather(cityInputEl.value);
  })

  $('#M3').on('click', function(){
    cityInputEl.value = $('#M3').text();
    getCityWeather(cityInputEl.value);
  })

  $('#M4').on('click', function(){
    cityInputEl.value = $('#M4').text();
    getCityWeather(cityInputEl.value);
  })

  $('#M5').on('click', function(){
    cityInputEl.value = $('#M5').text();
    getCityWeather(cityInputEl.value);
  })

  $('#M6').on('click', function(){
    cityInputEl.value = $('#M6').text();
    getCityWeather(cityInputEl.value);
  })

  $('#M7').on('click', function(){
    cityInputEl.value = $('#M7').text();
    getCityWeather(cityInputEl.value);
  })
})
