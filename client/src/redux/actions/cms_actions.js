import axios from 'axios';
import {
    GET_SLIDES,
    ADD_SLIDES

} from './types';

import { SLIDER_SERVER } from '../../components/utils/misc';

export function clearSlide(id) {
    const request = axios.get(`/${PRODUCT_SERVER}/articles_by_id?id=${id}&type=single`)
    .then(response=>{
        return response.data[0]
    });

    return {
        type: GET_PRODUCT_DETAIL,
        payload: request
    }
}

// END OF MINE
