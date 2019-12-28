import React from 'react';
import UpdateSiteNfo from './update_site_nfo';
import UserLayout from '../../../hoc/user';

const ManageSite = () => {
    return (
        <div>
            <UserLayout>
                <UpdateSiteNfo />
            </UserLayout>
        </div>
    );
};

export default ManageSite;