import { combineReducers } from 'redux';
import user from './user_reducer';
import products from '../reducers/products_reducer';
import site from './site_reducer';
// CMS
import logo from './logo_reducer';
import description from './desc_reducer';
import slides from './slides_reducer';

const rootReducer = combineReducers({
    user,
    products,
    slides,
    site,
    description,
    logo
});

export default rootReducer;