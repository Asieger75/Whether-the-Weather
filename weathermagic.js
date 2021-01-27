const API_key = 'c6dbc4ad804bfdc0473221ed78c36ae5';

document.getElementById("searchBtn").addEventListener("click", function(){

    getWeather(document.getElementById("searchField").value);
    getForecast(document.getElementById("searchField").value);
});


// this makes the API pull the temp, humidity, etc

function getWeather(cityName) {
    console.log(cityName);
    var currentUrl='http://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + API_key;
    $.ajax({
        url: currentUrl,
        type: "GET",
        success: function(result){
            console.log(result);
            console.log(result.coord);
            document.getElementById("name").innerHTML=result.name;
            document.getElementById("temp").innerHTML=result.main.temp;
            document.getElementById("humidity").innerHTML=result.main.humidity;
            document.getElementById("speed").innerHTML=result.wind.speed;

            document.getElementById("weatherIcon").src= 'http://openweathermap.org/img/wn/' + result.weather[0].icon + '@2x.png';

        }
    })
    //localStorage.setItem(JSON.stringify(cityName)) THIS BORKS THE WHOLE THINGS AS-IS
}

function getForecast(cityName) {
    console.log("hit");
    var currentUrl='http://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&appid=' + API_key;
    $.ajax({
        url: currentUrl,
        type: "GET",
        success: function(result){
            for (var i = 0; i <= 32; i += 8) {
                console.log(i);
                console.log(result);
                document.getElementById("temp" + i.toString()).innerHTML=result.list[i].main.temp;
                document.getElementById("humidity"+ i.toString()).innerHTML=result.list[i].main.humidity;
                document.getElementById("date" + i.toString()).innerHTML=result.list[i].dt_txt;
                document.getElementById("weatherIcon" + + i.toString()).src= 'http://openweathermap.org/img/wn/' + result.list[i].weather[0].icon + '@2x.png';
            }
        }
    })
}



// wizards say to capture lat&long from first APIcall, then plug that into the specific api call to get uv. probably do "if UVnum is less than x display color a,b,c"?
