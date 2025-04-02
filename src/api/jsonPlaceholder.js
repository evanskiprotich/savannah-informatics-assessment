import axios from 'axios';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const fetchUserById = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user ${userId}:`, error);
    throw error;
  }
};

export const fetchAlbums = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/albums`);
    return response.data;
  } catch (error) {
    console.error('Error fetching albums:', error);
    throw error;
  }
};

export const fetchUserAlbums = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/albums?userId=${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching albums for user ${userId}:`, error);
    throw error;
  }
};

export const fetchAlbumById = async (albumId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/albums/${albumId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching album ${albumId}:`, error);
    throw error;
  }
};

export const fetchAlbumPhotos = async (albumId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/photos?albumId=${albumId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching photos for album ${albumId}:`, error);
    throw error;
  }
};

export const fetchPhotoById = async (photoId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/photos/${photoId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching photo ${photoId}:`, error);
    throw error;
  }
};

export const updatePhotoTitle = async (photoId, newTitle) => {
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/photos/${photoId}`,
      { title: newTitle }
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating photo ${photoId}:`, error);
    throw error;
  }
};