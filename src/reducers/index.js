import { combineReducers } from "redux";
import authReducer from "./authReducer";
import usuarioReducer from "./usuarioReducer";
import roleReducer from "./roleReducer";

import actividadReducer from "./actividadReducer";
import nivelReducer from "./nivelReducer";
import zonaReducer from "./zonaReducer";
import obraReducer from "./obraReducer";
import unidadReducer from "./unidadReducer";
import personalReducer from "./personalReducer";


export default combineReducers({
    auth: authReducer,
    usuarios: usuarioReducer,
    roles: roleReducer,

    actividades: actividadReducer,
    niveles: nivelReducer,
    zonas: zonaReducer,
    obras: obraReducer,
    unidades: unidadReducer,
    personal: personalReducer,
})