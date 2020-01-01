import axios from 'axios';
import {
    GET_SLIDES,
    ADD_SLIDE,
    CLEAR_SLIDE,
    REMOVE_SLIDE_ITEM

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

export function act_getSlides(args) {

    let listOfArgs = '';
    let i = 0;
    // console.log(args);

    for (const [key, value] of Object.entries(args)) {
        i++;
        if (i === 1) { listOfArgs += '?'; } else { listOfArgs += '&'; }

        if (value) {
            listOfArgs += key + '=' + value;
        }
    }



    const request = axios.get(`/${SLIDE_SERVER}/articles${listOfArgs}`)
        .then(response => response.data);
    return {
        type: GET_SLIDES,
        payload: request
    }
}

export function act_removeSlideItem(id) {

    const request = axios.get(`${SLIDE_SERVER}/removeSlideItem?_id=${id}`)
        .then(response => {
            return response.data;
        })

    return {
        type: REMOVE_SLIDE_ITEM,
        payload: request
    }
}
