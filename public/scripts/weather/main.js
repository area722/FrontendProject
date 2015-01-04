/**
 * Created by Wouter on 18/12/14.
 */

function getWorker(){
    var worker = new Worker("scripts/weather/weather.js");
    worker.onmessage = workDone;
    worker.onerror = workErr;
    return worker;
}
var count = 0;
(function getWeather(){
    var a=navigator.onLine;
    if(a) {
        if (posGlobal !== null) {
            getWorker().postMessage(posGlobal);
        }
        else {
            setTimeout(function () {
                getWeather();
            }, 100);
        }
    }else{
        $.getJSON("/scripts/weather/data.json", function (data) {
            workDone({data:data.query.results.channel});
        });

    }
})();


function workDone(res){
    console.log(res.data);
    //location
    $("#location").text(res.data.location.city+" - "+res.data.location.country);

    //condition
    getCondintions(res.data.item.forecast[0].code);
    function getCondintions(con){
        if(con >= 0 && con <= 47){
            if(con >= 0 && con <= 4){
                return "thunder";
            }
            else if(con >= 5 && con <= 7){
                return "rain";
            }else if(con >= 8 && con <= 10){
                return "drizzle";
            }else if(con >= 11 && con <= 12){
                return "rain";
            }else if(con >= 13 && con <= 16){
                return "snow";
            }else if(con == 17){
                return "hail";
            }else if(con == 20){
                return "fog";
            }else if(con == 24){
                return "wind";
            }else if(con >= 27 && con <= 30){
                return "cloudsun";
            }else if(con == 32){
                return "sun";
            }else if(con >= 44 && con <= 47){
                return "cloudsun";
            }
            else{
                return "sun";
            }
        }
        else{
            console.log("there went something wrong");
        }
    }
    $($("#weather img")[0]).attr("src","/img/weather/"+getCondintions(res.data.item.forecast[0].code)+".svg");

    //temp
    getTemp(res.data.item.forecast[0].low,res.data.item.forecast[0].high);
    function getTemp(low,high){
        $("#tempHighP").text(high + "° (max)");
        $("#tempLowP").text(low + "° (min)");

        if(high >= 20){
            $($("#tempHighImg")[0]).attr("src","/img/weather/thermometer100.svg");
        }
    }

    //sun
    getSun(res.data.astronomy.sunrise,res.data.astronomy.sunset);
    function getSun(sunRise,sunSet){
        $("#sunriseP").text(sunRise);
        $("#sunsetP").text(sunSet);
    }

    //forecast
    getForecast(res.data.item.forecast[1],res.data.item.forecast[2]);
    function getForecast(tom,aft){
        console.log(tom);
        console.log(aft);
        $($("#tomorow #day")[0]).text(tom.day);
        $($("#dayAfter #day")[0]).text(aft.day);

        $($("#tomorow #weather img")[0]).attr("src","/img/weather/"+getCondintions(tom.code)+".svg");
        $($("#dayAfter #weather img")[0]).attr("src","/img/weather/"+getCondintions(aft.code)+".svg");
        $("#tempLowPTom").text(tom.low + "° (min)");
        $("#tempHighPTom").text(tom.high + "° (max)");
        $("#tempLowPAft").text(aft.low + "° (min)");
        $("#tempHighPAft").text(aft.high + "° (max)");
    }
}

function workErr(){
    console.log("something went wrong with the weather");
}