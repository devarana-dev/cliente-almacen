import { combineReducers } from "redux";
import authReducer from "./authReducer";
import usuarioReducer from "./usuarioReducer";
import roleReducer from "./roleReducer";

import actividadReducer from "./actividadReducer";
import nivelReducer from "./nivelReducer";
import zonaReducer from "./zonaReducer";
import obraReducer from "./obraReducer";
import personalReducer from "./personalReducer";
import insumoReducer from "./insumoReducer";
import valesReducer from "./valesReducer";
import permisosReducer from "./permisosReducer";
import notificacionReducer from "./notificacionReducer";
import prestamoReducer from "./prestamoReducer";
import reportesReducer from "./reportesReducer";
import bitacoraReducer from "./bitacoraReducer";
import etapaReducer from "./etapaReducer";
import empresaReducer from "./empresaReducer";


export default combineReducers({
    auth: authReducer,
    usuarios: usuarioReducer,
    roles: roleReducer,
    actividades: actividadReducer,
    niveles: nivelReducer,
    zonas: zonaReducer,
    obras: obraReducer,
    personal: personalReducer,
    insumos: insumoReducer,
    vales: valesReducer,
    permisos: permisosReducer,
    notificaciones: notificacionReducer,
    prestamos: prestamoReducer,
    reportes: reportesReducer,
    bitacoras: bitacoraReducer,
    etapas: etapaReducer,
    empresas: empresaReducer,
})