import axios from 'axios';
import {
    ADD_MENU,
    LIST_MENUS,
    GET_DETAIL_MENU,
    CLEAR_DETAIL_MENU,
    UPDATE_DETAIL_MENU,
    REMOVE_ITEM_MENU,
    SET_VISIBLE_MENU

} from '../types';

import { MENU_SERVER } from '../../../components/utils/misc';

export function act_listMenus(language, args = null) {

    let listOfArgs = '';
    if (args) {
        for (const [key, value] of Object.entries(args)) {

            if (value) {
                listOfArgs += '&';
                listOfArgs += key + '=' + value;
            }
        }
    }


    const request = axios.get(`${MENU_SERVER}/list_entities?language=${language}${listOfArgs}`)
        .then(response => response.data)

    return {
        type: LIST_MENUS,
        payload: request
    }
}

export function act_clearDetail(currentType) {
    switch (currentType) {
        case 'menu':
            return {
                type: CLEAR_DETAIL_MENU,
                payload: ''
            }
        default:
            return '';
    }
}

export function act_addMenu(language, args = null, dataToSubmit = null) {

    let listOfArgs = '';
    if (args) {
        for (const [key, value] of Object.entries(args)) {

            if (value) {
                listOfArgs += '&';
                listOfArgs += key + '=' + value;
            }
        }
    }


    const request = axios.post(`${MENU_SERVER}/add_entity?language=${language}${listOfArgs}`, dataToSubmit)
        .then(response => response.data);

    return {
        type: ADD_MENU,
        payload: request
    }
}

export function act_removeItem_Menu(language, args = null) {

    let listOfArgs = '';
    if (args) {
        for (const [key, value] of Object.entries(args)) {

            if (value) {
                listOfArgs += '&';
                listOfArgs += key + '=' + value;
            }
        }
    }

    const request = axios.get(`${MENU_SERVER}/remove_entity?language=${language}${listOfArgs}`)
        .then(response => response.data)

    return {
        type: REMOVE_ITEM_MENU,
        payload: request
    }

}

export function act_getDetail_by_Id_Menu(id) {

    const request = axios.get(`${MENU_SERVER}/get_entity_by_id?_id=${id}`)
        .then(response => {

            return response.data

        })

    return {
        type: GET_DETAIL_MENU,
        payload: request
    }
}

export function act_getDetail_by_Args_Menu(language, args = null) {

    let listOfArgs = '';
    if (args) {
        for (const [key, value] of Object.entries(args)) {

            if (value) {
                listOfArgs += '&';
                listOfArgs += key + '=' + value;
            }
        }
    }


    const request = axios.get(`${MENU_SERVER}/get_entity_by_args?language=${language}${listOfArgs}`)
        .then(response => {

            return response.data

        })

    return {
        type: GET_DETAIL_MENU,
        payload: request
    }
}

export function act_updateDetail_Menu(language, args = null, dataToSubmit = null) {

    let listOfArgs = '';
    if (args) {
        for (const [key, value] of Object.entries(args)) {

            if (value) {
                listOfArgs += '&';
                listOfArgs += key + '=' + value;
            }
        }
    }

    const request = axios.post(`${MENU_SERVER}/update_entity?language=${language}${listOfArgs}`, dataToSubmit)
        .then(response => {

            return response.data.doc
        });

    return {
        type: UPDATE_DETAIL_MENU,
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


    const request = axios.post(`${MENU_SERVER}/set_visible?language=${language}${listOfArgs}`)
        .then(response => {
            console.log(response);

            return response.data
        });

    return {
        type: SET_VISIBLE_MENU,
        payload: request
    }
}

