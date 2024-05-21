"use client"; 
import React, { useState } from 'react';
import DynamicTable from './components/DynamicTable';
import { ChakraProvider, Button, Box, Flex, Text } from "@chakra-ui/react";
import CreateModal from './components/CreateModal';

const getTableData = require('./scripts/helpers/getTableData').default;

const Page: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dataRequest = getTableData().then((data: any) => data);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <div>
      <ChakraProvider>
        <Box bg="rgb(109, 121, 154)" w="100%" p={4} color="rgb(255, 255, 255)">
          <Flex>
            <Text>Mananger</Text>
          </Flex>
        </Box>
        <Box w="100%" p={4} color="green">
          <Flex>
            
          </Flex>
        </Box>
        <DynamicTable color="red" data={dataRequest}/>
        <CreateModal isOpen={isOpen} onClose={handleClose} />
      </ChakraProvider>
    </div>
  );
};

export default Page;