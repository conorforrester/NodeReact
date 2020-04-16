import { combineReducers } from 'redux';
import authReducer from './authReducer';

export default combineReducers({
    //whatever keys we provide, represent the keys that exist inside of state object 
    auth: authReducer   //auth piece of state is being created by authReducer
});