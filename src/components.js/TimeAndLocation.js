import React from 'react'
import { formatToLocalTime } from '../services/WeatherServices'

function TimeAndLocation({weather : {dt,country, name,timezone}}) {
  return (
    <div className='d-flex flex-column justify-content-center align-items-center my-3'>
        <p className='fw-light text-center'>{formatToLocalTime(dt, timezone)}</p>
        <h3 className='h1 mt-3'>{name}, {country}</h3>
    </div>
  )
}

export default TimeAndLocation