import {
    GET_MENU_DETAIL,
    UPDATE_MENU_DETAIL,
    SHOW_MENU_DETAIL,
    ADD_MENU,
    CLEAR_MENU,
    POS_MENU

} from '../../actions/types';

export default function (state = {}, action) {
    switch (action.type) {
        case SHOW_MENU_DETAIL:
            return { ...state, menuDetail: action.payload }
        case GET_MENU_DETAIL:
            return { ...state, menuDetail: action.payload }
        case UPDATE_MENU_DETAIL:
            return { ...state, menuDetail: action.payload }
        case ADD_MENU:
            return {
                ...state, adminAddMenu: action.payload
            }
        case CLEAR_MENU:
            return {
                ...state, adminAddMenu: action.payload
            }
        case POS_MENU:
            return { ...state, menuDetail: action.payload }
        default:
            return state;
    }

}