import React from 'react'

function TopButton({setQuery}) {
    const cities = [
        {
            id : 1,
            title : 'London'
        },
        {
            id : 2,
            title : 'Dubai'
        },
        {
            id : 3,
            title : 'Algiers'
        },
        {
            id : 4,
            title : 'New York'
        },
        {
            id : 5,
            title : 'Tunisia'
        },
    ]

    const handleClick = (city) =>{
        setQuery({q : city});
        localStorage.setItem('query', JSON.stringify({q : city}))
    }

  return (
    <div className='w-100 d-flex align-items-center justify-content-around'>
        {cities.map((city) =>(
            <button onClick={() => handleClick(city.title)} key={city.id} className='city-btn btn text-white fw-semibold fs-5'>{city.title}</button>
        ))}

    </div>
  )
}

export default TopButton