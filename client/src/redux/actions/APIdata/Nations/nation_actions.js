import axios from 'axios';
import {
    ADD_LANGUAGE,
    LIST_LANGUAGES,
    GET_DETAIL_LANGUAGE,
    CLEAR_DETAIL_LANGUAGE,
    CLEAR_LIST_LANGUAGE,
    UPDATE_DETAIL_LANGUAGE,
    REMOVE_ITEM_LANGUAGE,
    REMOVE_IMAGE_LANGUAGE,
    UPLOAD_IMAGE_LANGUAGE,
    SET_VISIBLE_LANGUAGE

} from '../types';

import { LANGUAGE_SERVER } from '../../../components/utils/misc';

export function act_listLanguages(args = null) {

    let listOfArgs = '';
    let i = 1;
    if (args) {
        for (const [key, value] of Object.entries(args)) {

            if (value) {

                if (i !== 1) {
                    listOfArgs += '&';
                }

                i = i + 1
                listOfArgs += key + '=' + value;
            }
        }
    }


    const request = axios.get(`${LANGUAGE_SERVER}/list_entities?${listOfArgs}`)
        .then(response => response.data)

    return {
        type: LIST_LANGUAGES,
        payload: request
    }
}

export function act_clearDetail(currentType) {
    switch (currentType) {
        case 'languages':
            return {
                type: CLEAR_DETAIL_LANGUAGE,
                payload: ''
            }
        default:
            return '';
    }
}

export function act_clearList(currentType) {
    switch (currentType) {
        case 'languages':
            return {
                type: CLEAR_LIST_LANGUAGE,
                payload: ''
            }
        default:
            return '';
    }
}

export function act_addLanguage(args = null, dataToSubmit = null) {

    let listOfArgs = '';
    let i = 1;
    if (args) {
        for (const [key, value] of Object.entries(args)) {

            if (value) {

                if (i !== 1) {
                    listOfArgs += '&';
                }

                i = i + 1
                listOfArgs += key + '=' + value;
            }
        }
    }

    const request = axios.post(`${LANGUAGE_SERVER}/add_entity?${listOfArgs}`, dataToSubmit)
        .then(response => response.data);

    return {
        type: ADD_LANGUAGE,
        payload: request
    }
}

export function act_removeItem_Language(id) {

    const request = axios.get(`${LANGUAGE_SERVER}/remove_entity_from_list?_id=${id}`)
        .then(response => {

            return response.data;
        })

    return {
        type: REMOVE_ITEM_LANGUAGE,
        payload: request
    }
}


export function act_removeImage_Language(image_id, parent_id) {

    const request = axios.get(`${LANGUAGE_SERVER}/removeimage?image_id=${image_id}&parent_id=${parent_id}`)
        .then(response => {
            return response.data;
        })

    return {
        type: REMOVE_IMAGE_LANGUAGE,
        payload: request
    }
}

export function act_uploadImage_Language(formData, axiosheaders, parent_id) {

    const request = axios.post(`${LANGUAGE_SERVER}/uploadimage?parent_id=${parent_id}`, formData, axiosheaders)
        .then(response => {

            return response.data;
        })

    return {
        type: UPLOAD_IMAGE_LANGUAGE,
        payload: request
    }
}

export function act_getDetail_by_Id_Language(id) {

    const request = axios.get(`${LANGUAGE_SERVER}/get_entity_by_id?_id=${id}`)
        .then(response => {

            return response.data

        })

    return {
        type: GET_DETAIL_LANGUAGE,
        payload: request
    }
}

export function act_getDetail_by_Args_Language(language, args = null) {

    let listOfArgs = '';
    if (args) {
        for (const [key, value] of Object.entries(args)) {

            if (value) {
                listOfArgs += '&';
                listOfArgs += key + '=' + value;
            }
        }
    }


    const request = axios.get(`${LANGUAGE_SERVER}/get_entity_by_args?language=${language}${listOfArgs}`)
        .then(response => {

            return response.data

        })

    return {
        type: GET_DETAIL_LANGUAGE,
        payload: request
    }
}


export function act_updateDetail_Language(language, args = null, dataToSubmit = null) {



    let listOfArgs = '';
    if (args) {
        for (const [key, value] of Object.entries(args)) {

            if (value) {
                listOfArgs += '&';
                listOfArgs += key + '=' + value;
            }
        }
    }


    const request = axios.post(`${LANGUAGE_SERVER}/update_entity?language=${language}${listOfArgs}`, dataToSubmit)
        .then(response => {


            return response.data.doc
        });

    return {
        type: UPDATE_DETAIL_LANGUAGE,
        payload: request
    }
}

export function act_setVisible_Language(language, args = null) {

    let listOfArgs = '';
    if (args) {
        for (const [key, value] of Object.entries(args)) {

            if (value) {
                listOfArgs += '&';
                listOfArgs += key + '=' + value;
            }
        }
    }


    const request = axios.post(`${LANGUAGE_SERVER}/set_visible?language=${language}${listOfArgs}`)
        .then(response => {

            return response.data
        });

    return {
        type: SET_VISIBLE_LANGUAGE,
        payload: request
    }
}

