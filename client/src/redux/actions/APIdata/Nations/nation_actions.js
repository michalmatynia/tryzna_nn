import axios from 'axios';
import {
    LIST_NATIONS,
    GET_DETAIL_NATION,
    CLEAR_DETAIL_NATION,
    CLEAR_LIST_NATION,
    UPDATE_DETAIL_NATION,
    REMOVE_ITEM_NATION,
    SYNC_ENTITY_NATION

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

export function act_syncDataSet() {

    const request = axios.get(`https://restcountries.eu/rest/v2/all`)
        .then(response => {

            axios.post(`${NATION_SERVER}/sync_entity`, response.data)
                .then(response => {
                    // console.log(response);
                });

        });

    return {
        type: SYNC_ENTITY_NATION,
        payload: request
    }
}


export function act_removeItem_Nation(args = null) {

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
    

    const request = axios.get(`${NATION_SERVER}/remove_entity_from_list?${listOfArgs}`)
        .then(response => {

            return response.data;
        })

    return {
        type: REMOVE_ITEM_NATION,
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



