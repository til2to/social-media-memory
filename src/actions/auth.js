import * as actions from '../constants/actionTypes';
import * as api from '../api';

export const signin = (formData, navigate) => async (dispatch) => {
  try {
    // signin user
    const { data: { result, token } }  = await api.signIn(formData)
    // const token = data.token
    // const result = data.data
    dispatch({ type: actions.AUTH, payload: { token, result } })
    navigate('/')
  } catch (error) {
    console.log(error)
  }
} 

export const signup = (formData, navigate) => async (dispatch) => {
  try {
    // signup user
    const { data: { result, token } } = await api.signUp(formData)
    dispatch({ type: actions.AUTH, payload: { token, result } })
    navigate('/')
  } catch (error) {
    console.log(error)
    const message = error.response?.data?.message || 'Something went wrong'
  }
}