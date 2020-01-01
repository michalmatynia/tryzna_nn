import {
    GET_SLIDES,
    ADD_SLIDE,
    CLEAR_SLIDE,
    REMOVE_SLIDE_ITEM

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
                adminRemoveSlide: action.payload,
            }
        default:
            return state;
    }

}