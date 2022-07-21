import React from 'react'
import { iconUrl } from '../services/WeatherServices'

function Forecast({title, items}) {
  return (
    <div className='d-flex w-100 flex-column justify-content-center my-3'>
        <h2 className='text-capitalize text-start'>{title}</h2>
        <hr className='my-2'></hr>

        <div className='d-flex align-items-center justify-content-between'>
          
          {items.map(item =>(
            <div key={item.title} className='d-flex flex-column align-items-center justify-content-center'>
            <p className='pb-2 fw-light text-center'>{item.title}</p>
            <img src={iconUrl(item.icon)} alt='' width='80' />
            <p>{item.temp.toFixed()}°</p>
          </div>
          ))}

        </div>
    </div>
  )
}

export default Forecast