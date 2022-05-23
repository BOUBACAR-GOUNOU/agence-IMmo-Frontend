import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/clients/';


class ClientDataService {

  
  // getAll(statutBien){
  //   return axios.get(API_URL + `list/${statutBien}`, { headers: authHeader() });
  // }

  getAll(){
    return axios.get(API_URL + 'list/', { headers: authHeader() });
  }
  getCompteClient(){
    return axios.get(API_URL + 'compte/', { headers: authHeader() });
  }

  get(id) {
    return axios.get(API_URL + `details/${id}`, { headers: authHeader() } );
  }

  create(data){
      return axios.post(API_URL + 'ad/', data,  { headers: authHeader() });
  }
  
}

export default new  ClientDataService();