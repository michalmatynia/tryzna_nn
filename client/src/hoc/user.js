import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const links = [
    {
        name: 'My account',
        linkTo: '/user/dashboard'
    },
    {
        name: 'User information',
        linkTo: '/user/user_profile'
    },
    {
        name: 'My Cart',
        linkTo: '/user/cart'
    },
]

const admin = [
    {
        name: 'Site info',
        linkTo: '/admin/site_info'
    },
    {
        name: 'Add language',
        linkTo: '/admin/add_language'
    },
    {
        name: 'List languages',
        linkTo: '/admin/list_languages'
    },
    {
        name: 'Add products',
        linkTo: '/admin/add_product'
    },
    {
        name: 'Currency Rates',
        linkTo: '/admin/currency_rates'
    },
    {
        name: 'Manage categories',
        linkTo: '/admin/manage_categories'
    },
    {
        name: 'Upload file',
        linkTo: '/admin/add_file'
    }
]

const cms_links = [
    {
        name: 'Add menu',
        linkTo: '/admin/add_menu'
    },
    {
        name: 'List menus',
        linkTo: '/admin/list_menus'
    },
    {
        name: 'Edit logo',
        linkTo: '/admin/edit_logo'
    },
    {
        name: 'Add slides',
        linkTo: '/admin/add_slide'
    },
    {
        name: 'List slides',
        linkTo: '/admin/list_slides'
    },
    {
        name: 'Edit description',
        linkTo: '/admin/edit_desc'
    },
    {
        name: 'Add portfolio',
        linkTo: '/admin/add_slide'
    },
    {
        name: 'List portfolio',
        linkTo: '/admin/list_slides'
    },
    {
        name: 'Add video',
        linkTo: '/admin/add_slide'
    },
    {
        name: 'List video',
        linkTo: '/admin/list_slides'
    },
    {
        name: 'Add team',
        linkTo: '/admin/add_slide'
    },
    {
        name: 'List team',
        linkTo: '/admin/list_slides'
    },
    {
        name: 'Edit footer',
        linkTo: '/admin/edit_footer'
    }
]

const UserLayout = (props) => {

    const generateLinks = (links) => (
        links.map((item, i) => (
            <Link to={item.linkTo} key={i}>
                {item.name}
            </Link>
        ))
    )


    return (
        <div className="container">
            <div className="user_container">
                <div className="user_left_nav">
                    <h2>My account</h2>
                    {props.user.userData.isAdmin ?
                        <div>
                            <h2>CMS</h2>
                            <div className="links">
                                {generateLinks(cms_links)}
                            </div>
                        </div>
                        : null
                    }
                    {props.user.userData.isAdmin ?
                        <div>
                            <h2>Admin</h2>
                            <div className="links">
                                {generateLinks(admin)}
                            </div>
                        </div>
                        : null
                    }
                    <div className="links">
                        {generateLinks(links)}
                    </div>
                </div>
                <div className="user_right">
                    {props.children}
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}


export default connect(mapStateToProps)(UserLayout);