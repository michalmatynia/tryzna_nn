import React, { Component } from 'react'
import { connect } from 'react-redux';
import { auth, setCookie, setLocalisation } from '../redux/actions/user_actions';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function (ComposedClass, reload, adminRoute = null) {

    class AuthenticationCheck extends Component {

        state = {
            loading: true
        }

        componentDidMount() {

            let user_lg = null
            let user_currency = null

            this.props.dispatch(setCookie())
            .then(response => {

                

                if (response.payload) {
                    user_lg = response.payload.languages
                user_currency = response.payload.currency
                    
                } else { 
                    user_lg = 'en';
                    user_currency = 'EUR'
                }

                this.props.dispatch(setLocalisation(user_lg, user_currency))
            })

            // if(user_lg) {
            // console.log(user_lg)}


            // if(this.props.user.cookieUser){
            
            // }
            // if (this.props.user.cookieUser) {

            //     user_lg = this.props.user.cookieUser.languages
            //     user_currency = this.props.user.cookieUser.currency
            // } else { 
            //     user_lg = 'en';
            //     user_currency = 'EUR'
            // }
            
            

            // ---------

            this.props.dispatch(auth())
                .then(response => {
                    let user = this.props.user.userData;
                    if (!user.isAuth) {
                        if (reload) {
                            this.props.history.push('/register_login')
                        }
                    } else {
                        if (adminRoute && !user.isAdmin) {
                            this.props.history.push('/user/dashboard')

                        } else {

                            if (reload === false) {
                                this.props.history.push('/user/dashboard')
                            }
                        }
                    }

                    this.setState({ loading: false })
                })
        }

        render() {
            if (this.state.loading) {
                return (
                    <div className="main_loader">
                        <CircularProgress style={{ color: '#2196F3' }} thickness={7} />
                    </div>
                )
            }
            return (
                <div>
                    <ComposedClass {...this.props} user={this.props.user} />
                </div>
            )
        }
    }

    function mapStateToProps(state) {
        return {
            user: state.user
        }
    }

    return connect(mapStateToProps)(AuthenticationCheck)

}