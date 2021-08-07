const hourElement = document.querySelector('.hour')
const minuteElement = document.querySelector('.minute')
const secondElement = document.querySelector('.second')
const timeElement = document.querySelector('.time')
const dateElement = document.querySelector('.date')
const toggle = document.querySelector('.toggle')
const icon = document.querySelector('.fas')
 
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

toggle.addEventListener('click', (event)=>{
    const html = document.querySelector('html')
    if(html.classList.contains('dark')){
        html.classList.remove('dark')
        changeIcon()
    }
    else{
        html.classList.add('dark')
        changeIcon()
        
    }
})

function setTime(){
    const time = new Date()
    const month = time.getMonth()
    const day = time.getDay()
    const date = time.getDate()
    const hours = time.getHours()
    const hoursForClock = hours % 12
    const minutes = time.getMinutes()
    const seconds = time.getSeconds()
    const ampm = hours>=12 ? 'PM' : 'AM'

    hourElement.style.transform = `translate(-50%, -100%) rotate(${scale(hoursForClock, 0, 11, 0, 360)}deg)`

    minuteElement.style.transform = `translate(-50%, -100%) rotate(${scale(minutes, 0, 60, 0, 360)}deg)`
    
    secondElement.style.transform = `translate(-50%, -100%) rotate(${scale(seconds, 0, 60, 0, 360)}deg)`

    timeElement.innerHTML = `${hoursForClock}:${minutes<10 ?`0${minutes}` :minutes}:${seconds<10 ? `0${seconds}`:seconds } 
    
    <small class="ampm"> ${ampm} </small>`

    dateElement.innerHTML = `${days[day]}, ${months[month]}  <span class="circle" >${date}</span>`
}

function changeIcon(){
    if(icon.classList.contains('fa-sun')){
        icon.classList.remove('fa-sun')
        icon.classList.add('fa-moon')
    }
    else if(icon.classList.contains('fa-moon')){
        icon.classList.remove('fa-moon')
        icon.classList.add('fa-sun')
    }
}

// https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers

const scale = (num, in_min, in_max, out_min, out_max) => {
  return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

setTime()

setInterval(setTime, 1000);


//Weather data from openWeatherMap
const api_url = "http://api.openweathermap.org/data/2.5/weather?q=Kathmandu&appid=fc1eee466732cb993168dc5094445158"


const weatherEl = document.querySelector('.weather-data')
async function getWeather(){

    const res = await axios.get(api_url)
    const data = await res.data

    const temp = Math.floor(data.main.feels_like - 273.13) + "°C"
    const desc = data.weather[0].description 
    const wind = data.wind.speed + " km/h"

    weatherEl.innerHTML = `
            <div>  <span class="desc">${desc},  ${temp} </span></div>
            <div> Wind:<span class="wind"> ${wind}</span></div>
            
    `
}

getWeather()

