import React, { useState, useEffect } from 'react';
import { Select, Textarea, FormLabel, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, FormControl, FormErrorMessage } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import Controller from '../scripts/helpers/Controller';

interface PutModalProps {
  isOpen: boolean;
  onClose: () => void;
  id: string;
}

const PutModal: React.FC<PutModalProps> = ({ isOpen, onClose, id }) => {
  console.log('id-->', id);
  const [name, setDeviceName] = useState('');
  const [configurationValue, setConfigurationValue] = useState('');
  const [textAreaValue, setTextAreaValue] = useState('');
  const [idDevice, setIdDevice] = useState('');
  const [errors, setErrors] = useState({ name: false, configurationValue: false, idDevice: false });
  const [devices, setDevices] = useState([]); 
  const [selectedDevice, setSelectedDevice] = useState(null); 
  const [deviceChanged, setDeviceChanged] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (isOpen) {
        console.log('id-',id)
        const data = await Controller.getSpecifDeviceEmployee(id);
        console.log('result-',data)
        setDeviceName(data[0].device_name);
        setConfigurationValue(data[0].configuration);
        setTextAreaValue(JSON.stringify(data[0].configuration, null, 2));
        setIdDevice(data[0].device_list_id);
      }
    };
    fetchData();
  }, [isOpen, id]);

  useEffect(() => {
    const fetchDevices = async () => {
      const devices = await Controller.DevicesInfo();
      setDevices(devices); 
    };
    fetchDevices();
  }, []);

  const handleUpdate = async () => {
    let newErrors = { name: false, configurationValue: false, idDevice: false };
  
    if (!name) newErrors.name = true;
    if (!textAreaValue) newErrors.configurationValue = true;
    if (!idDevice) newErrors.idDevice = true;
  
    if (newErrors.name || newErrors.configurationValue || newErrors.idDevice) {
      setErrors(newErrors);
      return;
    }
  
    let parsedConfigurationValue;
    try {
      parsedConfigurationValue = JSON.parse(textAreaValue);
    } catch (err) {
      console.error('Invalid JSON', err);
      newErrors.configurationValue = true;
      setErrors(newErrors);
      return;
    }
  
    const updatedData = await Controller.putData(id, parsedConfigurationValue, idDevice, name);
    
    setDeviceName(updatedData[0].device_name);
    setConfigurationValue(updatedData[0].configuration);
    setTextAreaValue(JSON.stringify(updatedData[0].configuration, null, 2));
    setIdDevice(updatedData[0].device_list_id);
  };

  return(
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Atualizar dados</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
        <FormControl isInvalid={errors.name}>
  <FormLabel>Nome</FormLabel>
  <Select 
    placeholder="Selecione o dispositivo" 
    value={name}
    onChange={(e) => {
      const device = devices.find(device => device._id === e.target.value);
      setSelectedDevice(device || null);
      setDeviceChanged(true);
      if (device) {
        setDeviceName(device.device);
      }
    }}
  >
    {devices.map((device, index) => (
      <option key={index} value={device._id}>
        {device.device}
      </option>
    ))}
  </Select>
  <FormErrorMessage>O campo nome é obrigatório</FormErrorMessage>
</FormControl>
<FormControl mt={4} isInvalid={errors.configurationValue || deviceChanged}>
  <FormLabel>Posição</FormLabel>
  <Textarea value={textAreaValue} onChange={e => {
    setTextAreaValue(e.target.value);
    setDeviceChanged(false); 
  }} />
  <FormErrorMessage>{deviceChanged ? 'Por favor, atualize este campo' : 'O campo posição é obrigatório'}</FormErrorMessage>
</FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Fechar
          </Button>
          <Button variant="ghost" onClick={handleUpdate}>Atualizar</Button>        
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PutModal;