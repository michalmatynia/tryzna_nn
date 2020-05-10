import axios from 'axios';
import {
    ADD_LOGO,
    ADD_LOGO_AUTO,
    LIST_LOGOS,
    GET_DETAIL_LOGO,
    CLEAR_DETAIL_LOGO,
    UPDATE_DETAIL_LOGO,
    UPLOAD_IMAGE_LOGO,
    REMOVE_IMAGE_LOGO


} from '../types';

import { LOGO_SERVER } from '../../../components/utils/misc';

// This function is UNUSED
export function act_listLogos(lg, args = null) {

    let listOfArgs = '';
    if (args) {
        for (const [key, value] of Object.entries(args)) {

            if (value) {
                listOfArgs += '&';
                listOfArgs += key + '=' + value;
            }
        }
    }

    const request = axios.get(`${LOGO_SERVER}/list_entities?language=${lg}${listOfArgs}`)
        .then(response => response.data)

    return {
        type: LIST_LOGOS,
        payload: request
    }
}

export function act_clearDetail(currentType) {
    switch (currentType) {
        case 'logo':
            return {
                type: CLEAR_DETAIL_LOGO,
                payload: ''
            }
        default:
            return '';
    }
}

export function act_getDetail_by_Args_Logo(language, args = null) {

    let listOfArgs = '';

    if (args) {
        for (const [key, value] of Object.entries(args)) {

            if (value) {
                listOfArgs += '&';
                listOfArgs += key + '=' + value;
            }
        }
    }


    const request = axios.get(`${LOGO_SERVER}/get_entity_by_args?language=${language}${listOfArgs}`)
        .then(response => {
            return response.data

        })

    return {
        type: GET_DETAIL_LOGO,
        payload: request
    }
}

export function act_addLogo(language, args = null, dataToSubmit = null) {

    let listOfArgs = '';
    if (args) {
        for (const [key, value] of Object.entries(args)) {

            if (value) {
                listOfArgs += '&';
                listOfArgs += key + '=' + value;
            }
        }
    }

    const request = axios.post(`${LOGO_SERVER}/add_entity?language=${language}${listOfArgs}`, dataToSubmit)
        .then(response => {
            return response.data
        });

    return {
        type: ADD_LOGO,
        payload: request
    }
}

export function act_addLogo_Auto(language, dataToSubmit = null) {

    const request = axios.post(`${LOGO_SERVER}/add_entity_auto?language=${language}`, dataToSubmit)
        .then(response => {
            return response.data
        });

    return {
        type: ADD_LOGO_AUTO,
        payload: request
    }
}

export function act_updateDetail_Logo(language, args = null, dataToSubmit = null) {

    let listOfArgs = '';
    if (args) {
        for (const [key, value] of Object.entries(args)) {

            if (value) {
                listOfArgs += '&';
                listOfArgs += key + '=' + value;
            }
        }
    }

    const request = axios.post(`${LOGO_SERVER}/update_entity?language=${language}${listOfArgs}`, dataToSubmit)
        .then(response => {

            return response.data.doc
        });

    return {
        type: UPDATE_DETAIL_LOGO,
        payload: request
    }
}
// Image Handler

export function act_uploadImage_Logo(formData, axiosheaders) {
    // console.log(entity_id)
    const request = axios.post(`${LOGO_SERVER}/uploadimage`, formData, axiosheaders)
        .then(response => {
            // console.log(response)
            return response.data;
        })

    return {
        type: UPLOAD_IMAGE_LOGO,
        payload: request
    }
}

export function act_removeImage_Logo(image_id) {

    const request = axios.get(`${LOGO_SERVER}/removeimage?image_id=${image_id}`)
        .then(response => {
            return response.data;
        })

    return {
        type: REMOVE_IMAGE_LOGO,
        payload: request
    }
}
