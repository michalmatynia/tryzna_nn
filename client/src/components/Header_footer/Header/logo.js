import React, { Component } from 'react';
import { act_getDetail_Logo_Published, act_clearDetail_Logo } from '../../../redux/actions/CMS/logo_actions';
import { connect } from 'react-redux';

// Context

class Logo extends Component {

    state = {
    }

    componentDidUpdate(prevProps, prevState) {

        if ((
            this.props.user.siteLocalisation !== undefined
            && this.props.user.siteLocalisation !== prevProps.user.siteLocalisation
        )) {
            let args = {}
            args['visible'] = true
            this.props.dispatch(act_getDetail_by_Args_Logo(this.props.user.siteLocalisation, args))
        }

    }

    componentDidMount() {

        if (
            this.props.user.siteLocalisation !== undefined
        ) {

            let args = {}
            args['visible'] = true
            this.props.dispatch(act_getDetail_by_Args_Logo(this.props.user.siteLocalisation, args))
        }

    }

    componentWillUnmount() {
        this.props.dispatch(act_clearDetail('logo'))
    }


    renderLogo = () => {
        if (
            this.props.logo.logoDetail !== undefined
            && this.props.logo.logoDetail.images !== undefined
            && this.props.logo.logoDetail.images.length > 0) {
                

            return this.props.logo.logoDetail.images[0].url

        } else {

            return '/images/image_not_availble.png'
        }
    }

    renderLogoLine = () => {
        if (this.props.logo.logoDetail !== undefined) {

            return this.props.logo.logoDetail.lineOne

        }
    }


    render() {
        return (
            <div className="featured_image"
                style={{
                    background: `url(${this.renderLogo()}) no-repeat`,
                    height: `60px`

                }}>{this.renderLogoLine()}</div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        logo: state.logo,
        user: state.user
    }
}

export default connect(mapStateToProps)(Logo);