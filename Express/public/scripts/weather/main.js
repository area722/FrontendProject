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

}

function workErr(){
    console.log("something went wrong with the weather");
}