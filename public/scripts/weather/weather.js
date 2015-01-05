/**
 * Created by Wouter on 18/12/14.
 */

function handleMessage(e){
    (function getWeather(data){
        var getWeatherVar = function callback(weatherData){
            postMessage(JSON.parse(weatherData.response).query.results.channel);
        };
        var getWoeid = function callback(woeidData){
            var woeid = JSON.parse(woeidData.response).query.results.Result.woeid;
            request("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%3D"+woeid+"%20and%20u=%27c%27&format=json",getWeatherVar);
        };
        request("https://query.yahooapis.com/v1/public/yql?q=SELECT%20*%20FROM%20geo.placefinder%20WHERE%20text%3D%22"+data.k+"%2C%20"+data.D+"%22%20and%20gflags%3D%22R%22%0A%0A&format=json&diagnostics=true&callback=",getWoeid);
    })(e.data);

    function request(url,callback){
        var xhr;

        if(typeof XMLHttpRequest !== 'undefined') xhr = new XMLHttpRequest();
        else {
            var versions = ["MSXML2.XmlHttp.5.0",
                "MSXML2.XmlHttp.4.0",
                "MSXML2.XmlHttp.3.0",
                "MSXML2.XmlHttp.2.0",
                "Microsoft.XmlHttp"];

            for(var i = 0, len = versions.length; i < len; i++) {
                try {
                    xhr = new ActiveXObject(versions[i]);
                    break;
                }
                catch(e){}
            } // end for
        }

        xhr.onreadystatechange = ensureReadiness;

        function ensureReadiness() {
            if(xhr.readyState < 4) {
                return;
            }

            if(xhr.status !== 200) {
                return;
            }

            // all is well
            if(xhr.readyState === 4) {
                callback(xhr);
            }
        }

        xhr.open('GET', url, true);
        xhr.send('');
    }
}

addEventListener("message",handleMessage,false);