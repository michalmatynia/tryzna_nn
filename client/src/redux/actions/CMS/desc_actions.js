import axios from 'axios';
import {
    ADD_DESC,
    ADD_DESC_AUTO,
    LIST_DESC,
    GET_DETAIL_DESC,
    CLEAR_DETAIL_DESC,
    UPDATE_DETAIL_DESC,
    SET_VISIBLE_MENU
} from '../types';

import { DESC_SERVER } from '../../../components/utils/misc';

export function act_listDesc(language, args = null) {

    let listOfArgs = '';
    if (args) {
        for (const [key, value] of Object.entries(args)) {

            if (value) {
                listOfArgs += '&';
                listOfArgs += key + '=' + value;
            }
        }
    }

    const request = axios.get(`${DESC_SERVER}/list_entities?language=${language}${listOfArgs}`)
        .then(response => response.data)

    return {
        type: LIST_DESC,
        payload: request
    }
}

export function act_clearDetail(currentType) {
    switch (currentType) {
        case 'desc':
            return {
                type: CLEAR_DETAIL_DESC,
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
        type: GET_DETAIL_DESC,
        payload: request
    }
}


export function act_addDesc(language, args = null, dataToSubmit = null) {

    let listOfArgs = '';
    if (args) {
        for (const [key, value] of Object.entries(args)) {

            if (value) {
                listOfArgs += '&';
                listOfArgs += key + '=' + value;
            }
        }
    }

    const request = axios.post(`${DESC_SERVER}/add_entity?language=${language}${listOfArgs}`, dataToSubmit)
        .then(response => {
            return response.data
        });

    return {
        type: ADD_DESC,
        payload: request
    }
}

export function act_addDesc_Auto(language, dataToSubmit = null) {

    const request = axios.post(`${DESC_SERVER}/add_entity_auto?language=${language}`, dataToSubmit)
        .then(response => {
            return response.data
        });

    return {
        type: ADD_DESC_AUTO,
        payload: request
    }
}

export function act_updateDetail_Desc(language, args = null, dataToSubmit = null) {

    let listOfArgs = '';
    if (args) {
        for (const [key, value] of Object.entries(args)) {

            if (value) {
                listOfArgs += '&';
                listOfArgs += key + '=' + value;
            }
        }
    }

    const request = axios.post(`${DESC_SERVER}/update_entity?language=${language}${listOfArgs}`, dataToSubmit)
        .then(response => {

            return response.data.doc
        });

    return {
        type: UPDATE_DETAIL_DESC,
        payload: request
    }
}

export function act_setVisible_Menu(language, args = null) {

    let listOfArgs = '';
    if (args) {
        for (const [key, value] of Object.entries(args)) {

            if (value) {
                listOfArgs += '&';
                listOfArgs += key + '=' + value;
            }
        }
    }


    const request = axios.post(`${DESC_SERVER}/set_visible?language=${language}${listOfArgs}`)
        .then(response => {

            return response.data
        });

    return {
        type: SET_VISIBLE_MENU,
        payload: request
    }
}