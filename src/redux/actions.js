import baseURL from "../config/baseUrl";
import {notifyError, notifySuccess} from '../utils/notifications'

//ACTIONS
export const LOGIN = 'LOGIN';
export const GET_ALL_USERS = 'GET_ALL_USERS';
export const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';

export const logIn =  (email, password, navigate) =>{
      return async dispatch => {
            await baseURL.post('user/login',{
                  email,
                  password,
                  isAdmin : true
            })
            .then(res => {
                  dispatch( {type: LOGIN, payload : res.data} );
                  navigate('/home');
            })
            .catch(res => notifyError(res.response.data.error))
      }
};

export const getAllUsers = (token)=>{
      return async dispatch =>{
            const result = await baseURL.get('admin/users',{
                  headers:{
                        token
                  }
            });
            dispatch( {type : GET_ALL_USERS, payload : result.data} )
      }
};

export const getAllProducts = (token)=>{
      return async dispatch =>{
            await baseURL.get('/product',{
                  headers:{
                        token
                  }
            })
            .then(res => {
                  dispatch( {type: GET_ALL_PRODUCTS, payload: res.data} )
            })
            .catch(res => notifyError(res.response.data.error))
      }
}


export const getAllTransactions = ()=>{
      return dispatch =>{
      }
};