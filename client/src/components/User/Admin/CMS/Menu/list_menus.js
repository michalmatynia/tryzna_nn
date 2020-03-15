import React, { Component } from 'react';
import UserLayout from '../../../../../hoc/user';
import ListMenusBlock from '../Menu/list_menus_block';

import { connect } from 'react-redux';
import { act_listMenus, act_removeMenuItem, act_setPublishMenu } from '../../../../../redux/actions/CMS/menu_actions';

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

        this.props.dispatch(act_removeMenuItem(id))
            .then(response => {
                this.props.dispatch(act_listMenus(this.props.user.siteLocalisation.value, this.state.get_args))
            })

    }

    handlePublish = (id, checked) => {

        // console.log(checked)
        this.props.dispatch(act_setPublishMenu(id, checked))

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