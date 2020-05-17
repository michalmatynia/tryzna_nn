import React, { Component } from 'react';
import UserLayout from '../../../../../hoc/user';
import ListNationsBlock from '../Nations/list_nations_block';

import { connect } from 'react-redux';
import { act_listNations, act_removeItem_Nation, act_syncDataSet, act_clearList, act_clearDetail } from '../../../../../redux/actions/APIdata/Nations/nation_actions';

class ListNations extends Component {

    state = {
        ten: 0
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('Update');

        //         console.log(this.props);

        //         let args = {}

        // if (this.props.APIdataset.listNations === undefined) {
        //     this.props.dispatch(act_listNations(args))

        // }


    }

    componentDidMount() {
        let args = {}

        this.props.dispatch(act_listNations(args))

    }

    componentWillUnmount() {
        this.props.dispatch(act_clearList('nation'))
        this.props.dispatch(act_clearDetail('nation'))

    }

    removeEntityFromDb = (id) => {

        let args = {}

        this.props.dispatch(act_removeItem_Nation(id))
            .then(response => {

                this.props.dispatch(act_listNations(args))
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

    syncDataSet = (event) => {
        event.preventDefault();

        let args = {}
        this.props.dispatch(act_syncDataSet(args, this.props.APIdataset.listNations))

        // let dataToSubmit = generateData(this.state.formdata, 'menu');
        // let formIsValid = isFormValid(this.state.formdata, 'menu');

        // if (formIsValid) {
        //     let args = {}
        //     args['sortBy'] = 'position'

        //     this.props.dispatch(act_addMenu(this.props.user.siteLocalisation.value, args, dataToSubmit))
        //         .then((response) => {

        //             if (this.props.menu.adminAddMenu.success) {
        //                 this.resetFieldHandler();
        //             } else {
        //                 this.setState({ formError: true })
        //             }
        //         })
        // } 
    }

    render() {
        return (
            <UserLayout>
                <div>
                    <button onClick={(event) => this.syncDataSet(event)}>Sync</button>

                    <h1>List Nations</h1>
                    <div className="user_cart">
                        <ListNationsBlock
                            type="cart"
                            list={this.props.APIdataset.listNations}
                            removeItem={(id) => this.removeEntityFromDb(id)}
                        />
                    </div>
                </div>
            </UserLayout>

        );
    }

}

const mapStateToProps = (state) => {

    return {
        APIdataset: state.APIdataset
    }
}

export default connect(mapStateToProps)(ListNations);