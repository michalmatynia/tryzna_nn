import React, { Component } from 'react';
import UserLayout from '../../../../../hoc/user';
import ListMenusBlock from '../Menu/list_menus_block';

import { connect } from 'react-redux';
import { act_getData_Menus, act_removeMenuItem, act_setPublishMenu } from '../../../../../redux/actions/CMS/menu_actions';

class ListMenus extends Component {

    state = {
        get_menus:
        {
            sortBy: 'createdAdd',
            order: 'desc',
            limit: '10'
        }
    }

    componentDidMount() {

        const args = this.state.get_menus
        this.props.dispatch(act_getData_Menus(args));

    }

    removeEntityFromDb = (id) => {

        // console.log(id)
        this.props.dispatch(act_removeMenuItem(id))

    }

    handlePublish = (id, checked) => {

        // console.log(checked)
        this.props.dispatch(act_setPublishMenu(id, checked))

    }

    render() {
        return (
            <UserLayout>
                <div>
                    <h1>List Slides</h1>
                    <div className="user_cart">
                        <ListMenusBlock
                            type="cart"
                            list={this.props.menu.adminGetSlides}
                            removeItem={(id) => this.removeEntityFromDb(id)}
                            handlePublish={(id, checked) => this.handlePublish(id, checked)}
                        />
                    </div>
                </div>
            </UserLayout>

        );
    }

}

const mapStateToProps = (state) => {
    return {
        menu: state.menu
    }
}

export default connect(mapStateToProps)(ListMenus);