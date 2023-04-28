import * as actions from '../constants/actionTypes';
import * as api from '../api';

// Action creators
export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts()
    dispatch({ type: actions.FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error)
  }
}

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post)
    dispatch({ type: actions.CREATE, payload: data })
  } catch (error) {
    console.log(error)
  }
}

export const updatePost = (id, updatedPost) => async (dispatch)=> {
  try {
    // hit the endpoint, get the response/data from the server, send it as 
    // payload to the reducer which will update the state based on the action
    const { data: { post } } = await api.updatePost(id, updatedPost);
    dispatch({ type: actions.UPDATE, payload: post })
  } catch (error) {
    console.log(error)
  }
}

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.removePost(id)
    dispatch({ type: actions.DELETE, payload: id })
  } catch (error) {
    console.log(error)
  }
}

export const updateLikes = (id) => async (dispatch) => {
  try {
    const { data } = await api.updatePostLikes(id);
    dispatch({ type: actions.UPDATE_POST_LIKES, payload: data })
  } catch (error) {
    console.log(error)
  }
}