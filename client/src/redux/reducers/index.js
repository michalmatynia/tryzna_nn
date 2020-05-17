import { combineReducers } from 'redux';
import user from './user_reducer';
import products from '../reducers/products_reducer';
import site from './site_reducer';

// API
// Nations
import APIdataset from './APIdata/dataset_reducer';

// SYSTEM
// Language
import languages from '../reducers/system/language_reducer';

// CMS
import menu from '../reducers/CMS/menu_reducer';
import logo from '../reducers/CMS/logo_reducer';
import description from '../reducers/CMS/desc_reducer';
import slides from '../reducers/CMS/slides_reducer';

const rootReducer = combineReducers({
    user,
    APIdataset,
    products,
    slides,
    languages,
    site,
    description,
    logo,
    menu
});

export default rootReducer;