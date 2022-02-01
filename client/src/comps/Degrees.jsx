import React, { useEffect, useState } from 'react';

export default function Degrees() {
    const [degrees, setdegrees] = useState([]);

    useEffect(() => {
        (async () => {
          const res = await fetch("http://localhost:1000/degrees")
          const data = await res.json();
          setdegrees(data);
          console.log(data)
        })();
      }, [])


  return <div className='main'>
      <h1>Our Degrees</h1>
      <div className='mainpage'>
      
      {
          degrees.map(degree => {return <div className='degree'><h3>{degree.name}</h3>
          <h5>Number of projects in this degree:{degree.projects}</h5></div>})
              
          
      }
      </div>
  </div>;
}
