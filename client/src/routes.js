import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from './hoc/layout';
import Auth from './hoc/auth';

import Home from './components/Home';
import RegisterLogin from './components/Register_login';
import Register from './components/Register_login/register';
import Shop from './components/Shop';
import ProductPage from './components/Product';
import ResetUser from './components/Reset_user';
import ResetPass from './components/Reset_user/reset_pass';

import UserDashboard from './components/User';
import AddProduct from './components/User/Admin/add_product';

import ManageCategories from './components/User/Admin/Taxonomy/manage_categories';
import UserCart from './components/User/cart';
import UpdateProfile from './components/User/update_profile';

import ManageSite from './components/User/Admin/manage_site';
import AddFile from './components/User/Admin/add_file';

// API
// Nation
import ApiListNations from './components/User/Admin/APIdata/Nations/list_nations';

// SYSTEM
// Language
import AddLanguage from './components/User/Admin/system/Languages/add_language';
import EditLanguage from './components/User/Admin/system/Languages/edit_language';
import ListLanguages from './components/User/Admin/system/Languages/list_languages';

// CMS Managment
// Menu
import AddMenu from './components/User/Admin/CMS/Menu/add_menu';
import EditMenu from './components/User/Admin/CMS/Menu/edit_menu';
import ListMenus from './components/User/Admin/CMS/Menu/list_menus';
// Logo
import EditLogo from './components/User/Admin/CMS/Logo/edit_logo';
// Slider
import AddSlide from './components/User/Admin/CMS/Slides/add_slide';
import EditSlide from './components/User/Admin/CMS/Slides/edit_slide';
import ListSlides from './components/User/Admin/CMS/Slides/list_slides';
// Description
import EditDesc from './components/User/Admin/CMS/Description/edit_desc';

import PageNotFound from './components/utils/page_not_found';

const Routes = () => {
  return (
    <Layout>
      <Switch>

        <Route path="/user/dashboard" exact component={Auth(UserDashboard, true)} />
        <Route path="/user/cart" exact component={Auth(UserCart, true)} />
        <Route path="/user/user_profile" exact component={Auth(UpdateProfile, true)} />

        
        <Route path="/admin/api/list_nations" exact component={Auth(ApiListNations, true)} />

        <Route path="/admin/add_product" exact component={Auth(AddProduct, true)} />
        <Route path="/admin/manage_categories" exact component={Auth(ManageCategories, true)} />
        <Route path="/admin/site_info" exact component={Auth(ManageSite, true)} />
        <Route path="/admin/add_file" exact component={Auth(AddFile, true)} />

        <Route path="/admin/add_language" exact component={Auth(AddLanguage, true)} />
        <Route path="/admin/list_languages" exact component={Auth(ListLanguages, true)} />
        <Route path="/admin/edit_language/:id" exact component={Auth(EditLanguage, true)} />

        <Route path="/admin/add_menu" exact component={Auth(AddMenu, true)} />
        <Route path="/admin/edit_menu/:id" exact component={Auth(EditMenu, true)} />
        <Route path="/admin/list_menus" exact component={Auth(ListMenus, true)} />

        <Route path="/admin/edit_logo" exact component={Auth(EditLogo, true)} />

        <Route path="/admin/add_slide" exact component={Auth(AddSlide, true)} />
        <Route path="/admin/list_slides" exact component={Auth(ListSlides, true)} />
        <Route path="/admin/edit_slide/:id" exact component={Auth(EditSlide, true)} />

        <Route path="/admin/edit_desc" exact component={Auth(EditDesc, true)} />

        <Route path="/reset_password/:token" exact component={Auth(ResetPass, false)} />
        <Route path="/reset_user" exact component={Auth(ResetUser, false)} />
        <Route path="/product_detail/:id" exact component={Auth(ProductPage, null)} />
        <Route path="/register" exact component={Auth(Register, false)} />
        <Route path="/register_login" exact component={Auth(RegisterLogin, false)} />
        <Route path="/shop" exact component={Auth(Shop, null)} />
        <Route path="/" exact component={Auth(Home, null)} />
        <Route component={Auth(PageNotFound)} />
      </Switch>
    </Layout>
  )
}

export default Routes;
