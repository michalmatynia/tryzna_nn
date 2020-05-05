import axios from 'axios';
import {
    GET_MENU_DETAIL,
    UPDATE_MENU_DETAIL,
    SHOW_MENU_DETAIL,
    ADD_MENU,
    CLEAR_MENU,
    LIST_MENUS,
    GET_MENUS,
    REMOVE_MENU_ITEM,
    SET_PUBLISH_MENU

} from '../types';

import { MENU_SERVER } from '../../../components/utils/misc';

export function act_listMenus(lg, args = null) {

    let listOfArgs = '';

    if (args) {

        for (const [key, value] of Object.entries(args)) {

            listOfArgs += '&';
            if (value) {
                listOfArgs += key + '=' + value;
            }
        }

    }

    const request = axios.get(`${MENU_SERVER}/list_entities?language=${lg}${listOfArgs}`)
        .then(response => response.data)

    return {
        type: LIST_MENUS,
        payload: request
    }
}

export function act_clearMenu(currentType) {
    switch (currentType) {
        case 'menu':
            return {
                type: CLEAR_MENU,
                payload: ''
            }
        default:
            return '';
    }
}

export function act_addMenu(language, args, dataToSubmit = null) {

    let listOfArgs = '';

    for (const [key, value] of Object.entries(args)) {

        listOfArgs += '&';
        if (value) {
            listOfArgs += key + '=' + value;
        }
    }

    const request = axios.post(`${MENU_SERVER}/add_entity?language=${language}${listOfArgs}`, dataToSubmit)
        .then(response => response.data);

    return {
        type: ADD_MENU,
        payload: request
    }
}

export function act_removeMenuItem(id) {

    const request = axios.get(`${MENU_SERVER}/remove_entity?_id=${id}`)
        .then(response => {
            return response.data;
        })

    return {
        type: REMOVE_MENU_ITEM,
        payload: request
    }
}

export function act_getDetail_Menu(id) {

    const request = axios.get(`${MENU_SERVER}/get_entity_by_id?_id=${id}`)
        .then(response => {
            console.log('act_GetDetail_Menu')
            // console.log(response)

            return response.data

        })

    return {
        type: GET_MENU_DETAIL,
        payload: request
    }
}
// --------------------- BELOW NOT DEVELOPED YET
// DEVELOPING


export function act_getData_Menus(args) {

    let listOfArgs = '';
    let i = 0;
    // console.log(args);

    for (const [key, value] of Object.entries(args)) {
        i++;
        if (i === 1) { listOfArgs += '?'; } else { listOfArgs += '&'; }

        if (value) {
            listOfArgs += key + '=' + value;
        }
    }

    const request = axios.get(`${MENU_SERVER}/list_entity${listOfArgs}`)
        .then(response => response.data);
    return {
        type: GET_MENUS,
        payload: request
    }
}

export function act_setPublishMenu(id, checked) {

    const request = axios.post(`${MENU_SERVER}/set_publish?id=${id}&checked=${checked}`)
        .then(response => response.data);

    return {
        type: SET_PUBLISH_MENU,
        payload: request
    }
}





export function act_getDetail_Menu_Published(current_lg) {

    let request = axios.get(`${MENU_SERVER}/show_entity?lg=${current_lg}&publish=true`)
        .then(response => {

            return response.data
        });

    return {
        type: SHOW_MENU_DETAIL,
        payload: request
    }
}


export function act_updateDetail_Menu(dataToSubmit, lg, parent_id) {

    // console.log(dataToSubmit)

    const request = axios.post(`${MENU_SERVER}/update_entity?lg=${lg}&parent_id=${parent_id}`, dataToSubmit)
        .then(response => response.data.doc);

    return {
        type: UPDATE_MENU_DETAIL,
        payload: request
    }
}
