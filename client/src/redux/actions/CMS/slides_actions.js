import axios from 'axios';
import {
    LIST_SLIDES,
    ADD_SLIDE,
    CLEAR_SLIDE,
    REMOVE_ITEM_SLIDE,
    REMOVE_IMAGE_SLIDE,
    GET_DETAIL_SLIDE,
    UPDATE_DETAIL_SLIDE,
    UPLOAD_IMAGE_SLIDE,
    SET_VISIBLE_SLIDE

} from '../types';

import { SLIDE_SERVER } from '../../../components/utils/misc';

export function act_listSlides(language, args = null) {

    let listOfArgs = '';

    if (args) {

        for (const [key, value] of Object.entries(args)) {

            listOfArgs += '&';
            if (value) {
                listOfArgs += key + '=' + value;
            }
        }

    }

    const request = axios.get(`${SLIDE_SERVER}/list_entities?language=${language}${listOfArgs}`)
        .then(response => response.data)

    return {
        type: LIST_SLIDES,
        payload: request
    }
}

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

export function act_addSlide(language, args, dataToSubmit = null) {

    let listOfArgs = '';

    for (const [key, value] of Object.entries(args)) {

        listOfArgs += '&';
        if (value) {
            listOfArgs += key + '=' + value;
        }
    }

    const request = axios.post(`${SLIDE_SERVER}/add_entity?language=${language}${listOfArgs}`, dataToSubmit)
        .then(response => response.data);

    return {
        type: ADD_SLIDE,
        payload: request
    }
}

export function act_removeItem_Slide(id) {

    const request = axios.get(`${SLIDE_SERVER}/remove_entity?_id=${id}`)
        .then(response => {
            return response.data;
        })

    return {
        type: REMOVE_ITEM_SLIDE,
        payload: request
    }
}


export function act_removeImage_Slide(image_id, parent_id) {

    const request = axios.get(`${SLIDE_SERVER}/removeimage?image_id=${image_id}&parent_id=${parent_id}`)
        .then(response => {
            return response.data;
        })

    return {
        type: REMOVE_IMAGE_SLIDE,
        payload: request
    }
}

export function act_uploadImage_Slide(formData, axiosheaders, parent_id) {

    const request = axios.post(`${SLIDE_SERVER}/uploadimage?parent_id=${parent_id}`, formData, axiosheaders)
        .then(response => {

            return response.data;
        })

    return {
        type: UPLOAD_IMAGE_SLIDE,
        payload: request
    }
}

// export function act_getDetail_Slide(id) {

//     const request = axios.get(`/${SLIDE_SERVER}/articles_by_id?_id=${id}&type=single`)
//     .then(response=>{

//         return response.data[0]
//     });

//     return {
//         type: GET_DETAIL_SLIDE,
//         payload: request
//     }
// }

export function act_getDetail_by_Id_Slide(id) {

    const request = axios.get(`${SLIDE_SERVER}/get_entity_by_id?_id=${id}`)
        .then(response => {

            return response.data

        })

    return {
        type: GET_DETAIL_SLIDE,
        payload: request
    }
}

export function act_getDetail_by_Args_Slide(language, args) {

    let listOfArgs = '';

    for (const [key, value] of Object.entries(args)) {

        listOfArgs += '&';
        if (value) {
            listOfArgs += key + '=' + value;
        }
    }

    const request = axios.get(`${SLIDE_SERVER}/get_entity_by_args?language=${language}${listOfArgs}`)
        .then(response => {

            return response.data

        })

    return {
        type: GET_DETAIL_SLIDE,
        payload: request
    }
}


export function act_updateDetail_Slide(language, args, dataToSubmit = null) {

    let listOfArgs = '';

    for (const [key, value] of Object.entries(args)) {

        listOfArgs += '&';
        if (value) {
            listOfArgs += key + '=' + value;
        }
    }

    const request = axios.post(`${SLIDE_SERVER}/update_entity?language=${language}${listOfArgs}`, dataToSubmit)
        .then(response => {

            return response.data.doc});

    return {
        type: UPDATE_DETAIL_SLIDE,
        payload: request
    }
}

export function act_setVisible_Slide(language, args=null, id, checked) {

    let listOfArgs = '';

    for (const [key, value] of Object.entries(args)) {

        listOfArgs += '&';
        if (value) {
            listOfArgs += key + '=' + value;
        }
    }

    const request = axios.post(`${SLIDE_SERVER}/set_visible?language=${language}${listOfArgs}`)
        .then(response => {
            
            return response.data });

    return {
        type: SET_VISIBLE_SLIDE,
        payload: request
    }
}

