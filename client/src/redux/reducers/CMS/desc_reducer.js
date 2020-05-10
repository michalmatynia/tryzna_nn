import {
    GET_DETAIL_DESCRIPTION,
    UPDATE_DETAIL_DESCRIPTION,

} from '../../actions/types';

export default function (state = {}, action) {
    switch (action.type) {
        case GET_DETAIL_DESCRIPTION:
            return { ...state, descDetail: action.payload }
        case UPDATE_DETAIL_DESCRIPTION:
            return { ...state, descDetail: action.payload }
        default:
            return state;
    }

}