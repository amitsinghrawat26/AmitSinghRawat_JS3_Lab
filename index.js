let searchBox = document.querySelector("input");
let city = document.querySelector("#city");
let date = document.querySelector("#date");
let temprature = document.querySelector("section");
let weather_type = document.querySelector("#weather-type");
let min_max = document.querySelector("#temprature");

searchBox.addEventListener('keypress', setQuery);

function setQuery(e) {
    if (e.keyCode == 13) {
        callWeatherApi(searchBox.value);
    }
}

function callWeatherApi(cityName) {
    console.log(cityName);

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=7e3f21edee540e6110af347b55eb1ab2`)
        .then(res => res.json())
        .then(res => {
            console.log(res)
            showResults(res)
        })
        .catch(error => {
            city.innerText = `${cityName} is not a city. Please enter a vaild city name... `;
            temprature.innerText = ``;
            date.innerText = '';
            weather_type.innerText = '';
            min_max.innerHTML = '';
        })

}

function showResults(result) {
    city.innerText = `${result.name}, ${result.sys.country}`
    temprature.innerText = `${Math.round(result.main.temp)}°c`
    date.innerText = findDate();
    weather_type.innerText = `${result.weather[0].main}`;
    min_max.innerHTML = `${Math.round(result.main.temp_min)}°c / ${Math.round(result.main.temp_max)}°c`
}

function findDate() {
    let months = ["January", "Februray", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Webnesday", "Thursday", "Friday", "Saturday"]
    let currDate = new Date();
    return `${days[currDate.getDay() - 1]} ${currDate.getDate()} ${months[currDate.getMonth()]} ${currDate.getFullYear()}`
}
