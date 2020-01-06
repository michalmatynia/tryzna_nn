import axios from 'axios';
import {
    GET_DESCRIPTION_DETAIL,
    UPDATE_DESCRIPTION_DETAIL

} from './types';

import { DESC_SERVER } from '../../components/utils/misc';


export function act_getDetail_Desc(lg) {

    const request = axios.get(`${DESC_SERVER}/get_entity?lg=${lg}`)
    .then(response=>{
        return response.data
    });

    return {
        type: GET_DESCRIPTION_DETAIL,
        payload: request
    }
}


export function act_updateDetail_Desc(dataToSubmit){

    const request = axios.post(`${DESC_SERVER}/update_entity`, dataToSubmit )
    .then(response => response.data);

    return {
        type: UPDATE_DESCRIPTION_DETAIL,
        payload: request
    }
}
