import axios from 'axios';
import {
    GET_LOGO_DETAIL,
    CLEAR_LOGO_DETAIL,
    UPDATE_LOGO_DETAIL,
    SHOW_LOGO_DETAIL,
    UPLOAD_LOGO_IMAGE,
    REMOVE_LOGO_IMAGE,
    ADD_LOGO,
    ADD_LOGO_AUTO,
    LIST_LOGOS

} from '../types';

import { LOGO_SERVER } from '../../../components/utils/misc';

// This function is UNUSED
export function act_listLogos(lg, args = null) {

    let listOfArgs = '';

    if (args) {

        for (const [key, value] of Object.entries(args)) {

            listOfArgs += '&';
            if (value) {
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

export function act_getDetail_Logo_by_Lg(lg) {

    let request = axios.get(`${LOGO_SERVER}/get_entity?language=${lg}`)
        .then(response => {

            // console.log('getDetailLogo')
            // console.log(lg)
            // console.log(response)

            return response.data
            // if (response.data === '' || response.data.error) {

        });

    return {
        type: GET_LOGO_DETAIL,
        payload: request
    }
}

export function act_clearDetail_Logo() {
    return {
        type: CLEAR_LOGO_DETAIL,
        payload: ''
    }
}

export function act_addLogo(language, args, dataToSubmit = null) {

    // console.log('in Action')
    // console.log(dataToSubmit)

    let listOfArgs = '';

    for (const [key, value] of Object.entries(args)) {

        listOfArgs += '&';
        if (value) {
            listOfArgs += key + '=' + value;
        }
    }

    const request = axios.post(`${LOGO_SERVER}/add_entity?language=${language}${listOfArgs}`, dataToSubmit)
        .then(response =>
            {
                // console.log(response)
                return response.data
            });

    return {
        type: ADD_LOGO,
        payload: request
    }
}

export function act_addLogo_Auto(language, dataToSubmit = null) {


    const request = axios.post(`${LOGO_SERVER}/add_entity_auto?language=${language}`, dataToSubmit)
        .then(response =>
            {
                console.log('Add Auto Action')
                console.log(response)
                return response.data
            });

    return {
        type: ADD_LOGO_AUTO,
        payload: request
    }
}



export function act_getDetail_Logo_Published(lg) {

    let request = axios.get(`${LOGO_SERVER}/show_entity?language=${lg}&publish=true`)
        .then(response => {
            return response.data

        });

    return {
        type: SHOW_LOGO_DETAIL,
        payload: request
    }
}



export function act_updateDetail_Logo(dataToSubmit, lg, parent_id) {

    // console.log(parent_id)

    const request = axios.post(`${LOGO_SERVER}/update_entity?lg=${lg}&parent_id=${parent_id}`, dataToSubmit)
        .then(response => response.data.doc);

    return {
        type: UPDATE_LOGO_DETAIL,
        payload: request
    }
}


// Image Handler

export function act_uploadLogoImage(formData, axiosheaders) {
    // console.log(entity_id)
    const request = axios.post(`${LOGO_SERVER}/uploadimage`, formData, axiosheaders)
        .then(response => {
            // console.log(response)
            return response.data;
        })

    return {
        type: UPLOAD_LOGO_IMAGE,
        payload: request
    }
}

export function act_removeLogoImage(image_id) {

    const request = axios.get(`${LOGO_SERVER}/removeimage?image_id=${image_id}`)
        .then(response => {
            return response.data;
        })

    return {
        type: REMOVE_LOGO_IMAGE,
        payload: request
    }
}
