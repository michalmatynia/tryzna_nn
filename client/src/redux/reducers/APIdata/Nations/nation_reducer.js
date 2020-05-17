import {
API_ADD_NATION,
API_LIST_NATIONS,
API_CLEAR_DETAIL_NATION,
API_CLEAR_LIST_NATION,
API_REMOVE_ITEM_NATION,
API_REMOVE_IMAGE_NATION,
API_GET_DETAIL_NATION,
API_UPDATE_DETAIL_NATION,
API_UPLOAD_IMAGE_NATION
} from '../../../actions/types';

export default function (state = {}, action) {
    switch (action.type) {
        case API_LIST_NATIONS:
            return { ...state, apiListNations: action.payload }
        case API_REMOVE_ITEM_NATION:
            return {
                ...state,
                apiListNations: action.payload,
            }
        case API_ADD_NATION:
            return {
                ...state, apiAddedNation: action.payload
            }
        case API_CLEAR_DETAIL_NATION:
            return {
                ...state, apiAddedNation: action.payload, apiDetailNation: action.payload
            }
        case API_CLEAR_LIST_NATION:
            return {
                ...state, apiListNations: action.payload
            }
        case API_GET_DETAIL_NATION:
            return { ...state, apiDetailNation: action.payload }
        case API_UPDATE_DETAIL_NATION:
            return { ...state, apiDetailNation: action.payload }
        case API_REMOVE_IMAGE_NATION:
            return { ...state }
        case API_UPLOAD_IMAGE_NATION:
            return { ...state }
        default:
            return state;
    }

}