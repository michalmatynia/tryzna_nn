import {
LIST_NATIONS,
CLEAR_DETAIL_NATION,
CLEAR_LIST_NATION,
REMOVE_ITEM_NATION,
GET_DETAIL_NATION,
UPDATE_DETAIL_NATION,
SYNC_ENTITY_NATION
} from '../../actions/types';

export default function (state = {}, action) {
    switch (action.type) {
        case LIST_NATIONS:
            return { ...state, listNations: action.payload }
        case REMOVE_ITEM_NATION:
            return {
                ...state,
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
        case SYNC_ENTITY_NATION:
            return { ...state }
        default:
            return state;
    }

}