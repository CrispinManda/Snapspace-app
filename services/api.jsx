import axios from 'axios';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

export const fetchUsers = () => api.get('/users');

export const fetchUserById = (id) => api.get(`/users/${id}`);

export const fetchAlbumsByUser = (userId) => api.get(`/albums?userId=${userId}`);

export const fetchPhotosByAlbum = (albumId) => api.get(`/photos?albumId=${albumId}`);

export const fetchPhotoById = (id) => api.get(`/photos/${id}`);

export const updatePhotoTitle = (id, title) => api.put(`/photos/${id}`, { title });

export default api;
