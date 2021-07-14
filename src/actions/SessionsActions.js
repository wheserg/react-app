import API from '../api/api'

export const postLogin = (data) => {

    return async dispatch => {
        const response = await API.put(`/TutenREST/rest/user/testapis%40tuten.cl?email=${data.email}`,null,{headers:data.headers});
        dispatch({
            type: 'FETCH_LOGIN',
            payload: response.data ? response.data.sessionTokenBck : [],
            email: data.email ? data.email : ''
        });
    }
}

export const signOut = () => {
  
    return {
        type: 'CLEAR_ALL',
    };
}

export const fetchData = (data) => {
 
    return async dispatch => { 
        const response = await API.get(`/TutenREST/rest/user/contacto%40tuten.cl/bookings?email=${data.email}&current=${data.current}`,{headers:data.headers});
        dispatch({
            type: 'FETCH_USUARIO',
            payload: response.data ? response.data : []
        });
    }
}

