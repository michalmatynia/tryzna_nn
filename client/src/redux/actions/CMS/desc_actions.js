import axios from 'axios';
import {
    GET_DETAIL_DESCRIPTION,
    UPDATE_DETAIL_DESCRIPTION,
} from '../types';

import { DESC_SERVER } from '../../../components/utils/misc';
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
export function act_getDetail_by_Args_Desc(language, args = null) {

    let listOfArgs = '';
    if (args) {
        for (const [key, value] of Object.entries(args)) {

            if (value) {
                listOfArgs += '&';
                listOfArgs += key + '=' + value;
            }
        }
    }


    const request = axios.get(`${DESC_SERVER}/get_entity_by_args?language=${language}${listOfArgs}`)
        .then(response => {

            return response.data

        })

    return {
        type: GET_DETAIL_DESCRIPTION,
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

