import fetchClient from "../utils/axiosConfig";
import constants from "../utils/constants";

export const callLoginApi = (data, recaptcha) => {
  return (_dispatch, _getState) => {
    return fetchClient.post(`${constants.API.LOGIN.SIGNUP}`, data, {
      headers: {
        recaptcha,
      },
    });
  };
};

export const callLogOutApi = () => {
  return (_dispatch, _getState) => {
    return fetchClient.get(`${constants.API.LOGIN.LOGOUT}`);
  };
};
