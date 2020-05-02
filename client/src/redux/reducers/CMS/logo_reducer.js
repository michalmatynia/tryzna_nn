import {
    GET_LOGO_DETAIL,
    CLEAR_LOGO_DETAIL,
    UPDATE_LOGO_DETAIL,
    SHOW_LOGO_DETAIL,
    UPLOAD_LOGO_IMAGE,
    REMOVE_LOGO_IMAGE,
    ADD_LOGO,
    ADD_LOGO_AUTO,
    LIST_LOGOS


} from '../../actions/types';

export default function (state = {}, action) {
    switch (action.type) {
        case LIST_LOGOS:
            return { ...state, adminGetLogos: action.payload }
        case SHOW_LOGO_DETAIL:
            return { ...state, logoDetail: action.payload }
        case GET_LOGO_DETAIL:
            return { ...state, logoDetail: action.payload }
        case CLEAR_LOGO_DETAIL:
            return { ...state, logoDetail: action.payload }
        case UPDATE_LOGO_DETAIL:
            return { ...state, logoDetail: action.payload }
        case ADD_LOGO_AUTO:
            return { ...state, logoDetail: action.payload }
        case ADD_LOGO:
            return { ...state, adminAddLogo: action.payload }
        case REMOVE_LOGO_IMAGE:
            return { ...state }
        case UPLOAD_LOGO_IMAGE:
            return { ...state }
        default:
            return state;
    }

}