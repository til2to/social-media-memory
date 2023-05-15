import * as actions from '../constants/actionTypes';

const postReducer = (state = { isLoading: true, posts: [] }, action) => {
  switch(action.type){
    case actions.START_LOADING:
      return { ...state, isLoading: true }
    case actions.END_LOADING:
      return { ...state, isLoading: false }
    case actions.FETCH_POST:
      return { ...state, post: action.payload };
    case actions.FETCH_ALL:
      // To update/create multiple data, return the state as object
      return { // keep the state and create new properties
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        totalPages: action.payload.totalPages
      }
    case actions.FETCH_BY_SEARCH:
      // keep the state and update the posts property
      return { ...state, posts: action.payload };
    case actions.CREATE:
      // create a new array and keep the existing elements and add new payload(post)
      return {...state, posts: [...state.posts, action.payload]};
    case actions.DELETE:
      // filter all posts except the post with an id same as the payload 
      return {...state, posts: state.posts.filter((post) => post._id !== action.payload)}
    case actions.UPDATE:
      // find the post, if found, replace that post with the new post payload
      return {...state, posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post)};
    case actions.UPDATE_POST_LIKES:
      return {...state, posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post)};
    default:
      return state
  }
}

export default postReducer