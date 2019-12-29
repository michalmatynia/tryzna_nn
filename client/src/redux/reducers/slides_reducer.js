import {
    GET_SLIDES_TO_BANNER,
    ADD_SLIDE,
    CLEAR_SLIDE

} from '../actions/types';

export default function (state = {}, action) {
    switch (action.type) {
        case GET_SLIDES_TO_BANNER:
            return {
                ...state,
                toBanner: action.payload.slide_items,
                toBannerSize: action.payload.size
            }
        case ADD_SLIDE:
            return {
                ...state, adminAddSlide: action.payload
            }
        case CLEAR_SLIDE:
            return {
                ...state, adminAddSlide: action.payload
            }
        default:
            return state;
    }

}