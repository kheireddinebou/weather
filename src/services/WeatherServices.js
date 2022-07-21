import { DateTime } from "luxon"

const API_KEY = 'e4c0811bfec73b2124ffbb983fd66001'
const BASE_URL = 'https://api.openweathermap.org/data/2.5/'

const getWeatherData = (searchParam ,infoType) =>{
    const url = new URL(infoType , BASE_URL)
    url.search = new URLSearchParams({...searchParam, appid: API_KEY});
   
    return fetch(url)
    .then(res => res.json())
    
    
}

const formattedWeatherData = (data) =>{
   const {
    coord : {lat, lon},
    dt,
    main : {
        feels_like,
        humidity,
        pressure,
        temp,
        temp_max,
        temp_min
    },
    name,
    weather,
    sys : {
        country, sunrise, sunset
    },
    wind : {speed}
   } = data;

   const {main : details, icon} = weather[0];

   return {lat, lon, dt, feels_like, humidity,pressure,
    temp, temp_max, temp_min,name, weather, country, sunrise,
    sunset,speed, details, icon}
}

const formateForcasteWeather = (data) =>{
     let {daily, timezone, hourly} = data;

     daily = daily.slice(1, 6).map(d=>{
        return{
            title : formatToLocalTime(d.dt, timezone, 'ccc'),
            temp : d.temp.day,
            icon : d.weather[0].icon
        }
     })

     hourly = hourly.slice(1, 6).map(d=>{
        return{
            title : formatToLocalTime(d.dt, timezone, 'hh:mm a'),
            temp : d.temp,
            icon : d.weather[0].icon
        }
     })

     

     return {daily, timezone, hourly};
}

const getFormattedWeatherData = async (searchParam) =>{
     const formattedCurrentWeather =  await getWeatherData(searchParam, 'weather')
     
     .then(formattedWeatherData)

    

    
     const {lat , lon} = formattedCurrentWeather;

     const formattedForcasteWeather = await getWeatherData({
        lat, lon, exclude: 'current,minutely,alerts',  units: searchParam.units,
     }, 'onecall')
     .then(formateForcasteWeather)
     
     
    
    return {...formattedCurrentWeather, ...formattedForcasteWeather}

};

const formatToLocalTime = (secs, zone, 
    format = "cccc, dd LLL yyyy' | Local time : 'hh:mm a") => 

    DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const iconUrl = (code) => `http://openweathermap.org/img/wn/${code}@2x.png`;



export default getFormattedWeatherData

export {iconUrl, formatToLocalTime}