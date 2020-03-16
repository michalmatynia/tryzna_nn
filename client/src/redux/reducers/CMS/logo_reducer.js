import {
    GET_LOGO_DETAIL,
    CLEAR_LOGO_DETAIL,
    UPDATE_LOGO_DETAIL,
    SHOW_LOGO_DETAIL,
    UPLOAD_LOGO_IMAGE,
    REMOVE_LOGO_IMAGE,
    ADD_LOGO


} from '../../actions/types';

export default function (state = {}, action) {
    switch (action.type) {
        case SHOW_LOGO_DETAIL:
            return { ...state, logoDetail: action.payload }
        case GET_LOGO_DETAIL:
            return { ...state, logoDetail: action.payload }
        case CLEAR_LOGO_DETAIL:
            return { ...state, logoDetail: action.payload }
        case UPDATE_LOGO_DETAIL:
            return { ...state, logoDetail: action.payload }
        case ADD_LOGO:
            return {...state, adminAddLogo: action.payload}
        case REMOVE_LOGO_IMAGE:
            return { ...state }
        case UPLOAD_LOGO_IMAGE:
            return { ...state }
        default:
            return state;
    }

}