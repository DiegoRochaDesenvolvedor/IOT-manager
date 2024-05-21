import React, { useState, useEffect } from 'react';
import { FormLabel, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, FormControl, FormErrorMessage } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import Controller from '../scripts/helpers/Controller';

interface PutModalProps {
  isOpen: boolean;
  onClose: () => void;
  id: string;
}

const PutModal: React.FC<PutModalProps> = ({ isOpen, onClose, id }) => {
  const [name, setName] = useState('');
  const [functionValue, setFunctionValue] = useState('');
  const [departament, setdepartament] = useState('');
  const [errors, setErrors] = useState({ name: false, functionValue: false, departament: false });

  useEffect(() => {
    const fetchData = async () => {
      if (isOpen) {
        const data = await Controller.getEmployeeById(id);
        setName(data.name);
        setFunctionValue(data.position);
        setdepartament(data.departament);
      }
    };
    fetchData();
  }, [isOpen, id]);

  const handleUpdate = async () => {
    let newErrors = { name: false, functionValue: false, departament: false };

    if (!name) newErrors.name = true;
    if (!functionValue) newErrors.functionValue = true;
    if (!departament) newErrors.departament = true;

    if (newErrors.name || newErrors.functionValue || newErrors.departament) {
      setErrors(newErrors);
      return;
    }

    const updatedData = await Controller.putData(id, name, functionValue, departament);
    setName(updatedData.name);
    setFunctionValue(updatedData.position);
    setdepartament(updatedData.departament);
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
            <Input value={name} onChange={e => setName(e.target.value)} />
            <FormErrorMessage>O campo nome é obrigatório</FormErrorMessage>
          </FormControl>
          <FormControl mt={4} isInvalid={errors.functionValue}>
            <FormLabel>Posição</FormLabel>
            <Input value={functionValue} onChange={e => setFunctionValue(e.target.value)} />
            <FormErrorMessage>O campo posição é obrigatório</FormErrorMessage>
          </FormControl>
          <FormControl mt={4} isInvalid={errors.departament}>
            <FormLabel>Departamento</FormLabel>
            <Input value={departament} onChange={e => setdepartament(e.target.value)} />
            <FormErrorMessage>O campo departamento é obrigatório</FormErrorMessage>
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