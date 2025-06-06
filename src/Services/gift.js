/* eslint-disable prettier/prettier */
import axios from 'axios';
import {API_URL} from '../../url';

// Obtenir tous les cadeaux
export const getGifts = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/gifts`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.errors || error.message;
  }
};

// Créer une liste de cadeaux
export const createGift = async giftData => {
  try {
    const response = await axios.post(`${API_URL}/api/gifts`, giftData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.errors || error.message;
  }
};

// Mettre à jour une liste de cadeaux
export const updateGift = async (id, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/api/gifts${id}`, updatedData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.errors || error.message;
  }
};

// Supprimer une liste de cadeaux
export const deleteGift = async id => {
  try {
    const response = await axios.delete(`${API_URL}/api/gifts${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.errors || error.message;
  }
};
