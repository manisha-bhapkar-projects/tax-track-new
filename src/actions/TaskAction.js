import fetchClient from "../utils/axiosConfig";
import constants from "../utils/constants";

export const callTaskListAPI = (
  _page = 1,
  _limit = 10,
  _search = "",
  _job = ""
) => {
  return (_dispatch, _getState) => {
    return fetchClient.get(`${constants.API.TASK.LIST}`, {
      params: {
        page: _page,
        limit: _limit,
        search: _search,
        job: _job,
      },
    });
  };
};

export const calLTaskDetailAPI = (_id) => {
  return (_dispatch, _getState) => {
    return fetchClient.get(`${constants.API.TASK.DETAILS}${_id}`);
  };
};

export const calLTaskDetailsAPI = (_id) => {
  return (_dispatch, _getState) => {
    return fetchClient.get(`${constants.API.TASK.TASK_DETAIL}${_id}`);
  };
};

export const calLFileDetailAPI = () => {
  return (_dispatch, _getState) => {
    return fetchClient.get(`${constants.API.TASK.FILES}`, {});
  };
};

export const callTaskListDropDownAPI = () => {
  return (_dispatch, _getState) => {
    return fetchClient.get(`${constants.API.TASK.LIST}`);
  };
};

export const callTaskUpdateAPI = (request) => {
  return (_dispatch, _getState) => {
    return fetchClient.put(`${constants.API.TASK.UPDATE_TASK_STATUS}`, request);
  };
};

export const callUpdateAssignAPI = (request) => {
  return (_dispatch, _getState) => {
    return fetchClient.put(`${constants.API.TASK.UPDATE_ASSIGN}`, request);
  };
};
