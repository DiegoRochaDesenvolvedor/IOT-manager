import React from 'react';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react";
import Controller from '../scripts/helpers/Controller';

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  id: string;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, onClose, id }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Confirmação de exclusão</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Você tem certeza que deseja excluir este item?
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="ghost" onClick={() => Controller.deleteData(id)}>Excluir</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteModal;