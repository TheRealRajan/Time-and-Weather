const hourElement = document.querySelector('.hour')
const minuteElement = document.querySelector('.minute')
const secondElement = document.querySelector('.second')
const timeElement = document.querySelector('.time')
const dateElement = document.querySelector('.date')
const toggle = document.querySelector('.toggle')
const icon = document.querySelector('.fas')

const form = document.querySelector('.form')
const search = document.querySelector('.search')
const clear = document.querySelector('.clear')
 
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

    timeElement.innerHTML = `${hoursForClock==0? 12 : hoursForClock}:${minutes<10 ?`0${minutes}` :minutes}:${seconds<10 ? `0${seconds}`:seconds } 
    
    <small class="ampm"> ${ampm} </small>`

    dateElement.innerHTML = `${days[day]}, ${months[month]}  <span class="circle" >${date}</span>`
    // console.log('The hour hand value is ' + hours , hoursForClock)
    // console.log(scale(hoursForClock, 0, 11, 0, 360), scale(minutes, 0, 60, 0, 360), scale(seconds, 0, 60, 0, 360) )
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




const weatherEl = document.querySelector('.weather-data')
async function getWeather(cityname){
    try{
    //Weather data from openWeatherMap
    const api_url = "https://api.openweathermap.org/data/2.5/weather?q="+cityname+"&appid=fc1eee466732cb993168dc5094445158"
    // Please dont use my API Key. It has limited number of requests.
    // You can get your own API key from OpenWeatherMap. Its completely free!
    
    
    const res = await axios.get(api_url)
    const data = await res.data
    console.log(data)
    const temp = Math.floor(data.main.feels_like - 273.13) + "°C"
    const desc = data.weather[0].description 
    const wind = data.wind.speed + " km/h"
    const city = data.name
    const country = data.sys.country

    //Weather data fetched from OpenWeathMap injected dynamically
    weatherEl.innerHTML = 
    `<div >
        <span class="city"> ${city +","}</span>
        <span class="country"> ${"  " + country }</span> 
        <img class="flag" src="https://www.countryflags.io/${country}/flat/32.png">
    </div> 
    
    <div><span class="desc">${desc},  ${temp} </span></div>
    <div> Wind:<span class="wind"> ${wind}</span></div>`
    }
    catch(err){
        alert('Invalid city name! Please enter correct city name and try again.')
    }
    

}
    

//Clear the search input value when clicked
clear.addEventListener('click', ()=>{
    search.value =''
})
//Get input value from form when it is submitted
form.addEventListener('submit', (e) =>{
    e.preventDefault()
    const cityname = search.value
    search.value=''
    getWeather(cityname)
})


