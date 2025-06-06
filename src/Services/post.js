/* eslint-disable prettier/prettier */
import axios from 'axios';
import {API_URL} from '../../url';

// Change selon ton environnement

export const getAllPosts = async () => {
  try {
    const result = await axios.get(`${API_URL}/api/post`);
    return result.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const createPost = async post => {
  try {
    // eslint-disable-next-line prettier/prettier
    const result = await axios.post(`${API_URL}/api/post`, post);
    return result.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getPost = async id => {
  try {
    // eslint-disable-next-line prettier/prettier
    const result = await axios.get(`${API_URL}/api/post/${id}`);
    return result.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const deletePost = async id => {
  try {
    const result = await axios.delete(`${API_URL}/api/post${id}`);
    return result.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const updatePost = async (id, post) => {
  try {
    const result = await axios.put(`${API_URL}/api/post${id}`, post);
    return result.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
export const changePostImage = async (postId, image) => {
  try {
    const result = await axios.put(`${API_URL}/api/post/${postId}/picture`, {
      image,
    });
    return result.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
export const uploadImage = async imageFile => {
  try {
    const formData = new FormData();
    formData.append('image', {
      uri: imageFile.uri,
      type: imageFile.type,
      name: imageFile.fileName || 'image.jpg',
    });

    const response = await axios.post(`${API_URL}/image/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(response.data.image);
    // Retourne l'objet image avec _id et url
    return response.data.newImage;
  } catch (error) {
    throw error.response?.data || error;
  }
};
