import { usuarioLogadoReducer } from './usuarioLogadoReducer';
import { combineReducers } from 'redux';

export const Reducers = combineReducers({
    usuarioLogado: usuarioLogadoReducer,
});