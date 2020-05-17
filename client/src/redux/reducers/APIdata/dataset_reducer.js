import {
ADD_NATION,
LIST_NATIONS,
CLEAR_DETAIL_NATION,
CLEAR_LIST_NATION,
REMOVE_ITEM_NATION,
REMOVE_IMAGE_NATION,
GET_DETAIL_NATION,
UPDATE_DETAIL_NATION,
UPLOAD_IMAGE_NATION
} from '../../actions/types';

export default function (state = {}, action) {
    switch (action.type) {
        case LIST_NATIONS:
            return { ...state, listNations: action.payload }
        case REMOVE_ITEM_NATION:
            return {
                ...state,
                listNations: action.payload,
            }
        case ADD_NATION:
            return {
                ...state, addedNation: action.payload
            }
        case CLEAR_DETAIL_NATION:
            return {
                ...state, addedNation: action.payload, detailNation: action.payload
            }
        case CLEAR_LIST_NATION:
            return {
                ...state, listNations: action.payload
            }
        case GET_DETAIL_NATION:
            return { ...state, detailNation: action.payload }
        case UPDATE_DETAIL_NATION:
            return { ...state, detailNation: action.payload }
        case REMOVE_IMAGE_NATION:
            return { ...state }
        case UPLOAD_IMAGE_NATION:
            return { ...state }
        default:
            return state;
    }

}