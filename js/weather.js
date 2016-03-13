/**
 * Created by franco on 12/03/16.
 */

$(document).ready(function(){
    var
        lat,
        lon,
        apiQuery,
        apiKey = "efd065b7771a39dd258cc02b2ba90e2f",
        currentTemp,
        minTemp,
        maxTemp;

    function convertTo(unit){
        if(unit === "kelvin"){
            $(".min span").html(minTemp+"°");
            $(".max span").html(maxTemp+"°");
            $(".current p").html(currentTemp+"°");
        }

        if(unit === "celsius"){
            $(".min span").html(minTemp-273+"°");
            $(".max span").html(maxTemp-273+"°");
            $(".current p").html(currentTemp-273+"°");
        }
    }

    $("#toKelvin").click(function(){
        convertTo("kelvin");

        $(".btn").removeClass("active");
        $("#toKelvin").addClass("active");
    });

    $("#toCelsius").click(function(){
        convertTo("celsius");

        $(".btn").removeClass("active");
        $("#toCelsius").addClass("active");
    });

    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position){
            lat = position.coords.latitude;
            lon = position.coords.longitude;
            apiQuery = "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&APPID="+apiKey;

            $.getJSON(apiQuery, function(data){
                currentTemp =Math.floor(data.main.temp);
                minTemp =Math.floor(data.main.temp_min);
                maxTemp =Math.floor(data.main.temp_max);

                $("#current-city").html(data.name).slideDown();
                $("i.icon").addClass("icon-"+data.weather[0].icon).slideDown();
                $("#current-description").html(data.weather[0].description).slideDown();

                $(".min span").html(minTemp+"°").slideDown();
                $(".max span").html(maxTemp+"°").slideDown();
                $(".current p").html(currentTemp+"°").slideDown();

                $(".min p").slideDown();
                $(".max p").slideDown();

                $("#current-humidity").html(Math.floor(data.main.humidity));
                $("#current-pressure").html(data.main.pressure);

                $("#more-info").fadeIn();


            });


        });

    } else {
        $("body").html("Your browser doesn't support geolocation.")
    }
});
