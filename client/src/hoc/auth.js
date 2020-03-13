import React, { Component } from 'react'
import { connect } from 'react-redux';
import { auth, setCookie, setLocalisation } from '../redux/actions/user_actions';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function (ComposedClass, reload, adminRoute = null) {

    class AuthenticationCheck extends Component {

        state = {
            loading: true
        }

        componentDidUpdate(prevProps) {

            if (
                this.props.user.siteLocalisation !== undefined
                && this.props.user.siteLocalisation !== prevProps.user.siteLocalisation
            ) {
                console.log('Component Did update - If siteLocalisation')
                console.log(this.props.user.siteLocalisation)

                this.props.dispatch(setLocalisation(this.props.user.siteLocalisation.value))
            }
        }

        componentDidMount() {

            let user_lg = null
            // let user_currency = null
            if (this.props.user.siteLocalisation === undefined) {
                this.props.dispatch(setCookie())
                    .then(response => {
                        console.log('if Localisation is undefined')
                        console.log('Auth Dispatch')
                        console.log(response)


                        if (response.payload) {
                            user_lg = response.payload.languages
                            // user_currency = response.payload.currency

                        } else {
                            user_lg = 'en';
                            // user_currency = 'EUR'
                        }

                        this.props.dispatch(setLocalisation(user_lg))


                    })

            } else {

                console.log('Localisation is defined - Auth')
                console.log(this.props.user.siteLocalisation)

                this.props.dispatch(setLocalisation(this.props.user.siteLocalisation.value))
            }


            // ---------

            this.props.dispatch(auth())
                .then(response => {
                    let user = this.props.user.userData;
                    if (!user.isAuth) {

                        console.log('no user is Auth')
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