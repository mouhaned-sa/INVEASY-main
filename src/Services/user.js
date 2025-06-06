/* eslint-disable prettier/prettier */
import axios from 'axios';
import {API_URL} from '../../url';

// Change en fonction de ton environnement

export const register = async user => {
  try {
    const result = await axios.post(`${API_URL}/api/auth/signup`, user);
    return result.data;
  } catch (error) {
    console.log(error);
    console.log(`${API_URL}/api/auth/register`);
  }
};

export const login = async user => {
  try {
    const result = await axios.post(`${API_URL}/api/auth/signin`, user);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const getCurrentUser = async () => {
  try {
    const result = await axios.get(`${API_URL}/api/user/current`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllUsers = async () => {
  try {
    const result = await axios.get(`${API_URL}/api/user/`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const getUserByID = async id => {
  try {
    const result = await axios.get(`${API_URL}/api/user/${id}`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async id => {
  try {
    const result = await axios.delete(`${API_URL}/api/user/${id}`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (id, user) => {
  try {
    const result = await axios.put(`${API_URL}/api/user/${id}`, user);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const followUser = async (id, userId) => {
  try {
    const result = await axios.put(`${API_URL}/api/user/follow/${id}`, {
      userId,
    });
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const unfollowUser = async (id, userId) => {
  try {
    const result = await axios.put(`${API_URL}/api/user/unfollow/${id}`, {
      userId,
    });
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const addCloseFriend = async (id, userId) => {
  try {
    const result = await axios.put(`${API_URL}/api/user/addCloseFriend/${id}`, {
      userId,
    });
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const removeCloseFriend = async (id, userId) => {
  try {
    const result = await axios.put(
      `${API_URL}/api/user/removeCloseFriend/${id}`,
      {userId},
    );
    return result.data;
  } catch (error) {
    console.log(error);
  }
};
