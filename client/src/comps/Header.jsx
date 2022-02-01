import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return <div className='header'>
      <h1>Super College</h1>
       <Link to='/degrees'><h1>Degrees</h1></Link>
       <Link to='/students'><h1>Students</h1></Link>

  </div>;
}
