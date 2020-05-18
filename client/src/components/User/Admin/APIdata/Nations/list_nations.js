import React, { Component } from 'react';
import UserLayout from '../../../../../hoc/user';
import ListNationsBlock from '../Nations/list_nations_block';

import { connect } from 'react-redux';
import { act_listNations, act_removeItem_Nation, act_syncDataSet, act_clearList, act_clearDetail } from '../../../../../redux/actions/APIdata/Nations/nation_actions';

class ListNations extends Component {

    state = {
        message: {
            Sync: {
                loading: {
                    status: false,
                    content: 'Syncing...'
                },
                completed: {
                    status: false,
                    content: 'Completed'
                }
            },
            onRemove: {
                loading: {
                    status: false,
                    content: 'Removing...'
                },
                completed: {
                    status: false,
                    content: 'Removed'
                }
            }
        }
    }

    // componentDidUpdate(prevProps, prevState) {
    //     let args = {}

    //     this.props.dispatch(act_listNations(args))
    // }

    componentDidMount() {
        let args = {}

        this.props.dispatch(act_listNations(args))

    }

    componentWillUnmount() {
        this.props.dispatch(act_clearList('nation'))
        this.props.dispatch(act_clearDetail('nation'))

    }

    updateFields = (message) => {
        this.setState({
            message: message
        })
    }

    showMessages = () => {

        let message = this.state.message

        for (const [key1, value1] of Object.entries(message)) {
            for (const [key2, value2] of Object.entries(value1)) {

                if (value2.status){                    
                    return <div className="form_success">{value2.content}</div>
                } 
            }
            }
   
    }

    removeEntityFromDb = (id) => {

        let message = this.state.message
        message['onRemove'].loading.status = true
        this.updateFields(message)

        let args = {}
        args['_id'] = id
        this.props.dispatch(act_removeItem_Nation(args))
            .then((response) => {

                let args = {}
                this.props.dispatch(act_listNations(args))
                .then(() => {
                    message['onRemove'].loading.status = false
                    message['onRemove'].completed.status = true

                    this.setState({
                        message
                    }, () => {
                        setTimeout(() => {

                            message['onRemove'].loading.status = false
                            message['onRemove'].completed.status = false

                            this.setState({
                                message
                            })
                        }, 1000)
                    })
                })
            })
    }

    syncDataSet = (event) => {
        event.preventDefault();

        let message = this.state.message
        message['Sync'].loading.status = true
        this.updateFields(message)
        // ----

        this.props.dispatch(act_syncDataSet())
            .then((response) => {

                let args = {}
                this.props.dispatch(act_listNations(args))
                    .then(() => {
                        message['Sync'].loading.status = false
                        message['Sync'].completed.status = true

                        this.setState({
                            message
                        }, () => {
                            setTimeout(() => {

                                message['Sync'].loading.status = false
                                message['Sync'].completed.status = false

                                this.setState({
                                    message
                                })
                            }, 1000)
                        })
                    })




            })
    }




    render() {
        return (
            <UserLayout>
                <div>
                    <button onClick={(event) => this.syncDataSet(event)}>Sync</button>

                    <h1>List Nations</h1>
                    {this.showMessages()}

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