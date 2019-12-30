import axios from 'axios';
import {
    GET_SLIDES_BY_ARRIVAL,
    ADD_SLIDE,
    CLEAR_SLIDE

} from './types';

import { SLIDE_SERVER } from '../../components/utils/misc';

export function act_addSlide(dataToSubmit) {

    const request = axios.post(`/${SLIDE_SERVER}/article`, dataToSubmit)
        .then(response => response.data);

    return {
        type: ADD_SLIDE,
        payload: request
    }
}

/// Create ONE CLEAR FOR EVERY DISPATCH !!!

export function act_clearSlide(currentType) {
    switch (currentType) {
        case 'slides':
            return {
                type: CLEAR_SLIDE,
                payload: ''
            }
        default:
            return '';
    }


}

// export function act_getSlidesByArrival(skip, limit, filters = [], previousState = []) {
//     const data = {
//         limit,
//         skip,
//         filters
//     }

//     const request = axios.post(`${SLIDE_SERVER}/article`, data)
//         .then(response => {
//             let newState = [
//                 ...previousState,
//                 ...response.data.articles
//             ];
//             return {
//                 size: response.data.size,
//                 articles: newState
//             }
//         });
//     return {
//         type: GET_SLIDES_BY_ARRIVAL,
//         payload: request
//     }
// }

export function act_getSlidesByArrival() {
    const request = axios.get(`${SLIDE_SERVER}/articles?sortBy=createdAdd&order=desc&limit=4`)
        .then(response => response.data);
    return {
        type: GET_SLIDES_BY_ARRIVAL,
        payload: request
    }
}
