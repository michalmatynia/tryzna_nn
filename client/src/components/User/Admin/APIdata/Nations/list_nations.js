import React, { Component } from 'react';
import UserLayout from '../../../../../hoc/user';
import ListNationsBlock from '../Nations/list_nations_block';

import { connect } from 'react-redux';
import { act_api_listNations, act_api_removeItem_Nation, act_clearList, act_clearDetail } from '../../../../../redux/actions/APIdata/Nations/nation_actions';

class ListNations extends Component {

    state = {

    }

    // componentDidUpdate(prevProps, prevState) {
        
    //     if ((

    //         this.props.user.siteLocalisation !== undefined
    //         && prevProps.user.siteLocalisation === undefined
    //     ) || (
    //             this.props.user.siteLocalisation !== undefined
    //             && prevProps.user.siteLocalisation !== undefined
    //             && prevProps.user.siteLocalisation.value !== this.props.user.siteLocalisation.value

    //         )) {

    //         this.props.dispatch(act_api_listNations(this.props.user.siteLocalisation.value))

    //     }

    // }

    componentDidMount() {
        let args = {}

        this.props.dispatch(act_api_listNations(args))

    }

    componentWillUnmount() {
        this.props.dispatch(act_clearList('api_nations'))
        this.props.dispatch(act_clearDetail('api_nations'))

    }

    removeEntityFromDb = (id) => {
        // console.log('Remooou');

        // Check if remove is repositioning
        let args = {}

        this.props.dispatch(act_api_removeItem_Nation(id))
            .then(response => {
                
                this.props.dispatch(act_api_listNations(args))
                .then(response2 => {
  
                    
                })
            })

    }

    // handleVisible = (id, checked) => {
    //     let args = {}
    //     args['_id'] = id
    //     args['checked'] = checked

    //     this.props.dispatch(act_setVisible_Slide(args))

    // }

    render() {
        return (
            <UserLayout>
                <div>
                    <h1>List Nations</h1>
                    {/* <div className="user_cart">
                        <ListNationsBlock
                            type="cart"
                            list={this.props.nations.apiListNations}
                            removeItem={(id) => this.removeEntityFromDb(id)}
                            handleVisible={(id, checked) => this.handleVisible(id, checked)}
                        />
                    </div> */}
                </div>
            </UserLayout>

        );
    }

}

const mapStateToProps = (state) => {
    return {
        nations: state.nations
    }
}

export default connect(mapStateToProps)(ListNations);