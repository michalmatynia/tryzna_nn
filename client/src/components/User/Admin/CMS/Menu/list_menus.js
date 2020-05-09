import React, { Component } from 'react';
import UserLayout from '../../../../../hoc/user';
import ListMenusBlock from '../Menu/list_menus_block';

import { connect } from 'react-redux';
import { act_listMenus, act_removeItem_Menu, act_setVisible_Menu } from '../../../../../redux/actions/CMS/menu_actions';

class ListMenus extends Component {

    state = {

    }
    componentDidUpdate(prevProps, prevState) {
        if ((
            
            this.props.user.siteLocalisation !== undefined
            && prevProps.user.siteLocalisation === undefined
        ) || (
                this.props.user.siteLocalisation !== undefined
                && prevProps.user.siteLocalisation !== undefined
                && prevProps.user.siteLocalisation.value !== this.props.user.siteLocalisation.value

            )) {

            this.props.dispatch(act_listMenus(this.props.user.siteLocalisation.value))

        }

    }

    componentDidMount() {

        if (
            this.props.user.siteLocalisation !== undefined
        ) {
            this.props.dispatch(act_listMenus(this.props.user.siteLocalisation.value))
        }
    }

    removeEntityFromDb = (id) => {
        let args = {}
        this.props.dispatch(act_removeItem_Menu(id))
            .then(response => {
                this.props.dispatch(act_listMenus(this.props.user.siteLocalisation.value, args))
            })

    }

    handleVisible = (id, checked) => {
        let args = {}
        args['_id'] = id
        args['checked'] = checked

        this.props.dispatch(act_setVisible_Menu(this.props.user.siteLocalisation.value, args))

    }

    render() {
        return (
            <UserLayout>
                <div>
                    <h1>List Menus</h1>
                    <div className="user_cart">
                        <ListMenusBlock
                            type="cart"
                            list={this.props.menu.adminGetMenus}
                            removeItem={(id) => this.removeEntityFromDb(id)}
                            handleVisible={(id, checked) => this.handleVisible(id, checked)}
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