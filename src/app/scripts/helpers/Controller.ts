import axios from 'axios';
import moment from 'moment';
export default class Controller {
    static async putData(id: string, name: string, position: string, departament: string) {

    try {
      const response = await axios.put(`http://localhost:4000/api/employee/${id}`, {
        name,
        position,
        departament
      });
      window.location.reload();
      return response.data;

    } catch (error) {
        console.error('Erro na requisição:', error);
      }
    }
    static async deleteData(id:string){
        try {
          const response = await axios.delete(`http://localhost:4000/api/employee/${id}`);
          window.location.reload();
          return response.data;
        } catch (error) {
          console.error(error);
        }
    };
    static async DevicesInfo(){
      try {
        const response = await axios.get(`http://localhost:4000/api/devicesInfo/`);
        if (response.status !== 200) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log('response-->',response.data)
        return response.data;
      } catch (error) {
        console.error(error);
      }
    };
    static async getAllDevicesEmployee(id:string) {
      try {
        const response = await axios.get(`http://localhost:4000/api/devices/${id}`);
        if (response.status !== 200) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log('response-->',response.data)
        return response.data;
      } catch (error) {
        console.error(error);
      }
    }
    static async createEmployee(device: string, configuration: string) {
      try {
        const response = await axios.post(`http://localhost:4000/api/device`, {
          device,
          configuration
        });
    
        if (response.status !== 200) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        return response.data;
      } catch (error) {
        console.error('Erro na requisição:', error);
      }
    }
  }