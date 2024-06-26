import axios from 'axios';
import moment from 'moment';
export default class Controller {
    static async putData(id:string, configuration: string, device_list_id: string, device_name: string) {
      const parameters = {
        configuration,
        device_list_id,
        device_name,
      }
    try {
      const response = await axios.put(`http://localhost:4000/api/device/${id}`, parameters);
      window.location.reload();
      return response.data;

    } catch (error) {
        console.error('Erro na requisição:', error);
      }
    }
    static async deleteData(id:string){

        try {
          const response = await axios.delete(`http://localhost:4000/api/device/${id}`);
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

        return response.data;
      } catch (error) {
        console.error(error);
      }
    };
    static async getSpecifDeviceEmployee(id:string) {
      try {
        const response = await axios.get(`http://localhost:4000/api/deviceId/${id}`);
        if (response.status !== 200) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.data;
      } catch (error) {
        console.error(error);
      }
    }
    static async getAllDevicesEmployee(id:string) {
      try {
        const response = await axios.get(`http://localhost:4000/api/devices/${id}`);
        if (response.status !== 200) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.data;
      } catch (error) {
        console.error(error);
      }
    }
    static async addDevice( user_id: string, configuration: string, device_list_id: string,device_name: string) {
      
      const parameters = {
        user_id,
        configuration,
        device_list_id,
        device_name
      }

      try {
        const response = await axios.post(`http://localhost:4000/api/device`, parameters);
        window.location.reload();
    
        if (response.status !== 200) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        return response.data;
      } catch (error) {
        console.error('Erro na requisição:', error);
      }
    }
    static async validateSession(user:string , password:string) {
        const response = await axios.get(`http://localhost:4000/api/session/${user}/${password}`);
        if(response.data){
          return true
        }else{
          return false
        }
    }
  }