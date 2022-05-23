import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/bien/';


class BienDataService {



  getAll() {
    return axios.get(API_URL + 'list/', { headers: authHeader() });
  }

  getBiensLocation() {
    return axios.get(API_URL + 'location/', { headers: authHeader() });
  }

  getBiensVente() {
    return axios.get(API_URL + 'vente/', { headers: authHeader() });
  }

  get(id) {
    return axios.get(API_URL + `details/${id}`, { headers: authHeader() });
  }

  createBien(data){
    return axios.post(API_URL + 'ad/', data,  { headers: authHeader() });
}

  getCaution() {
    return axios.get(API_URL + `caution`, { headers: authHeader() });
  }

  deleteBien(id) {
    return axios.delete(API_URL + `delete/${id}`, { headers: authHeader() });
  }

  updateBien(id, data){
    return axios.put(API_URL + `update/${id}`, data, { headers: authHeader() }); 
  }

  getCategorie() {
    return axios.get(API_URL + `categorie`, { headers: authHeader() });
  }

  getBienLoues()
  {
    return axios.get(API_URL + 'loues/', { headers: authHeader() });
  }

  getBienRestitues()
  {
    return axios.get(API_URL + 'restitues/', { headers: authHeader() });
  }

}

export default new BienDataService();