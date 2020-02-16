import axios from 'axios';
import {
    GET_LOGO_DETAIL,
    CLEAR_LOGO_DETAIL,
    UPDATE_LOGO_DETAIL,
    SHOW_LOGO_DETAIL,
    UPLOAD_LOGO_IMAGE,
    REMOVE_LOGO_IMAGE

} from '../types';

import { LOGO_SERVER } from '../../../components/utils/misc';

export function act_getDetail_Logo(lg) {

    let request = axios.get(`/${LOGO_SERVER}/get_entity?lg=${lg}`)
        .then(response => {
            // console.log(response)
            if (response.data === '' || response.data.error) {

                // Get entity of any language
                request = axios.post(`/${LOGO_SERVER}/add_entity?lg=${lg}`)
                    .then(response2 => {
                        return response2.data.doc
                    })

                return request
            } else {
                return response.data
            }
        });

    return {
        type: GET_LOGO_DETAIL,
        payload: request
    }
}

export function act_clearDetail_Logo(){
    return {
        type: CLEAR_LOGO_DETAIL,
        payload: ''
    }
}

export function act_getDetail_Logo_Published(current_lg, default_lg) {

    // console.log(lg)
    
        let request = axios.get(`/${LOGO_SERVER}/show_entity?lg=${current_lg}&publish=true`)
        .then(response=>{
            
            if (response.data === '' || response.data.error) {
                request = axios.get(`/${LOGO_SERVER}/show_entity?lg=${default_lg}&publish=true`)
                .then(response2=>{

                    return response2.data
                })
    
                return request
            } else {
                return response.data
            }
        });
    
        return {
            type: SHOW_LOGO_DETAIL,
            payload: request
        }
    }



export function act_updateDetail_Logo(dataToSubmit, lg, parent_id) {

   // console.log(parent_id)

    const request = axios.post(`/${LOGO_SERVER}/update_entity?lg=${lg}&parent_id=${parent_id}`, dataToSubmit)
        .then(response => response.data.doc);

    return {
        type: UPDATE_LOGO_DETAIL,
        payload: request
    }
}


// Image Handler

export function act_uploadLogoImage(formData, axiosheaders) {
    // console.log(entity_id)
    const request = axios.post(`/${LOGO_SERVER}/uploadimage`, formData, axiosheaders)
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

    const request = axios.get(`/${LOGO_SERVER}/removeimage?image_id=${image_id}`)
        .then(response => {
            return response.data;
        })

    return {
        type: REMOVE_LOGO_IMAGE,
        payload: request
    }
}
