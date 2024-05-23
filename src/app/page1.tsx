"use client"; 
import React, { useState } from 'react';
import './page.css';
const getTableData = require('./scripts/helpers/getTableData').default;

const Page: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dataRequest = getTableData().then((data: any) => data);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <div className='background'>
      <div className='background-input'>
        <h1>IOT Mananger</h1>
      <input className="input-init" type="text" placeholder="User" style={{margin: '10px', padding: '10px'}}/>
      <input className="input-init" type="text" placeholder="Password" style={{margin: '10px', padding: '10px'}}/>
      <button className="login-button">Login</button>
        </div>
    </div>
  );
};

export default Page;