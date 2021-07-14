export const login = (state = [], action) => {

    switch (action.type) {
        case 'FETCH_LOGIN':   
            state = {
                ...state,
                token: action.payload,
                email: action.email
            }
            return state;
        case 'CLEAR_ALL':
             return [];
        default:
            return state;
    }    
};

