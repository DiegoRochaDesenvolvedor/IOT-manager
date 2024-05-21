import React, { useState } from 'react';
import {
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
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import Controller from '../scripts/helpers/Controller';

const CreateModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [departament, setDepartament] = useState("");
  const [admission, setAdmission] = useState("");
  const [errors, setErrors] = useState({ name: false, position: false, departament: false, admission: false });

  const handleSubmit = () => {
    let newErrors = { name: false, position: false, departament: false, admission: false };

    if (!name) newErrors.name = true;
    if (!position) newErrors.position = true;
    if (!departament) newErrors.departament = true;
    if (!admission) newErrors.admission = true;

    if (newErrors.name || newErrors.position || newErrors.departament || newErrors.admission) {
      setErrors(newErrors);
      return;
    }

    Controller.createEmployee(name, position, departament, admission);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Criar novo funcionário</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isInvalid={errors.name}>
            <FormLabel>Nome</FormLabel>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
            <FormErrorMessage>O campo nome é obrigatório</FormErrorMessage>
          </FormControl>
          <FormControl mt={4} isInvalid={errors.position}>
            <FormLabel>Posição</FormLabel>
            <Input value={position} onChange={(e) => setPosition(e.target.value)} />
            <FormErrorMessage>O campo posição é obrigatório</FormErrorMessage>
          </FormControl>
          <FormControl mt={4} isInvalid={errors.departament}>
            <FormLabel>Departamento</FormLabel>
            <Input value={departament} onChange={(e) => setDepartament(e.target.value)} />
            <FormErrorMessage>O campo departamento é obrigatório</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.admission}>
            <FormLabel>Admissão</FormLabel>
            <Input type="date" onChange={(e) => setAdmission(e.target.value)} />
            <FormErrorMessage>O campo admissão é obrigatório</FormErrorMessage>
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