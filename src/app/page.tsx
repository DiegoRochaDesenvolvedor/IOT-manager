"use client"; 
import React, { useState } from 'react';
import DynamicTable from './components/DynamicTable';
import { ChakraProvider, Button, Box, Flex, Text } from "@chakra-ui/react";
import CreateModal from './components/CreateModal';
import Controller from './scripts/helpers/Controller';
const Page: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
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
        <DynamicTable color="red" id = "664f4310c8ada66e3574afa9" />
      </ChakraProvider>
    </div>
  );
};

export default Page;