import {
    GET_SLIDES,
    ADD_SLIDE,
    CLEAR_SLIDE,
    REMOVE_SLIDE_ITEM,
    REMOVE_SLIDE_IMAGE,
    GET_SLIDE_DETAIL,
    UPDATE_SLIDE_DETAIL,
    UPLOAD_SLIDE_IMAGE

} from '../actions/types';

export default function (state = {}, action) {
    switch (action.type) {
        case GET_SLIDES:
            return { ...state, adminGetSlides: action.payload }
        case ADD_SLIDE:
            return {
                ...state, adminAddSlide: action.payload
            }
        case CLEAR_SLIDE:
            return {
                ...state, adminAddSlide: action.payload
            }
        case REMOVE_SLIDE_ITEM:
            return {
                ...state,
                adminGetSlides: action.payload,
            }
        case GET_SLIDE_DETAIL:
            return { ...state, slideDetail: action.payload }
        case UPDATE_SLIDE_DETAIL:
            return { ...state, slideDetail: action.payload }
        case REMOVE_SLIDE_IMAGE:
            return { ...state, slideDetail: action.payload }
        case UPLOAD_SLIDE_IMAGE:
            return { ...state, slideDetail: action.payload }
        default:
            return state;
    }

}