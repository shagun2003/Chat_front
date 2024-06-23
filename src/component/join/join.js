import React, { useState } from 'react';
import './join.css';
import one from './one.png';
import { Link } from 'react-router-dom';

let user;

const sendUser = () => { 
  user = document.getElementById('joininput').value;
  document.getElementById('joininput').value = '';
};

const Join = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginClick = (event) => {
    if (!name || !password) {
      event.preventDefault(); 
      alert('Please fill out both name and password fields.');
    } else {
      sendUser();
    }
  };

  return (
    <div className='Joinpae'>
      <div className='joincontainer'>
        <img src={one} alt='' />
        <input 
          onChange={(e) => setName(e.target.value)} 
          type='text' 
          id='joininput' 
          placeholder='Name'
          value={name}  
        />
        <input 
          onChange={(e) => setPassword(e.target.value)} 
          type='password' 
          id='joinpass' 
          placeholder='Password'
          value={password} 
        />
        <Link to='/cat' onClick={handleLoginClick}>
          <button className='joinbtn'>Login</button>
        </Link>
      </div>
    </div>
  );
}

export default Join;
export { user };
