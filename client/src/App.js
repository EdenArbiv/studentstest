import React from 'react';
import { BrowserRouter as Router, Routes , Route } from 'react-router-dom'
import Degrees from './comps/Degrees';
import Header from './comps/Header';
import NewStudent from './comps/NewStudent';
import Student from './comps/Student';
import Students from './comps/Students';


export default function App() {
  return(
  <Router>
  <div>
   <Header/>
    <Routes>
      <Route path="/degrees" element={<Degrees/>}/>
      <Route path="/students" element={<Students/>}/>
      <Route path="/" element={<Degrees/>}/>
      <Route path="/newstudent" element={<NewStudent/>}/>
      <Route path="/students/:studentid" element={<Student/>}/>

    </Routes>

  </div>
    </Router>
  )
}
