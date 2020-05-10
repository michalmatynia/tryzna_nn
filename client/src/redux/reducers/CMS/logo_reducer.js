import {
    ADD_LOGO,
    ADD_LOGO_AUTO,
    LIST_LOGOS,
    GET_DETAIL_LOGO,
    CLEAR_DETAIL_LOGO,
    UPDATE_DETAIL_LOGO,
    SET_VISIBLE_LOGO,
    UPLOAD_IMAGE_LOGO,
    REMOVE_IMAGE_LOGO
} from '../../actions/types';

export default function (state = {}, action) {
    switch (action.type) {
        case LIST_LOGOS:
            return { ...state, adminGetLogos: action.payload }
        case GET_DETAIL_LOGO:
            return { ...state, logoDetail: action.payload }
        case CLEAR_DETAIL_LOGO:
            return { ...state, logoDetail: action.payload }
        case UPDATE_DETAIL_LOGO:
            return { ...state, logoDetail: action.payload }
        case ADD_LOGO_AUTO:
            return { ...state, logoDetail: action.payload }
        case ADD_LOGO:
            return { ...state, adminAddLogo: action.payload }
        case SET_VISIBLE_LOGO:
            return { ...state, adminGetLogo: action.payload }
        case REMOVE_IMAGE_LOGO:
            return { ...state }
        case UPLOAD_IMAGE_LOGO:
            return { ...state }
        default:
            return state;
    }

}