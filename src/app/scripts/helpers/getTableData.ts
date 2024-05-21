import axios, { AxiosResponse } from 'axios';

interface Employee {
  _id: string;
  name: string;
  position: string;
  departament: string;
}
export default async function getAllEmployees() {
  try {
    const response: AxiosResponse<Employee[]> = await axios.get('http://localhost:4000/api/employees');
    if (response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.data;
  } catch (error) {
    console.error(error);
  }
}