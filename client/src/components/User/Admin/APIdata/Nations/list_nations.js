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
        let args = {}

        this.props.dispatch(act_listNations(args))
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
        console.log(id);

        let args = {}
        args['_id'] = id
        this.props.dispatch(act_removeItem_Nation(args))

    }

    syncDataSet = (event) => {
        event.preventDefault();

        this.props.dispatch(act_syncDataSet())
            .then((response) => {

            })
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