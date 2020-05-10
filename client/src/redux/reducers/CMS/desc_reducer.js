import {
    ADD_DESC,
    ADD_DESC_AUTO,
    LIST_DESC,
    GET_DETAIL_DESC,
    CLEAR_DETAIL_DESC,
    UPDATE_DETAIL_DESC,
    SET_VISIBLE_DESC
} from '../../actions/types';

export default function (state = {}, action) {
    switch (action.type) {
        case LIST_DESC:
            return { ...state, adminGetLogos: action.payload }
        case GET_DETAIL_DESC:
            return { ...state, logoDetail: action.payload }
        case CLEAR_DETAIL_DESC:
            return { ...state, logoDetail: action.payload }
        case UPDATE_DETAIL_DESC:
            return { ...state, logoDetail: action.payload }
        case ADD_DESC_AUTO:
            return { ...state, logoDetail: action.payload }
        case ADD_DESC:
            return { ...state, adminAddLogo: action.payload }
        case SET_VISIBLE_DESC:
            return { ...state, adminGetMenus: action.payload }
        default:
            return state;
    }

}