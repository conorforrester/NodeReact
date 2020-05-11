import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import surveysReducer from './surveysReducer';

export default combineReducers({
    //whatever keys we provide, represent the keys that exist inside of state object 
    auth: authReducer,   //auth piece of state is being created by authReducer
    form: reduxForm,
    surveys: surveysReducer
});