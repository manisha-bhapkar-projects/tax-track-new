import fetchClient from '../utils/axiosConfig';
import constants from '../utils/constants';



export const callAddStaffApi = (data) => {
    
    return (_dispatch, _getState) => {
        return fetchClient.post(
            `${constants.API.STAFF.ADD}`,
            data

        );

    };
};

export const callStaffListApi = (_page = 1, _limit = 10, _search = '') => {
    return (_dispatch, _getState) => {
        return fetchClient.get(
            `${constants.API.STAFF.LIST}`, {
            params: {
                page: _page,
                limit: _limit,
                search: _search,
            },
        }
        );

    };
};


export const callStaffApi = () => {
    return (_dispatch, _getState) => {
        return fetchClient.get(
            `${constants.API.STAFF.LIST}`, 
        );

    };
};