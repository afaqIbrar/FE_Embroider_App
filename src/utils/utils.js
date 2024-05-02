import { toast } from 'react-toastify';
import { createContext } from 'react';

export const user = null;

export const SharedContext = createContext(null);

export function toaster(type, msg) {
  toast[type](msg);
}

export const setUserToken = (token) => {
  localStorage.setItem('token', token);
};

export const getUserToken = () => {
  return localStorage.getItem('token');
};

export const setUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const getUser = () => {
  let user = localStorage.getItem('user');
  if (user && user !== 'undefined') {
    return JSON.parse(user);
  } else {
    return null;
  }
  // return user && JSON.parse(user);
};

export const removeUserToken = () => {
  localStorage.removeItem('token');
};

export const removeUser = () => {
  localStorage.removeItem('user');
};

export const removeAuth = () => {
  removeUserToken();
  removeUser();
};
