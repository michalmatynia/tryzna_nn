import {
    LIST_SLIDES,
    ADD_SLIDE,
    CLEAR_DETAIL_SLIDE,
    REMOVE_ITEM_SLIDE,
    REMOVE_IMAGE_SLIDE,
    GET_DETAIL_SLIDE,
    UPDATE_DETAIL_SLIDE,
    UPLOAD_IMAGE_SLIDE,
    SET_VISIBLE_SLIDE

} from '../../actions/types';

export default function (state = {}, action) {
    switch (action.type) {
        case LIST_SLIDES:
            return { ...state, adminGetSlides: action.payload }
        case REMOVE_ITEM_SLIDE:
            return {
                ...state,
                adminGetSlides: action.payload,
            }
        case ADD_SLIDE:
            return {
                ...state, adminAddSlide: action.payload
            }
        case CLEAR_DETAIL_SLIDE:
            return {
                ...state, adminAddSlide: action.payload
            }
        case GET_DETAIL_SLIDE:
            return { ...state, slideDetail: action.payload }
        case UPDATE_DETAIL_SLIDE:
            return { ...state, menuDetail: action.payload }
        case REMOVE_IMAGE_SLIDE:
            return { ...state }
        case UPLOAD_IMAGE_SLIDE:
            return { ...state }
        case SET_VISIBLE_SLIDE:
            return { ...state, adminGetSlides: action.payload }
        default:
            return state;
    }

}