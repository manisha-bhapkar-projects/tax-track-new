import fetchClient from '../utils/axiosConfig';
import constants from '../utils/constants';



export const calLJobCompleteAPI = () => {
    
    return (_dispatch, _getState) => {
        return fetchClient.get(
            `${constants.API.JOBCOMPLETE.GET}`,
         

        );

    };
};




