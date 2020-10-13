import jwt from "jwt-decode"; // import dependency
import constants from "../constants";

export const getUserDetails = () => {
  const token = getAuthToken();
  const user = !token ? {} : jwt(getAuthToken()); // decode your token here
  return user;
};

export const storeAuthToken = (_token) => {
  if (_token) {
    localStorage.setItem(constants.STORAGE.AUTH.TOKEN, _token);
  } else {
    localStorage.removeItem(constants.STORAGE.AUTH.TOKEN);
  }
};

export const getAuthToken = () => {
  return localStorage.getItem(constants.STORAGE.AUTH.TOKEN);
};

export const storeAdminData = (_data) => {
  if (_data) {
    localStorage.setItem(
      constants.STORAGE.AUTH.ADMIN_DATA,
      JSON.stringify(_data)
    );
  } else {
    localStorage.removeItem(constants.STORAGE.AUTH.ADMIN_DATA);
  }
};
