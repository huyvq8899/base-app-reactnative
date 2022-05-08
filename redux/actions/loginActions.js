import { LOGIN_SUCESS, LOGIN_ERROR } from '../types';
import axios from 'axios';
import { API_URL } from '../../env';

//const API_URL = 'http:/192.168.2.126:45455/api/';

export const login = (userName, password) => {
  try {
    return (dispatch) => {
      axios
        .post(`${API_URL}auth/Login`, {
          username: userName,
          password: password,
        })
        .then(
          (res) => {
            return dispatch({
              type: LOGIN_SUCESS,
              payload: res.data,
            });
          },
          (error) => {
            console.log(error);

            return dispatch({
              type: LOGIN_ERROR,
              payload: error,
            });
          },
        );
    };
  } catch (e) {
    console.log(e);
  }
};
