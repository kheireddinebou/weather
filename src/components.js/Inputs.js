import React, { useState } from 'react'
import {FiSearch} from 'react-icons/fi'
import {HiOutlineLocationMarker} from 'react-icons/hi'

function Inputs({setUnits ,setQuery, setWeather, units}) {
  const [searchText, setSearchText] = useState('');

  const handleLocation = () =>{
    if (navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position) =>{
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        setQuery({
          lat,lon
        })
        localStorage.setItem('query', JSON.stringify({lat,lon}))
      })
    }
  }

  const handleSearch = () =>{
    if(searchText.trim().length >0){
      setWeather(null);
      setQuery({q :searchText});
      setSearchText('')
      localStorage.setItem('query', JSON.stringify({q :searchText}))
    }
  }

  const handleUnits = (unit) =>{
      if(unit !== units){
        setUnits(unit)
        localStorage.setItem('unit', JSON.stringify(unit))
      }
  }

  return (
    <div className='w-100 d-flex mx-auto justify-content-center align-items-center py-2'>
        <input
        className='input-search shadow'
        type='text'
        placeholder='Search...'
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}

        />
        <div className='search-btns d-flex justify-content-center align-items-center ms-3'>
        <FiSearch onClick={handleSearch} className='ms-2 search-btn' />
        <HiOutlineLocationMarker onClick={handleLocation} className='ms-2 location-btn' />
        </div>

        <div className='temp-btns d-flex justify-content-center align-items-center text-white ms-3'>
            <button onClick={() => handleUnits('metric')} className='temp-btn bg-transparent border-none text-white'>°C</button>
            <p>|</p>
            <button onClick={() => handleUnits('imperial')} className='temp-btn bg-transparent border-none text-white'>°F</button>
        </div>

        
    </div>
  )
}

export default Inputs