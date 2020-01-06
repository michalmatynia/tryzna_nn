import { combineReducers } from 'redux';
import user from './user_reducer';
import products from '../reducers/products_reducer';
import slides from '../reducers/slides_reducer';
import site from './site_reducer';
import description from './desc_reducer';

const rootReducer = combineReducers({
    user,
    products,
    slides,
    site,
    description
});

export default rootReducer;