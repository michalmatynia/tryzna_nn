import axios from 'axios';
import {
    ADD_NATION,
    LIST_NATIONS,
    GET_DETAIL_NATION,
    CLEAR_DETAIL_NATION,
    CLEAR_LIST_NATION,
    UPDATE_DETAIL_NATION,
    REMOVE_ITEM_NATION,
    REMOVE_IMAGE_NATION,
    UPLOAD_IMAGE_NATION,

} from '../../types';

import { NATION_SERVER } from '../../../../components/utils/misc';

export function act_listNations(args = null) {

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
        .then(response => {
            console.log(response.data);


            return response.data
        })

    return {
        type: LIST_NATIONS,
        payload: request
    }
}

export function act_clearDetail(currentType) {
    switch (currentType) {
        case 'nation':
            return {
                type: CLEAR_DETAIL_NATION,
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
                type: CLEAR_LIST_NATION,
                payload: ''
            }
        default:
            return '';
    }
}

export function act_syncDataSet(args = null) {
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


    const request = axios.get(`https://restcountries.eu/rest/v2/all`)
        .then(response => {

            response.data.forEach((item) => {
console.log(item);

                // Check if item in the database
                // check if country code exists

                axios.post(`${NATION_SERVER}/sync_entity?${listOfArgs}`, 'tsst')
                    .then(response => {
                        // console.log(response);
                    });
            })

            // if (value) {

            //     if (i !== 1) {
            //         listOfArgs += '&';
            //     }

            //     i++
            //     listOfArgs += key + '=' + value;
            // }



        });

    return {
        type: ADD_NATION,
        payload: request
    }
}

export function act_addNation(args = null, dataToSubmit = null) {

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
        type: ADD_NATION,
        payload: request
    }
}

export function act_removeItem_Nation(id) {

    const request = axios.get(`${NATION_SERVER}/remove_entity_from_list?_id=${id}`)
        .then(response => {

            return response.data;
        })

    return {
        type: REMOVE_ITEM_NATION,
        payload: request
    }
}


export function act_removeImage_Nation(image_id, parent_id) {

    const request = axios.get(`${NATION_SERVER}/removeimage?image_id=${image_id}&parent_id=${parent_id}`)
        .then(response => {
            return response.data;
        })

    return {
        type: REMOVE_IMAGE_NATION,
        payload: request
    }
}

export function act_uploadImage_Nation(formData, axiosheaders, parent_id) {

    const request = axios.post(`${NATION_SERVER}/uploadimage?parent_id=${parent_id}`, formData, axiosheaders)
        .then(response => {

            return response.data;
        })

    return {
        type: UPLOAD_IMAGE_NATION,
        payload: request
    }
}

export function act_getDetail_by_Id_Nation(id) {

    const request = axios.get(`${NATION_SERVER}/get_entity_by_id?_id=${id}`)
        .then(response => {

            return response.data

        })

    return {
        type: GET_DETAIL_NATION,
        payload: request
    }
}

export function act_getDetail_by_Args_Nation(args = null) {


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
        type: GET_DETAIL_NATION,
        payload: request
    }
}


export function act_updateDetail_Nation(args = null, dataToSubmit = null) {

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
        type: UPDATE_DETAIL_NATION,
        payload: request
    }
}



