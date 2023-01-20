import { types } from '../types';


const initialState = {
    socket: null,
    online: false
  };


export default (state = initialState, action) => {
    switch (action.type) {
        case types.CONNECT_SOCKET:
        return {
            ...state,
            socket: action.payload.socket,
            online: action.payload.online

        };
        default:
        return state;
    }
};
