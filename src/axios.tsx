import axios from 'axios';

const firebase = axios.create({
  baseURL: 'https://hamburger-b5d1d-default-rtdb.firebaseio.com/',
});

export default firebase;