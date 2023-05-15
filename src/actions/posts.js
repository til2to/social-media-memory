import * as actions from '../constants/actionTypes';
import * as api from '../api';

// Action creators

// get posts
export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: actions.START_LOADING }) // check when data is loading
    const { data } = await api.fetchPosts(page)
    dispatch({ type: actions.FETCH_ALL, payload: data });
    dispatch({ type: actions.END_LOADING }) // check when data loading has ended
  } catch (error) {
    console.log(error)
  }
}
// get posts/post by searching
export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: actions.START_LOADING }) // check when data is loading
    const { data: { data } } = await api.fetchPostsBySearch(searchQuery);
    dispatch({ type: actions.FETCH_BY_SEARCH, payload: data })
    dispatch({ type: actions.END_LOADING }) // check when data loading has ended
  } catch (error) {
    console.log(error);
  }
}
// create new post
export const createPost = (post, navigate) => async (dispatch) => {
  try {
    dispatch({ type: actions.START_LOADING })
    const { data } = await api.createPost(post)
    dispatch({ type: actions.CREATE, payload: data })
    navigate(`/posts/${data._id}`)
  } catch (error) {
    console.log(error)
  }
}
// get post
export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: actions.START_LOADING }) // check when data is loading
    const { data } = await api.fetchPost(id)
    dispatch({ type: actions.FETCH_POST, payload: data });
    dispatch({ type: actions.END_LOADING }) // check when data loading has ended
  } catch (error) {
    console.log(error)
  }
}
// update post
export const updatePost = (id, updatedPost) => async (dispatch)=> {
  try {
    // hit the endpoint, get the response/data from the server, send it as payload
    const { data: { post } } = await api.updatePost(id, updatedPost);
    dispatch({ type: actions.UPDATE, payload: post })
  } catch (error) {
    console.log(error)
  }
}
// delete a post
export const deletePost = (id) => async (dispatch) => {
  try {
    await api.removePost(id)
    dispatch({ type: actions.DELETE, payload: id })
  } catch (error) {
    console.log(error)
  }
}
// like or dislike
export const updateLikes = (id) => async (dispatch) => {
  try {
    const { data } = await api.updatePostLikes(id);
    dispatch({ type: actions.UPDATE_POST_LIKES, payload: data })
  } catch (error) {
    console.log(error)
  }
}
