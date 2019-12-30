import {
    GET_SLIDES_BY_ARRIVAL,
    ADD_SLIDE,
    CLEAR_SLIDE

} from '../actions/types';

export default function (state = {}, action) {
    switch (action.type) {
        case GET_SLIDES_BY_ARRIVAL:
            return { ...state, byArrival: action.payload }
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