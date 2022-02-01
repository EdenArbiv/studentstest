import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function Student() {
    const {studentid} = useParams()
    const [student, setstudent] = useState([]);
    const navigate = useNavigate()
    const [age, setage] = useState(0);
    const [degreephase, setdegreephase] = useState(0);
       
   useEffect(() => {
    (async () => {
   const res = await fetch(`http://localhost:1000/students/${studentid}`)
         const data = await res.json()
         console.log(data);
         setstudent(data)
    })()
  }, []);

  const deleteStudent = async () => {
    const res = await fetch(`http://localhost:1000/students/${studentid}`,{
        method: "delete",
    })
    const data = await res.json();
    alert(data.msg);
    navigate('/students')
    
}

  const UpdateDetails = async () => {
    const res = await fetch(`http://localhost:1000/students/${studentid}`,{
        method: "put",
        headers: {'content-type':'application/json'},
        body:JSON.stringify({age , degreephase}),
    })
    const data = await res.json();
    alert(data.msg);
    navigate('/students')
    
}

  return student.length ? <div className='studentdata'>
      <h4>Name: {student[0].name}</h4>
      <h4>age:</h4>
      <input className='inp' onChange={e=> setage(e.target.value)} type="text" placeholder={student[0].age}/>
      <h4>Degree: {student[0].degrees_name}</h4>
      <h4>Num of Degrees:</h4>
      <input className='inp' onChange={e=> setdegreephase(e.target.value)} type="text" placeholder={student[0].degree_phase} />
      <h4>projects of this degree: {student[0].projects}</h4>
      <button onClick={() => navigate(`/students`)}>Return</button>
      <br />
      <button onClick={deleteStudent}>Delete Student</button>
      <br />
      <button onClick={UpdateDetails}>Update details</button>
      <br />
  </div> : <div>Student Not Found</div>
}
