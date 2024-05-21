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
    static async createEmployee(name:string, position:string, departament:string, adimission:string){
      const adimissionDateOnly = adimission.split(' ')[0] + ' ' + adimission.split(' ')[1] + ' ' + adimission.split(' ')[2] + ' ' + adimission.split(' ')[3];
      const adimissionDate = new Date(adimissionDateOnly);    
      console.log('adimissionDATE--',adimissionDate)
        try {
          const response = await axios.post('http://localhost:4000/api/employee', {
            name,
            position,
            departament,
            adimission:adimissionDate
          });
          console.log(response.data);
          window.location.reload();
        } catch (error) {
          console.error(error);
        }
    };
    static async getEmployeeById(id:string) {
      try {
        const response = await axios.get(`http://localhost:4000/api/employees/${id}`);
        return response.data;
      } catch (error) {
        console.error(`Error occurred while fetching employee: ${error}`);
      }
    }
  }