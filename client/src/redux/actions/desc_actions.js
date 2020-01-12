import axios from 'axios';
import {
    GET_DESCRIPTION_DETAIL,
    UPDATE_DESCRIPTION_DETAIL,
    SHOW_DESCRIPTION_DETAIL

} from './types';

import { DESC_SERVER } from '../../components/utils/misc';


export function act_getDetail_Desc(lg) {


// console.log(lg)

    let request = axios.get(`${DESC_SERVER}/get_entity?lg=${lg}`)
    .then(response=>{
        
        if (response.data === '' || response.data.error) {
           //  console.log('check')
            request = axios.post(`${DESC_SERVER}/add_entity?lg=${lg}`)
            .then(response2=>{
                // console.log('rfefrefrefe')
                // console.log(response2.data)
                return response2.data.doc
            })

            return request
        } else {
            // console.log(response)
            return response.data
        }
        // console.log(request)
    });

    return {
        type: GET_DESCRIPTION_DETAIL,
        payload: request
    }
}

export function act_getDetail_Desc_Home(current_lg, default_lg) {


    // console.log(lg)
    
        let request = axios.get(`${DESC_SERVER}/show_entity?lg=${current_lg}&publish=true`)
        .then(response=>{
            
            if (response.data === '' || response.data.error) {
                request = axios.get(`${DESC_SERVER}/show_entity?lg=${default_lg}&publish=true`)
                .then(response2=>{

                    return response2.data
                })
    
                return request
            } else {
                return response.data
            }
        });
    
        return {
            type: SHOW_DESCRIPTION_DETAIL,
            payload: request
        }
    }


export function act_updateDetail_Desc(dataToSubmit, lg, parent_id){

    // console.log(dataToSubmit)

    const request = axios.post(`${DESC_SERVER}/update_entity?lg=${lg}&parent_id=${parent_id}`, dataToSubmit )
    .then(response => response.data.doc);

    return {
        type: UPDATE_DESCRIPTION_DETAIL,
        payload: request
    }
}
