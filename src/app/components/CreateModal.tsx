import React, { useEffect, useState } from 'react';
import {
  Textarea,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import Controller from '../scripts/helpers/Controller';

const CreateModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [configuration, setConfiguration] = useState('');

  useEffect(() => {
    const fetchDevices = async () => {
      const devices = await Controller.DevicesInfo();
      setDevices(devices);
    };
  
    fetchDevices();
  }, []);

  const handleSubmit = () => {
    if (!selectedDevice || !configuration) {
      return;
    }

    Controller.addDevice(selectedDevice, configuration);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Adicionar dispositivo</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <Select placeholder="Selecione o dispositivo" onChange={(e) => {
              const device = devices.find(device => device._id === e.target.value);
              setSelectedDevice(device || null);
            }}>
              {devices.map((device, index) => (
                <option key={index} value={device._id}>
                  {device.device}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Configuração</FormLabel>
            <Textarea value={configuration} onChange={(e) => setConfiguration(e.target.value)} style={{ height: "200px" }}/> 
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="ghost" onClick={handleSubmit}>Criar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateModal;