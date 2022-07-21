
import { useEffect, useState } from 'react';
import './App.css';
import Forecast from './components.js/Forecast';
import Inputs from './components.js/Inputs';
import TemperateurAndDetails from './components.js/TemperateurAndDetails';
import TimeAndLocation from './components.js/TimeAndLocation';
import TopButton from './components.js/TopButton';
import getFormattedWeatherData from './services/WeatherServices';


function App() {

  const [query, setQuery] = useState(
    localStorage.getItem('query') ? 
    JSON.parse(localStorage.getItem('query')) :
    {q : 'alger'}
  );
  const [units, setUnits] = useState(
    localStorage.getItem('unit') ? 
    JSON.parse(localStorage.getItem('unit')) :
    'metric'
  );
  const [weather, setWeather] = useState(null);

  useEffect(() =>{
    const fatchData = async () =>{
      const data = await getFormattedWeatherData({...query, units})
      .then((data) => setWeather(data))
      
    }
    
    fatchData()
  }, [query, units])

  

  const formatBgColor = () =>{

    if(!weather) {
      return 'blueBg'
    }
    const tempShold = units === 'metric' ? '20' : '68';
    if (weather.temp > tempShold){
      return 'redBg'
    }else{
      return 'blueBg'
    }
  }
  
  return (
    <div className={`app shadow-lg container my-4 mx-auto py-4 ${formatBgColor()}`}>
      <TopButton setQuery={setQuery} />
      <Inputs units={units} setUnits={setUnits} setWeather={setWeather} setQuery={setQuery}/>
      {weather ? (
        <>
        <TimeAndLocation weather={weather} />
        <TemperateurAndDetails  weather={weather} />
        <Forecast title='hourly forecast' items={weather.hourly} />
        <Forecast title='daily forecast' items={weather.daily} />
        </>
      ) : (
        <h1 className='my-5'>City is not found!</h1>

      )
       }

      
    </div>
  );
}

export default App;
