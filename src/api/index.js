import axios from "axios";
import CryptoJS from 'crypto-js';

const API = axios.create({ baseURL: 'http://localhost:5000' })

const encryptedPayload = localStorage.getItem('profile');
let payloadObject = null;

// Decrypt user info from local storage with key
const userInfo = process.env.REACT_APP_ENCODE_DECODE_OAUTH;

if (encryptedPayload) {
  const bytes = CryptoJS.AES.decrypt(encryptedPayload, userInfo);
  if (bytes.toString().length > 0) {
    const decryptedPayload = bytes.toString(CryptoJS.enc.Utf8);
    payloadObject = JSON.parse(decryptedPayload);
  } else {
    console.error('Failed to decrypt payload');
  }
}

API.interceptors.request.use((req) => {
  if (payloadObject && payloadObject.token) {
    req.headers.Authorization = `Bearer ${payloadObject.token}`;
  }
  return req;
});

// posts endpoints

export const fetchPost = (id) => API.get(`/posts/${id}`)
// export const fetchPosts = () => API.get('/posts');
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost)
export const removePost = (id) => API.delete(`/posts/${id}`) 
export const updatePostLikes = (id) => API.patch(`/posts/${id}/likePost`);

// auths endpoints
export const signIn = (formData) => API.post('/user/signin', formData)
export const signUp = (formData) => API.post('/user/signup', formData).catch(error => console.log(error));