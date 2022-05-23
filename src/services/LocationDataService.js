import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/location/';


class LocationDataService {

  
  getAll(){
    return axios.get(API_URL + 'list/', { headers: authHeader() });
  }

  getCompteLocation(){
    return axios.get(API_URL + 'compte/', { headers: authHeader() });
  }


  getCompteBienRestituer(){
    return axios.get(API_URL + 'compteBienRestituer/', { headers: authHeader() });
  }
  
  getBienLouesByClient(id) {
    return axios.get(API_URL + `biensLoues/${id}`, { headers: authHeader() } );
  }

  getBienRestituesByClient(id) {
    return axios.get(API_URL + `biensRestitues/${id}`, { headers: authHeader() } );
  }

  compteBiensLouesByClient(id) {
    return axios.get(API_URL + `compteBiensLouesByClient/${id}`, { headers: authHeader() } );
  }

  compteBiensRestituerByClient(id) {
    return axios.get(API_URL + `compteBienRestituerByClient/${id}`, { headers: authHeader() } );
  }

  restituesLocationBien(id, data){
    return axios.put(API_URL + `restituer/${id}`, data , { headers: authHeader() }); 
  }

}

export default new  LocationDataService();