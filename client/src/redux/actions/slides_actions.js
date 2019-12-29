import axios from 'axios';
import {
    GET_SLIDES_TO_BANNER,
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

export function getSlidesToBanner(skip, limit, filters = [], previousState = []) {
    const data = {
        limit,
        skip,
        filters
    }

    const request = axios.post(`${SLIDE_SERVER}/banner`, data)
        .then(response => {
            let newState = [
                ...previousState,
                ...response.data.items
            ];
            return {
                size: response.data.size,
                items: newState
            }
        });
    return {
        type: GET_SLIDES_TO_BANNER,
        payload: request
    }
}
