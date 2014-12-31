/**
 * Created by Wouter on 18/12/14.
 */

function getWorker(){
    var worker = new Worker("scripts/weather/weather.js");
    worker.onmessage = workDone;
    worker.onerror = workErr;
    return worker;
}

(function getWeather(){
    if(posGlobal != null){
        getWorker().postMessage(posGlobal);
    }
    else{
        setTimeout(function () {
            getWeather();
        },100);
    }
})();


function workDone(res){
    console.log(res.data);
    //location
    $("#location").text(res.data.location.city+" - "+res.data.location.country);

    //condition
    getCondintions(res.data.item.forecast[0].code);
    function getCondintions(con){
        var img = $("#weather img")[0];
        if(con >= 0 && con <= 47){
            if(con >= 0 && con <= 4){
                $(img).attr("src","/img/weather/lightning.svg");
                return "thunder";
            }
            else if(con >= 5 && con <= 7){
                $(img).attr("src","/img/weather/rain.svg");
                return "rain";
            }else if(con >= 8 && con <= 10){
                $(img).attr("src","/img/weather/drizzle.svg");
                return "drizzle";
            }else if(con >= 11 && con <= 12){
                $(img).attr("src","/img/weather/rain.svg");
                return "rain";
            }else if(con >= 13 && con <= 16){
                $(img).attr("src","/img/weather/snow.svg");
                return "snow";
            }else if(con == 17){
                $(img).attr("src","/img/weather/hail.svg");
                return "hail";
            }else if(con == 20){
                $(img).attr("src","/img/weather/fog.svg");
                return "fog";
            }else if(con == 24){
                $(img).attr("src","/img/weather/wind.svg");
                return "wind";
            }else if(con >= 27 && con <= 30){
                $(img).attr("src","/img/weather/cloudsun.svg");
                return "cloudsun";
            }else if(con == 32){
                $(img).attr("src","/img/weather/sun.svg");
                return "sunny";
            }else if(con >= 44 && con <= 47){
                $(img).attr("src","/img/weather/cloudsun.svg");
                return "cloudsun";
            }
            else{
                $(img).attr("src","/img/weather/sun.svg");
                return "sunny";
            }
        }
        else{
            console.log("there went something wrong");
        }
    }

    //temp
    getTemp(res.data.item.forecast[0].low,res.data.item.forecast[0].high);
    function getTemp(low,high){
        $("#tempHighP").text(high + "°");
        $("#tempLowP").text(low + "°");

        if(high >= 20){
            $($("#tempHighImg")[0]).attr("src","/img/weather/thermometer100.svg")
        }
    }

    //sun
    getSun(res.data.astronomy.sunrise,res.data.astronomy.sunset);
    function getSun(sunRise,sunSet){
        $("#sunriseP").text(sunRise);
        $("#sunsetP").text(sunSet);
    }
}

function workErr(){
    console.log("something went wrong with the weather");
}