import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {

  return (
    <header>
      <div className='container'>
        <Link to="/">
          <h1>오늘의 운동</h1>
        </Link>
        <Link to="/calender">
          <h3>캘린더</h3>
        </Link>
      </div>
    </header>
  )
}

export default Navbar;