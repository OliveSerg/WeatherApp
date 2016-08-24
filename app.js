const API_KEY = "93e210905adedce9"

var app = {
  cities: [],

  getWeather: function(e){
    e.preventDefault();
    location = $(this).children('input').val()
    $.ajax({
      url: `http://api.wunderground.com/api/${API_KEY}/conditions/q/Canada/${location}.json`,
      method: 'GET',
      dataType: 'json',
      success: function(data){
        console.log("got something")
      }
    })
  },

  render: function(){
    $('#cities-list').html("")
  },

  autoComplete: function(){
    text = $(this).val()
    $.ajax({
      url: `http://autocomplete.wunderground.com/aq?query=${text}&cb=app.logResults`,
      method: 'GET',
      dataType: 'jsonp',
      success: function(data){
        data.forEach(function(city){
          app.cities = []
          app.cites.push(city)
        })
        app.render()
      }
    })
  },

  init: function(){
    $(document).on('keyup', '#search-input', app.autoComplete)
    $(document).on('submit', '#search-location', app.getWeather)
  }
}

$(document).ready(function(){
  app.init()
})
