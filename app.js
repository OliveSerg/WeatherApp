const API_KEY = "93e210905adedce9"

var app = {
  cities: [],

  render: function(jsonData){
    $('#city').html("").append([
      $('<h2>').addClass('city-name').text(jsonData.location.city),
      $('<h3>').addClass('country-name').text(jsonData.location.country_name),
      $('<p>').addClass('temperture').text("Currently it's " + jsonData.current_observation.temp_c)
    ])
  },

  logResults: function(data){
    $('#cities-list').html("")
    data.RESULTS.forEach(function(city){
      cityName = $('<h3>').addClass('city').text(city.name)
      $('#cities-list').append(cityName)
    })
  },

  displayURL: function(text){
    textArray = text.split(", ")
    if (text.match(/,\s/g).length < 1 || text.match(/,\s/g).length == null ){
      return `http://api.wunderground.com/api/${API_KEY}/geolookup/conditions/q/${text}.json`
    }else{
      return `http://api.wunderground.com/api/${API_KEY}/geolookup/conditions/q/${textArray[1]}/${textArray[0]}.json`
    }
  },

  getWeather: function(){
    var url = app.displayURL($(this).text())
    $.ajax({
      url: url,
      method: 'GET',
      dataType: 'json',
      success: function(data){
        app.render(data)
      }
    })
  },

  autoComplete: function(){
    var text = $(this).val()
    $.ajax({
      url: `http://autocomplete.wunderground.com/aq?query=${text}&cb=app.logResults`,
      method: 'GET',
      dataType: 'jsonp',
      success: app.logResults
    })
  },

  init: function(){
    $(document).on('keyup', '#search-input', app.autoComplete)
    $(document).on('click', '.city', app.getWeather)
  }
}

$(document).ready(function(){
  app.init()
})
