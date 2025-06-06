/* eslint-disable prettier/prettier */
import axios from 'axios';
import {API_URL} from '../../url';

// Obtenir tous les messages
export const getAllMessages = async () => {
  try {
    const result = await axios.get(`${API_URL}/api/message`);
    return result.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Créer un message
export const createMessage = async messageData => {
  try {
    const result = await axios.post(`${API_URL}/api/message`, messageData);
    return result.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
