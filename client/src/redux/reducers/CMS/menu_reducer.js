import {
    ADD_MENU,
    LIST_MENUS,
    GET_DETAIL_MENU,
    CLEAR_DETAIL_MENU,
    UPDATE_DETAIL_MENU,
    REMOVE_ITEM_MENU,
    SET_VISIBLE_MENU

} from '../../actions/types';

export default function (state = {}, action) {
    switch (action.type) {
        case REMOVE_ITEM_MENU:
            return {
                ...state
            }
        case GET_DETAIL_MENU:
            return { ...state, menuDetail: action.payload }
        case UPDATE_DETAIL_MENU:
            return { ...state, menuDetail: action.payload }
        case ADD_MENU:
            return {
                ...state, adminAddMenu: action.payload
            }
        case CLEAR_DETAIL_MENU:
            return {
                ...state, adminAddMenu: action.payload
            }
            
        case LIST_MENUS:
            return { ...state, adminGetMenus: action.payload }
        case SET_VISIBLE_MENU:
            return { ...state, adminGetMenus: action.payload }
        default:
            return state;
    }

}