import axios from 'axios';
import {
    GET_SLIDES,
    ADD_SLIDE,
    CLEAR_SLIDE,
    REMOVE_SLIDE_ITEM,
    REMOVE_SLIDE_IMAGE,
    GET_SLIDE_DETAIL,
    UPDATE_SLIDE_DETAIL,
    UPLOAD_SLIDE_IMAGE

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

export function act_getData_Slides(args) {

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

    const request = axios.get(`/${SLIDE_SERVER}/remove_slide?_id=${id}`)
        .then(response => {
            return response.data;
        })

    return {
        type: REMOVE_SLIDE_ITEM,
        payload: request
    }
}

export function act_removeSlideImage(image_id, entity_id) {

    const request = axios.get(`/${SLIDE_SERVER}/removeimage?_id=${image_id}&entity_id=${entity_id}`)
        .then(response => {
            return response.data;
        })

    return {
        type: REMOVE_SLIDE_IMAGE,
        payload: request
    }
}

export function act_uploadSlideImage(formData, axiosconfig, entity_id) {

    const request = axios.post(`/${SLIDE_SERVER}/uploadimage?entity_id=${entity_id}`, formData, axiosconfig)
        .then(response => {
            return response.data;
        })

    return {
        type: UPLOAD_SLIDE_IMAGE,
        payload: request
    }
}

export function act_getDetail_Slide(id) {
    const request = axios.get(`/${SLIDE_SERVER}/articles_by_id?_id=${id}&type=single`)
    .then(response=>{
        return response.data[0]
    });

    return {
        type: GET_SLIDE_DETAIL,
        payload: request
    }
}

export function act_updateDetail_Slide(dataToSubmit){
    const request = axios.post(`/${SLIDE_SERVER}/slide_data`, dataToSubmit)
    .then(response => response.data);

    return {
        type: UPDATE_SLIDE_DETAIL,
        payload: request
    }
}