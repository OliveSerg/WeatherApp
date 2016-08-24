const API_KEY = "93e210905adedce9"

var app = {
  cities: [],

  render: function(){
    $('#city').html("")
    app.cities.forEach(function(city){
      var $weatherCard = app.weatherCard(city)
      $weatherCard.appendTo($('#cities-list'))
    })
  },

  weatherCard: function(city){

  }

  logResults: function(data){
    $('#cities-list').html("")
    data.RESULTS.forEach(function(city){
      cityName = $('<h3>').addClass('city').text(city.name)
      $('#cities-list').append(cityName)
    })
  },

  // getWeather: function(e){
  //   e.preventDefault();
  //   location = $('#search-input').val()
  //   $.ajax({
  //     url: `http://api.wunderground.com/api/${API_KEY}/geolookup/conditions/q/Canada/${location}.jsonp?callback=app.logResults`,
  //     method: 'GET',
  //     dataType: 'jsonp',
  //     success: app.logResults
  //   })
  // },

  autoComplete: function(){
    text = $(this).val()
    $.ajax({
      url: `http://autocomplete.wunderground.com/aq?query=${text}&cb=app.logResults`,
      method: 'GET',
      dataType: 'jsonp',
      success: app.logResults
    })
  },

  init: function(){
    $(document).on('keyup', '#search-input', app.autoComplete)
    $(document).on('click', '.city', app.render)
  }
}

$(document).ready(function(){
  app.init()
})
