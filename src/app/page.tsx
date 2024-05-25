"use client"; 
import React, { useState } from 'react';
import DynamicTable from './components/DynamicTable';
import { ChakraProvider, Box, Flex, Text } from "@chakra-ui/react";
import Controller from './scripts/helpers/Controller';
import './page.css';

const Page: React.FC = () => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [session, setSession] = useState(false);

  const handleLoginClick = async () => {
    const sessionValid = await Controller.validateSession(user, password);
    if(sessionValid){
      setSession(true);
    }
  }

  return (
    <div>
      {session ? (
        <ChakraProvider>
            <Box bg="rgb(151, 140, 201)" w="100%" p={4} color="rgb(255, 255, 255)">
              <Flex bg="rgb(151, 140, 201)">
                <Text bg="rgb(151, 140, 201)">Mananger</Text>
              </Flex>
            </Box>
            <Box w="100%" p={4} color="green">
              <Flex>
              </Flex>
            </Box>
            <DynamicTable color="red" id = "664f4310c8ada66e3574afa9"/>
        </ChakraProvider>
      ) : (
        <div className='background'>
        <div className='background-input'>
          <h1>IOT Mananger</h1>
          <input 
            id="user" 
            className="input-init" 
            type="text" 
            placeholder="User" 
            style={{margin: '10px', padding: '10px'}}
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
          <input 
            id="password" 
            className="input-init" 
            type="password" 
            placeholder="Password" 
            style={{margin: '10px', padding: '10px'}}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="login-button" onClick={handleLoginClick}>Login</button>
        </div>
        </div>
      )}
    </div>
  );
};

export default Page;