import axios from 'axios';
import {
    API_ADD_NATION,
    API_LIST_NATIONS,
    API_GET_DETAIL_NATION,
    API_CLEAR_DETAIL_NATION,
    API_CLEAR_LIST_NATION,
    API_UPDATE_DETAIL_NATION,
    API_REMOVE_ITEM_NATION,
    API_REMOVE_IMAGE_NATION,
    API_UPLOAD_IMAGE_NATION,

} from '../../types';

import { NATION_SERVER } from '../../../../components/utils/misc';

export function act_api_listNations(args = null) {

    let listOfArgs = '';
    let i = 1;
    if (args) {
        for (const [key, value] of Object.entries(args)) {

            if (value) {

                if (i !== 1) {
                    listOfArgs += '&';
                }

                i++
                listOfArgs += key + '=' + value;
            }
        }
    }

    const request = axios.get(`${NATION_SERVER}/list_entities?${listOfArgs}`)
        .then(response => response.data)

    return {
        type: API_LIST_NATIONS,
        payload: request
    }
}

export function act_clearDetail(currentType) {
    switch (currentType) {
        case 'nation':
            return {
                type: API_CLEAR_DETAIL_NATION,
                payload: ''
            }
        default:
            return '';
    }
}

export function act_clearList(currentType) {
    switch (currentType) {
        case 'nation':
            return {
                type: API_CLEAR_LIST_NATION,
                payload: ''
            }
        default:
            return '';
    }
}

export function act_api_addNation(args = null, dataToSubmit = null) {

    let listOfArgs = '';
    let i = 1;
    if (args) {
        for (const [key, value] of Object.entries(args)) {

            if (value) {

                if (i !== 1) {
                    listOfArgs += '&';
                }

                i++
                listOfArgs += key + '=' + value;
            }
        }
    }

    const request = axios.post(`${NATION_SERVER}/add_entity?${listOfArgs}`, dataToSubmit)
        .then(response => response.data);

    return {
        type: API_ADD_NATION,
        payload: request
    }
}

export function act_api_removeItem_Nation(id) {

    const request = axios.get(`${NATION_SERVER}/remove_entity_from_list?_id=${id}`)
        .then(response => {

            return response.data;
        })

    return {
        type: API_REMOVE_ITEM_NATION,
        payload: request
    }
}


export function act_api_removeImage_Nation(image_id, parent_id) {

    const request = axios.get(`${NATION_SERVER}/removeimage?image_id=${image_id}&parent_id=${parent_id}`)
        .then(response => {
            return response.data;
        })

    return {
        type: API_REMOVE_IMAGE_NATION,
        payload: request
    }
}

export function act_api_uploadImage_Nation(formData, axiosheaders, parent_id) {

    const request = axios.post(`${NATION_SERVER}/uploadimage?parent_id=${parent_id}`, formData, axiosheaders)
        .then(response => {

            return response.data;
        })

    return {
        type: API_UPLOAD_IMAGE_NATION,
        payload: request
    }
}

export function act_api_getDetail_by_Id_Nation(id) {

    const request = axios.get(`${NATION_SERVER}/get_entity_by_id?_id=${id}`)
        .then(response => {

            return response.data

        })

    return {
        type: API_GET_DETAIL_NATION,
        payload: request
    }
}

export function act_api_getDetail_by_Args_Nation(args = null) {


    let listOfArgs = '';
    let i = 1;
    if (args) {
        for (const [key, value] of Object.entries(args)) {

            if (value) {

                if (i !== 1) {
                    listOfArgs += '&';
                }

                i++
                listOfArgs += key + '=' + value;
            }
        }
    }


    const request = axios.get(`${NATION_SERVER}/get_entity_by_args?${listOfArgs}`)
        .then(response => {

            return response.data

        })

    return {
        type: API_GET_DETAIL_NATION,
        payload: request
    }
}


export function act_api_updateDetail_Nation(args = null, dataToSubmit = null) {

    let listOfArgs = '';
    let i = 1;
    if (args) {
        for (const [key, value] of Object.entries(args)) {

            if (value) {

                if (i !== 1) {
                    listOfArgs += '&';
                }

                i++
                listOfArgs += key + '=' + value;
            }
        }
    }

    const request = axios.post(`${NATION_SERVER}/update_entity?${listOfArgs}`, dataToSubmit)
        .then(response => {


            return response.data.doc
        });

    return {
        type: API_UPDATE_DETAIL_NATION,
        payload: request
    }
}



