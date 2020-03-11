import {
    GET_MENU_DETAIL,
    UPDATE_MENU_DETAIL,
    SHOW_MENU_DETAIL,
    ADD_MENU,
    CLEAR_MENU,
    LIST_MENUS,
    GET_MENUS,
    REMOVE_MENU_ITEM,
    SET_PUBLISH_MENU

} from '../../actions/types';

export default function (state = {}, action) {
    switch (action.type) {
        case GET_MENUS:
            return { ...state, adminGetMenus: action.payload }
        case REMOVE_MENU_ITEM:
            return {
                ...state
            }
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
            
        case LIST_MENUS:
            return { ...state, adminGetMenus: action.payload }
        case SET_PUBLISH_MENU:
            return { ...state, adminGetMenus: action.payload }
        default:
            return state;
    }

}