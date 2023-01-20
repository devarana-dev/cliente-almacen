import { types } from '../types';


export const connectSocket = (payload) => {
    return {
      type: types.CONNECT_SOCKET,
      payload
    }
}