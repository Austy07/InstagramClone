import axios from 'axios'
import {
    USER_REGISTER_SUCCESS,
    USER_REGISTER_REQUEST,
    USER_REGISTER_FAIL
} from '../constants/userConstants'
const baseurl = `/api/v1/users`


export const signupUser = (name, username, email, password, passwordConfirm) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        })

        const config ={
            headers:{
                'Content-Type' : 'application/json'
            },
        }

        const {data} = await axios.post(
            `${baseurl}/signup`,
            {name, username, email, password, passwordConfirm},
            config
        )

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data,
        })
        localStorage.setItem('userInfo', JSON.stringify(data))



    }  catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}
