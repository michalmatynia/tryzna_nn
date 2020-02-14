import {
    GET_DESCRIPTION_DETAIL,
    UPDATE_DESCRIPTION_DETAIL,
    SHOW_DESCRIPTION_DETAIL

} from '../../actions/types';

export default function (state = {}, action) {
    switch (action.type) {
        case SHOW_DESCRIPTION_DETAIL:
            return { ...state, descDetail: action.payload }
        case GET_DESCRIPTION_DETAIL:
            return { ...state, descDetail: action.payload }
        case UPDATE_DESCRIPTION_DETAIL:
            return { ...state, descDetail: action.payload }
        default:
            return state;
    }

}