import React from 'react';
import AdminSideMenu from 'react-sidemenu';
import AdminSidenavItems from '../../hoc/admin_sidenav_items';
import UserLayout from '../../hoc/user';
import MyButton from '../utils/button';
import UserHistoryBlock from '../utils/User/history_block';

const UserDashboard = ({ user }) => {
    return (
        <UserLayout>
            <AdminSideMenu
                showNav={user.userData.isAdmin}
                // onHideNav={props.onHideNav}
                navStyle={{
                    background: '#242424',
                    maxWidth: '220px'
                }}
            >
                <AdminSidenavItems />
            </AdminSideMenu>
            <div>
                <div className="user_nfo_panel">
                    <h1>User information</h1>
                    <div>
                        <span>{user.userData.name}</span>
                        <span>{user.userData.lastname}</span>
                        <span>{user.userData.email}</span>
                    </div>
                    <MyButton
                        type="default"
                        title="Edit account info"
                        linkTo="/user/user_profile"
                    />
                    {
                        user.userData.history ?
                            <div className="user_nfo_panel">
                                <h1>History Purchases</h1>
                                <div className="user_product_block_wrapper">
                                    <UserHistoryBlock
                                        products={user.userData.history}
                                    />
                                </div>
                            </div>
                            : null
                    }
                </div>
            </div>
        </UserLayout>

    )
}

export default UserDashboard
