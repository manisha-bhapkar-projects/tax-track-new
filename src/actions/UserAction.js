import fetchClient from "../utils/axiosConfig";
import constants from "../utils/constants";
// import { SET_USER_LISTING } from "../type";

// export const UserListing = (list) => ({
//     type: SET_USER_LISTING,
//     list,
//   });

export const callUserListAPi = (_page = 1, _limit = 10, _search = "") => {
  return (_dispatch, _getState) => {
    return fetchClient.get(`${constants.API.USERS.LIST}`, {
      params: {
        page: _page,
        limit: _limit,
        search: _search,
      },
    });
  };
};

export const callDashboardAPI = () => {
  return (_dispatch, _getState) => {
    return fetchClient.get(`${constants.API.DASHBORD.GET}`);
  };
};

export const getDashboradDataApiAction = () => {
  return (dispatch) => {
    return fetchClient.get(constants.API.DASHBOARD.CARD_DATA);
  };
};

export const callContactUsListAPiAction = (_page = 1, _limit = 10, _search = "") => {
  return (_dispatch, _getState) => {
    return fetchClient.get(`${constants.API.CONTACT_US.LIST}`, {
      params: {
        page: _page,
        limit: _limit,
        search: _search,
      },
    });
  };
};
