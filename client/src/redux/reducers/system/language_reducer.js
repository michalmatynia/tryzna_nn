import {
    LIST_LANGUAGES,
    ADD_LANGUAGE,
    CLEAR_DETAIL_LANGUAGE,
    CLEAR_LIST_LANGUAGE,
    REMOVE_ITEM_LANGUAGE,
    REMOVE_IMAGE_LANGUAGE,
    GET_DETAIL_LANGUAGE,
    UPDATE_DETAIL_LANGUAGE,
    UPLOAD_IMAGE_LANGUAGE,
    SET_VISIBLE_LANGUAGE

} from '../../actions/types';

export default function (state = {}, action) {
    switch (action.type) {
        case LIST_LANGUAGES:
            return { ...state, adminListLanguages: action.payload }
        case REMOVE_ITEM_LANGUAGE:
            return {
                ...state,
                adminListLanguages: action.payload,
            }
        case ADD_LANGUAGE:
            return {
                ...state, adminAddedLanguage: action.payload
            }
        case CLEAR_DETAIL_LANGUAGE:
            return {
                ...state, adminAddedLanguage: action.payload, adminDetailLanguage: action.payload
            }
        case CLEAR_LIST_LANGUAGE:
            return {
                ...state, adminListLanguages: action.payload
            }
        case GET_DETAIL_LANGUAGE:
            return { ...state, adminDetailLanguage: action.payload }
        case UPDATE_DETAIL_LANGUAGE:
            return { ...state, adminDetailLanguage: action.payload }
        case REMOVE_IMAGE_LANGUAGE:
            return { ...state }
        case UPLOAD_IMAGE_LANGUAGE:
            return { ...state }
        case SET_VISIBLE_LANGUAGE:
            return { ...state, adminListLanguages: action.payload }
        default:
            return state;
    }

}