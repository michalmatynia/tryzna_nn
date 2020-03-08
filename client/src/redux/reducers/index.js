import { combineReducers } from 'redux';
import user from './user_reducer';
import products from '../reducers/products_reducer';
import site from './site_reducer';
// CMS
import menu from '../reducers/CMS/menu_reducer';
import logo from '../reducers/CMS/logo_reducer';
import description from '../reducers/CMS/desc_reducer';
import slides from '../reducers/CMS/slides_reducer';

const rootReducer = combineReducers({
    user,
    products,
    slides,
    site,
    description,
    logo,
    menu
});

export default rootReducer;