import fetchClient from '../utils/axiosConfig';
import constants from '../utils/constants';



export const callAddClientApi = (data) => {
    
    return (_dispatch, _getState) => {
        return fetchClient.post(
            `${constants.API.CLIENT.ADD}`,
            data

        );

    };
};


export const callClientListApi = (_page = 1, _limit = 10, _search = '') => {
    return (_dispatch, _getState) => {
        return fetchClient.get(
            `${constants.API.CLIENT.LIST}`, {
            params: {
                page: _page,
                limit: _limit,
                search: _search,
            },
        }
        );

    };
};



export const callUploadFile = (data) => {
    return (_dispatch, _getState) => {
      return fetchClient.post(
        `${constants.API.COMMON.UPLOAD}`, data
        
      )
    };
  };

 