const initialState = { 
}

export const usuarioLogadoReducer = (state = initialState, action) => { 
    switch (action.type) {
        case true:
            return {
                ...state,
                usuarioLogado: action.usuarioLogado
            };
        default:
            return state;
    }
}