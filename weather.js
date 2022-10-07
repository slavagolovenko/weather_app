const inputArea = document.querySelector('.input-area');
const cityError = document.querySelector('.city-error');
const input = document.getElementById('enter-city');
const locationBtn = document.getElementById('location-btn');
const headerBtn = document.getElementById('header-btn');
const weatherArea = document.querySelector('.weather-area');
const cityName = document.querySelector('.city-name');
const weatherDegree = document.querySelector('.weather-degree');
const weatherDescription = document.querySelector('.weather-description');

const forecastDate2 = document.querySelector('.forecast-date-second');
const forecastDate3 = document.querySelector('.forecast-date-third');

const forecastMain1 = document.querySelector('.forecast-main-first');
const forecastMain2 = document.querySelector('.forecast-main-second');
const forecastMain3 = document.querySelector('.forecast-main-third');

const forecastWeather1 = document.querySelector('.forecast-weather-first');
const forecastWeather2 = document.querySelector('.forecast-weather-second');
const forecastWeather3 = document.querySelector('.forecast-weather-third');


const forecastDescription1 = document.querySelector('.forecast-description-first');
const forecastDescription2 = document.querySelector('.forecast-description-second');
const forecastDescription3 = document.querySelector('.forecast-description-third');


//Setting the input to fetch the user's location every time we press the Enter button on keyboard:
input.addEventListener('keypress' , (e) => {
    if (e.key === 'Enter' && input.value != '') {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input.value}&units=metric&appid=fac97e1eaa4ae7e57852cd930ef5e382`).then(response => response.json()).then(res => {
            settingWeather(res)}); 
        
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${input.value}&units=metric&appid=fac97e1eaa4ae7e57852cd930ef5e382`).then(response => response.json()).then(res => settingForecast(res)) 
        }}
    )



//Setting the button to fetch the user's location every time we click on it
locationBtn.addEventListener('click' , () => {

    if (navigator.geolocation) {
        const locationData = navigator.geolocation.getCurrentPosition(onSuccess, onError)
    
    function onSuccess(position) {
    const {latitude, longitude} = position.coords
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=fac97e1eaa4ae7e57852cd930ef5e382`).then(response => response.json()).then(res =>  settingWeather(res));

    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=fac97e1eaa4ae7e57852cd930ef5e382`).then(response => response.json()).then(res => settingForecast(res))       
}

    function onError() {
    alert('Failed to fetch your location')}
    
    } else {
        alert('Your device does not support geolocation')
    }
})



// Putting fetched data into our elements
function settingWeather(data) {  

    if (data.cod === '404') {
        cityError.style.display = 'block'
        input.style.border = '2px solid rgb(230, 40, 70)'
    } else {
    const nameValue = data['name'];
    const tempValue = data['main']['temp'];
    const descValue = data['weather'][0]['description'];
    const tempId = data['weather'][0]['id']

    cityName.innerHTML = nameValue;
    weatherDegree.innerHTML = `${Math.floor(tempValue)}°`;
    weatherDescription.innerHTML = descValue;

    cityError.style.display = 'none';
    input.style.border = ''
    weatherArea.style.display = 'flex';
    inputArea.style.display = 'none';
    headerBtn.style.display = 'flex';

    if (data['main'].temp < 0) {
        weatherDegree.style.margin = '0px'
    } else {
        weatherDegree.style.marginLeft = '30px'
    }

    if (tempId === 800) {
    document.body.style.backgroundImage = "url('conditions/clear.png')";
    } else if (tempId >= 200 && tempId <= 232) {
    document.body.style.backgroundImage = "url('conditions/storm.png')";
    } else if (tempId >= 600 && tempId <= 622) {
    document.body.style.backgroundImage = "url('conditions/snow.png')";
    } else if (tempId >= 700 && tempId <= 781) {
    document.body.style.backgroundImage = "url('conditions/haze.png')";
    } else if (tempId >= 801 && tempId <= 803) {
    document.body.style.backgroundImage = "url('conditions/scattered.png')";
    } else if (tempId === 804) {
    document.body.style.backgroundImage = "url('conditions/overcast.png')";
    } else if (tempId >= 300 && tempId <= 321 || tempId >= 500 && tempId <= 531) {
    document.body.style.backgroundImage = "url('conditions/rain.png')";
    }

    headerBtn.addEventListener('click' , () => {
    weatherArea.style.display = 'none'
    inputArea.style.display = 'flex'
    headerBtn.style.display = 'none'
    })

    document.addEventListener('keyup' , (e) => {
    if (e.key === 'Escape') {
    weatherArea.style.display = 'none'
    inputArea.style.display = 'flex'
     headerBtn.style.display = 'none'
    }})
 
}
}

function settingForecast(data) {
    if (data.cod === '404') {
     cityError.style.display = 'block'
    input.style.border = '2px solid rgb(230, 40, 70)'
    } else {

    const dateValue2 = new Date(data.list[15].dt_txt).toDateString().substring(3, 10)
    forecastDate2.innerHTML = dateValue2

    const dateValue3 = new Date(data.list[23].dt_txt).toDateString().substring(3, 10)
    forecastDate3.innerHTML = dateValue3

    const WeatherValue1 = data.list[7].main.temp
    forecastWeather1.innerHTML = `${Math.floor(WeatherValue1)}°`

    const WeatherValue2 = data.list[15].main.temp
    forecastWeather2.innerHTML = `${Math.floor(WeatherValue2)}°`

    const WeatherValue3 = data.list[23].main.temp
    forecastWeather3.innerHTML = `${Math.floor(WeatherValue3)}°`

    const weatherDescription1 =  data.list[7].weather[0].description
    const weatherDescription2 =  data.list[15].weather[0].description
    const weatherDescription3 =  data.list[23].weather[0].description
    forecastDescription1.innerHTML = weatherDescription1
    forecastDescription2.innerHTML = weatherDescription2
    forecastDescription3.innerHTML = weatherDescription3

    const tempId1 = data.list[7]['weather'][0].id
    const tempId2 = data.list[15]['weather'][0].id
    const tempId3 = data.list[23]['weather'][0].id

    if (data.list[7]['main'].temp < 0) {
        forecastWeather1.style.margin = '0px'
    } else {
        forecastWeather1.style.marginLeft = '10px'
    }

    if (data.list[15]['main'].temp < 0) {
        forecastWeather2.style.margin = '0px'
    } else {
        forecastWeather2.style.marginLeft = '10px'
    }
    
    if (data.list[23]['main'].temp < 0) {
        forecastWeather3.style.margin = '0px'
    } else {
        forecastWeather3.style.marginLeft = '10px'
    }

        

    if (tempId1 === 800) {
    forecastMain1.style.backgroundImage = "url('conditions/clear.png')";
    } else if (tempId1 >= 200 && tempId1 <= 232) {
    forecastMain1.style.backgroundImage = "url('conditions/storm.png')";
    } else if (tempId1 >= 600 && tempId1 <= 622) {
    forecastMain1.style.backgroundImage = "url('conditions/snow.png')"; 
    } else if (tempId1 >= 700 && tempId1 <= 781) {
    forecastMain1.style.backgroundImage = "url('conditions/haze.png')";
    } else if (tempId1 >= 801 && tempId1 <= 803) {
    forecastMain1.style.backgroundImage = "url('conditions/scattered.png')";
    } else if (tempId1 === 804) {
    forecastMain1.style.backgroundImage = "url('conditions/overcast.png')";
    } else if (tempId1 >= 300 && tempId1 <= 321 || tempId1 >= 500 && tempId1 <= 531) {
    forecastMain1.style.backgroundImage = "url('conditions/rain.png')";
    }

    if (tempId2 === 800) {
    forecastMain2.style.backgroundImage = "url('conditions/clear.png')";
    } else if (tempId2 >= 200 && tempId2 <= 232) {
    forecastMain2.style.backgroundImage = "url('conditions/storm.png')";
    } else if (tempId2 >= 600 && tempId2 <= 622) {
    forecastMain2.style.backgroundImage = "url('conditions/snow.png')"; 
    } else if (tempId2 >= 700 && tempId2 <= 781) {
    forecastMain2.style.backgroundImage = "url('conditions/haze.png')";
    } else if (tempId2 >= 801 && tempId2 <= 803) {
    forecastMain2.style.backgroundImage = "url('conditions/scattered.png')";
    } else if (tempId2 === 804) {
    forecastMain2.style.backgroundImage = "url('conditions/overcast.png')";
    } else if (tempId2 >= 300 && tempId2 <= 321 || tempId2 >= 500 && tempId2 <= 531) {
    forecastMain2.style.backgroundImage = "url('conditions/rain.png')";
    }

    if (tempId3 === 800) {
    forecastMain3.style.backgroundImage = "url('conditions/clear.png')";
    } else if (tempId3 >= 200 && tempId3 <= 232) {
    forecastMain3.style.backgroundImage = "url('conditions/storm.png')";
    } else if (tempId3 >= 600 && tempId3 <= 622) {
    forecastMain3.style.backgroundImage = "url('conditions/snow.png')"; 
    } else if (tempId3 >= 700 && tempId3 <= 781) {
    forecastMain2.style.backgroundImage = "url('conditions/haze.png')";
    } else if (tempId3 >= 801 && tempId3 <= 803) {
    forecastMain3.style.backgroundImage = "url('conditions/scattered.png')";
    } else if (tempId3 === 804) {
    forecastMain3.style.backgroundImage = "url('conditions/overcast.png')";
    } else if (tempId3 >= 300 && tempId3 <= 321 || tempId3 >= 500 && tempId3 <= 531) {
    forecastMain3.style.backgroundImage = "url('conditions/rain.png')";
    }
    }
}
