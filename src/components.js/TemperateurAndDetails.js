import React from 'react'
import {FaTemperatureLow} from 'react-icons/fa'
import {MdOutlineWaterDrop} from 'react-icons/md'
import {GiWhirlwind} from 'react-icons/gi'
import {FiSun , FiSunset} from 'react-icons/fi'
import {AiOutlineArrowUp , AiOutlineArrowDown} from 'react-icons/ai'
import { formatToLocalTime, iconUrl } from '../services/WeatherServices'



function TemperateurAndDetails({weather :{details, sunrise, sunset, 
    timezone, temp, temp_max, temp_min, icon, feels_like, humidity, speed}}) {
  return (
    <div className='d-flex w-100 flex-column justify-content-center align-items-center mb-3'>
        <p className='h2 fw-normal' style={{color : '#02e4ff'}}>{details}</p>
        <div className='row d-flex w-100 justify-content-between align-items-center mt-2'>
            <div className='col'>
            <img src={iconUrl(icon)} alt={details} width='120' />
            </div>

            <div className='col'>
            <p className='h1 display-1 text-center'>{Math.round(temp)}°</p>
            </div>
            
            <div className='col ms-3'>
            <div className='d-flex flex-column justify-content-center align-items-center'>
               <div className='d-flex align-items-center'>
                 <FaTemperatureLow size='20' />
                 <p className='fw-light'>Reall fell : <span className='fw-semibold'>{feels_like}°</span></p>
               </div>
               <div className='d-flex align-items-center'>
                 <MdOutlineWaterDrop size='24' />
                 <p className='fw-light'>Humidity : <span className='fw-semibold'>{humidity}%</span></p>
               </div>
               <div className='d-flex align-items-center'>
                 <GiWhirlwind size='20' />
                 <p className='fw-light'>Wind : <span className='fw-semibold'>{speed.toFixed()}km/h</span></p>
               </div>
            </div>
            </div>
            
           
        </div>

        <div className=' TemperateurAndDetails-footer d-flex w-100 justify-content-center align-items-center mt-4'>
            <FiSun className='me-2' size='24' />
            <p className='fw-light'>Rise : </p>
            <p>{formatToLocalTime(sunrise, timezone, 'hh:mm a')}</p>
            <p className='mx-2'>|</p>

            <FiSunset className='me-2' size='24' />
            <p className='fw-light'>Set : </p>
            <p>{formatToLocalTime(sunset, timezone, 'hh:mm a')}</p>
            <p className='mx-2'>|</p>

            <AiOutlineArrowUp className='me-2' size='24' />
            <p className='fw-light'>High : </p>
            <p>{Math.round(temp_max)}°</p>
            <p className='mx-2'>|</p>

            <AiOutlineArrowDown className='me-2' size='24' />
            <p className='fw-light'>Low : </p>
            <p>{Math.round(temp_min)}°</p>
        </div>
    </div>
  )
}

export default TemperateurAndDetails