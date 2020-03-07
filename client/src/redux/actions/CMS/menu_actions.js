import axios from 'axios';
import {
    GET_MENU_DETAIL,
    UPDATE_MENU_DETAIL,
    SHOW_MENU_DETAIL,
    ADD_MENU,
    CLEAR_MENU,
    POS_MENU

} from '../types';

import { MENU_SERVER } from '../../../components/utils/misc';

export function act_positionMenu(lg) {

    const request = axios.get(`${MENU_SERVER}/find_pos_entity?lg=${lg}&publish=true`)
        .then(response => response.data);

    return {
        type: POS_MENU,
        payload: request
    }
}

export function act_addMenu(dataToSubmit) {

    const request = axios.post(`${MENU_SERVER}/add_entity`, dataToSubmit)
        .then(response => response.data);

    return {
        type: ADD_MENU,
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

export function act_getDetail_Menu(lg) {

    let request = axios.get(`${MENU_SERVER}/get_entity?lg=${lg}`)
    .then(response=>{
        
        if (response.data === '' || response.data.error) {
            request = axios.post(`${MENU_SERVER}/add_entity?lg=${lg}`)
            .then(response2=>{
                return response2.data.doc
            })

            return request
        } else {
            return response.data
        }
    });

    return {
        type: GET_MENU_DETAIL,
        payload: request
    }
}

export function act_getDetail_Menu_Published(current_lg) {
    
        let request = axios.get(`${MENU_SERVER}/show_entity?lg=${current_lg}&publish=true`)
        .then(response=>{
            
            return response.data
        });
    
        return {
            type: SHOW_MENU_DETAIL,
            payload: request
        }
    }


export function act_updateDetail_Menu(dataToSubmit, lg, parent_id){

    // console.log(dataToSubmit)

    const request = axios.post(`${MENU_SERVER}/update_entity?lg=${lg}&parent_id=${parent_id}`, dataToSubmit )
    .then(response => response.data.doc);

    return {
        type: UPDATE_MENU_DETAIL,
        payload: request
    }
}
