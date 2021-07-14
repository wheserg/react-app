import { combineReducers } from 'redux';
import {userData} from './userReducer'
import {login} from './sessionReducer'

export default combineReducers({
    login,
    userData,
 });
 