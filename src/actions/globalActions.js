import clientAxios from '../config/axios';
import { types } from '../types';

export function cleanErrorAction(){
    return {
        type: types.CLEAN_ERROR_STATE
    }
}