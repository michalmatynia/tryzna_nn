import React, { Component } from 'react';
import UserLayout from '../../../../../hoc/user';
import ListMenusBlock from '../Menu/list_menus_block';

import { connect } from 'react-redux';
import { act_listMenus, act_removeMenuItem, act_setPublishMenu } from '../../../../../redux/actions/CMS/menu_actions';

class ListMenus extends Component {

    state = {
        get_args:
            {}
    }
    componentDidUpdate(prevProps, prevState) {

        // let args = []
        // console.log(this.state.get_args.language)
        // console.log(typeof(this.state.get_args))
        //  console.log('gregerg')
        // Set Language
        if ((
            this.props.user.siteLocalisation !== undefined
            && prevProps.user.siteLocalisation === undefined
           // && !this.state.get_args.language
        ) || (
                this.props.user.siteLocalisation !== undefined
                && prevProps.user.siteLocalisation !== undefined
                // && this.state.get_args.language
                && prevProps.user.siteLocalisation.value !== this.props.user.siteLocalisation.value

            )) {

            //  if (this.state.get_args.language) {} else {}

            // const newData = {
            //     ...this.state.get_args
            // }
            // console.log(newData)
            // newData['language'] = this.props.user.siteLocalisation.value;
            // console.log(newData)
            // this.setState({
            //     get_args: newData
            // })
            // args = this.state.get_args
            this.props.dispatch(act_listMenus(this.props.user.siteLocalisation.value, this.state.get_args))
                .then(response => {
                    console.log(response)
                });


        }

        // else if ((
        //     this.props.user.siteLocalisation !== undefined
        //     && this.state.get_args.language !== undefined
        //     && this.state.get_args.language
        //     && prevState.state.get_args.language !== this.state.get_args.language
        // ) || (
        //     this.props.user.siteLocalisation !== undefined
        //     && this.state.get_args.language
        //     && prevProps.user.siteLocalisation.value !== this.props.user.siteLocalisation.value
        //     )) {

        //     // args = this.state.get_args
        //     this.props.dispatch(act_listMenus(this.props.user.siteLocalisation.value, this.state.get_args))
        //     .then(response => {
        //         console.log(response)
        //     });
        // }

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
                    <h1>List Menus</h1>
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