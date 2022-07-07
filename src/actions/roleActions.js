import clientAxios from '../config/axios';
import { types } from '../types';

export function getAllRolesAction(){
    return async (dispatch) => {
        dispatch(getAllRolesRequest())
        await clientAxios.get('/roles')
            .then ( res => {
                dispatch(getAllRolesSuccess(res.data.roles))
            })
            .catch( err => {
                console.log('Error getAllRolesAction', err.response);
                dispatch(getAllRolesError(err.response.data.message))
            })
    }
}
const getAllRolesRequest = () => {
    return {
        type: types.GET_ALL_ROLE
    }
}
const getAllRolesSuccess = payload => {
    return {
        type: types.GET_ALL_ROLE_SUCCESS,
        payload
    }
}
const getAllRolesError = error => {
    return {
        type: types.GET_ALL_ROLE_ERROR,
        payload: error
    }
}


export function createRoleAction (role){
    return async (dispatch) => {
        dispatch(createRoleRequest())
        await clientAxios.post('/roles', role)
            .then ( res => {
                dispatch(createRoleSuccess(res.data.role))
            })
            .catch( err => {
                console.log('Error createRoleAction', err.response);
                dispatch(createRoleError(err.response.data.message))
            })
    }
}
const createRoleRequest = () => {
    return {
        type: types.CREATE_ROLE
    }
}
const createRoleSuccess = payload => {
    return {
        type: types.CREATE_ROLE_SUCCESS,
        payload
    }
}
const createRoleError = error => {
    return {
        type: types.CREATE_ROLE_ERROR,
        payload: error
    }
}


export function getRoleAction(id){
    return async (dispatch) => {
        dispatch(getRoleRequest())
        await clientAxios.get(`/roles/${id}`)
            .then ( res => {
                dispatch(getRoleSuccess(res.data.role))
            })
            .catch( err => {
                console.log('Error getRoleAction', err.response);
                dispatch(getRoleError(err.response.data.message))
            })
    }
}
const getRoleRequest = () => {
    return {
        type: types.GET_ROLE
    }
}
const getRoleSuccess = payload => {
    return {
        type: types.GET_ROLE_SUCCESS,
        payload
    }
}
const getRoleError = error => {
    return {
        type: types.GET_ROLE_ERROR,
        payload: error
    }
}


export function updateRoleAction(role){
    return async (dispatch) => {
        dispatch(updateRoleRequest())
        await clientAxios.put(`/roles/${role.id}`, role)
            .then ( res => {
                dispatch(updateRoleSuccess(res.data.role))
            })
            .catch( err => {
                console.log('Error updateRoleAction', err.response);
                dispatch(updateRoleError(err.response.data.message))
            })
    }
}
const updateRoleRequest = () => {
    return {
        type: types.UPDATE_ROLE
    }
}
const updateRoleSuccess = payload => {
    return {
        type: types.UPDATE_ROLE_SUCCESS,
        payload
    }
}
const updateRoleError = error => {
    return {
        type: types.UPDATE_ROLE_ERROR,
        payload: error
    }
}