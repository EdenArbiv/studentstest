import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NewStudent() {
    const [degrees, setdegrees] = useState([]);
    const [name, setname] = useState("");
    const [age, setage] = useState(0);
    const [degreeid, setdegreeid] = useState(0);
    const [degreephase, setdegreephase] = useState(0);
    const navigate = useNavigate()


    useEffect(() => {
        (async () => {
          const res = await fetch("http://localhost:1000/degrees")
          const data = await res.json();
          setdegrees(data);
          console.log(data)
        })();
      }, [])

    const AddStudent = async () => {
        const res = await fetch(`http://localhost:1000/newstudent`,{
            method: "post",
            headers: {'content-type':'application/json'},
            body:JSON.stringify({name , age , degreeid, degreephase }),
        })
        const data = await res.json();
        alert(data.msg);
        navigate('/students')
        
    }

  return <div className='addstudent'>
      <h3>Enter Name of Student:</h3>
      <input type="text" onChange={e => setname(e.target.value)}/>
      <h3>Enter age:</h3>
      <input type="number" onChange={e => setage(e.target.value)} />
      <br />
      <br />
      <select onChange={e => setdegreeid(e.target.value)}>
          <option disabled selected>select a degree</option>
      {
        degrees.map(degree => <option value={degree.id}>{degree.name}</option>)  
      }
        </select>
      <h3>Enter Number of Degree:</h3>
      <input type="number" onChange={e => setdegreephase(e.target.value)} />
      <br />
      <br />
      <button onClick={AddStudent}>Add Student</button>
  </div>;
}
