import { types } from '../types'


const initialState = {
    isAuthenticated: false,
    user: null,
    isLoading: false,
    isError: false,
    token: null,
}



export default (state = initialState, action) => {
    switch(action.type) {
        default:
            return state
    }
    
};

