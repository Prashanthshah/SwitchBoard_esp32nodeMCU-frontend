import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Switch from '@mui/material/Switch';

// const SERVER = 'http://127.0.0.1:8000';
const SERVER = 'https://esp8266-bms.herokuapp.com';



const Switches = () => {
  const [switch1, setSwitch1] = useState(false);
  const [switch2, setSwitch2] = useState(false);



  useEffect(async () => {
    
       await axios.post(
        `${SERVER}/webhooks/update-switches`,{
          switch1, switch2
        }
      );
   
  }, [switch1,switch2]);

  return (
    <div className='flex h-full items-center w-full justify-around'>
      <div className='bg-secondary flex items-center text-xl justify-center rounded-md px-5 w-80 py-6 flex-col shadow-xl'>
        {/* dropdown box */}
        <button
          className='flex justify-between items-center text-gray-50 text-xl font-medium  rounded-lg p-2 px-6 py-2 w-full  border-2 border-purple-600'
          onClick={() => setSwitch1(!switch1)}
        >
          Circut 01
         <Switch   checked={switch1} color="secondary" />
        </button>
        <button
          className='flex justify-between mt-4 items-center text-gray-50 text-xl font-medium  rounded-lg p-2 px-6 py-2 w-full  border-2 border-purple-600'
          onClick={() => setSwitch2(!switch2)}
        >
          Circut 02
         <Switch   checked={switch2} color="secondary" />
        </button>
   
       </div>
    </div>
  );
};

export default Switches;
