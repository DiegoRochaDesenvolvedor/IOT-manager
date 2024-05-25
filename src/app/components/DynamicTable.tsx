import React, { useState, useEffect, useCallback } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, Button, Table, Thead, Tbody, Tr, Th, Td, Input } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react"
import PutModal from './PutModal'
import DeleteModal from './DeleteModal'
import CreateModal from '../components/CreateModal';
import Controller from '../scripts/helpers/Controller';

interface DynamicTableProps {
  color: string;
  id: string;
}

interface RowData {
  device_name(device_name: any): React.ReactNode;
  configuration(configuration: any): React.ReactNode;
  device(device: any): React.ReactNode;
  name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined;
  position: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined;
  departament: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined;
  _id?: any;
}

const DynamicTable: React.FC<DynamicTableProps> = ({ color, id }) => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [dataResolved, setDataResolved] = useState<RowData[]>([]);
  const [selectedId, setSelectedId] = useState(null);
  const { isOpen: isDeleteModalOpen, onOpen: onOpenDeleteModal, onClose: onCloseDeleteModal } = useDisclosure();
  const { isOpen: isCreateModalOpen, onOpen: onCreateModalOpen, onClose: onCloseCreateModal } = useDisclosure();
  const { isOpen: isPutModalOpen, onOpen: onOpenPutModal, onClose: onClosePutModal } = useDisclosure();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [putSelectedId, setPutSelectedId] = useState('');
  const [data, setData] = useState(null);
  const { isOpen: isDashboardModalOpen, onOpen: onOpenDashboardModal, onClose: onCloseDashboardModal } = useDisclosure();

  
  const putClickHandler = (id: string) => () => {
    setPutSelectedId(id);
    onOpenPutModal();
  };

  const fetchData = useCallback(async () => {
    try {
      const result = await Controller.getAllDevicesEmployee(id);
      setDataResolved(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [id]);
  
  useEffect(() => {
    fetchData();
  }, [fetchData]);
    
    const filteredData = dataResolved.filter((row: RowData) => {
    const name = row.device_name?.toString() ?? '';
    const position = row.position?.toString() ?? '';
    const departament = row.departament?.toString() ?? '';
    const searchTermLower = searchTerm.toLowerCase();
    return (
      name.toLowerCase().includes(searchTermLower) ||
      position.toLowerCase().includes(searchTermLower) ||
      departament.toLowerCase().includes(searchTermLower)
    );
  });

  const sortedData = filteredData.sort((a, b) => {
    if (sortDirection === 'asc') {
      return (a.name?.toString() ?? '').localeCompare(b.name?.toString() ?? '');
    } else {
      return (b.name?.toString() ?? '').localeCompare(a.name?.toString() ?? '');
    }
  });

  return (
    
      <div style={{ width: '80vw', margin: 'auto'}}>
      <ChakraProvider>
      <Input 
        placeholder="Pesquisar" 
        value={searchTerm} 
        onChange={e => setSearchTerm(e.target.value)}
        bg="white"
        color="black"
        borderColor="purple.500"
        focusBorderColor="purple.700"
        borderRadius="md"
        marginBottom="10px"
        marginLeft="10px"
        marginRight="10px"
        width="20%"
        size="sm"
        _hover={{ borderColor: "purple.700" }}
      />      

      <Button colorScheme="green" size="sm" marginLeft="10px" onClick={onCreateModalOpen}>Adicionar</Button>
      <Button float="right"marginRight="10px" size="sm" onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}>
        {sortDirection === 'asc' ? 'Z-A' : 'A-Z'}
      </Button> 
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th textAlign="center">Dispositivo</Th>
            <Th textAlign="center">Configuração</Th>
            <Th textAlign="center">Ações</Th>
          </Tr>
        </Thead>
        <Tbody>
          {sortedData && Array.isArray(sortedData) && sortedData.map((row: RowData, index: number) => (
            <Tr key={index}>
            <Td textAlign="center">{String(row.device_name)}</Td>
            <Td textAlign="center" color="green" style={{ whiteSpace: 'pre-wrap' }}>
              {JSON.stringify(row.configuration, null, 2)}
            </Td>            
            <Td textAlign="center">
              <Button colorScheme="purple" size="sm" onClick={putClickHandler(row._id.toString())}>Atualizar</Button>
              <Button colorScheme="gray" size="sm" marginLeft="10px" onClick={() => { setSelectedId(row._id.toString()); onOpenDeleteModal(); }}>Deletar</Button>
              <Button colorScheme="blue" size="sm" marginLeft="10px" onClick={onOpenDashboardModal}>Dashboard</Button>
              <PutModal 
                isOpen={isPutModalOpen} 
                onClose={onClosePutModal} 
                id={row._id.toString()} 
              />
              <DeleteModal 
                isOpen={isDeleteModalOpen} 
                onClose={onCloseDeleteModal} 
                id={String(selectedId)} 
              />
              <Modal isOpen={isDashboardModalOpen} onClose={onCloseDashboardModal}>
              <ModalOverlay bg="rgba(0, 0, 0, 0.5)" />
                <ModalContent>
                  <ModalHeader>Dashboard</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    Dashboard
                    Aqui constariam os dados vindos da api externa
                  </ModalBody>
                </ModalContent>
              </Modal>
            </Td>
          </Tr>
          ))}
        </Tbody>
      </Table>
      <CreateModal 
          isOpen={isCreateModalOpen}
          onClose={onCloseCreateModal} user_id={id}      />
    </ChakraProvider>
    </div>
  );
};

export default DynamicTable;