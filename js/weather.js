/**
 * Created by franco on 12/03/16.
 */
$(window).load(function() {
    $("#loader").delay(1000).slideUp();
});

$(document).ready(function(){
    var
        lat,
        lon,
        apiQuery,
        apiKey = "efd065b7771a39dd258cc02b2ba90e2f",
        currentData = [];

    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position){
            lat = position.coords.latitude;
            lon = position.coords.longitude;
            apiQuery = "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&APPID="+apiKey;

            $.getJSON(apiQuery, function(data){
                console.log(data);
                return currentData = data;
            })
        });
    } else {
        /* geolocaiton IS NOT available */
    }
});
