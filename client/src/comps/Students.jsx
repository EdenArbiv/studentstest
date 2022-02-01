import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Students() {

    const [students, setstudents] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        (async () => {
          const res = await fetch("http://localhost:1000/students")
          const data = await res.json();
          setstudents(data);
          console.log(data)
        })();
      }, [])



  return <div className='students'>
    <button onClick={()=> navigate('/newstudent')} className='add'>+</button>
      <div className='headrow'><h3>Name</h3><h3>Age</h3><h3>Degree</h3><h3 style={{width:"60px"}}>Num of Degree</h3></div>
      {
          students.map(student => {
              return <div onClick={() => navigate(`/students/${student.id}`)} className='student'>
                  <h5>{student.name}</h5>
                  <h5>{student.age}</h5>
                  <h5>{student.degrees_name}</h5>
                  <h5>{student.degree_phase}</h5>
                
              </div>
          })
      }
   
  </div>;
}
