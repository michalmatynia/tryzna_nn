import React, { Component } from 'react';
import { act_getDetail_Logo_Published, act_clearDetail_Logo } from '../../../redux/actions/CMS/logo_actions';
import { connect } from 'react-redux';

// Context
import { LanguageContext } from '../../../hoc/Context/mycontext'

class Logo extends Component {

    state = {
        current_lg: '',
    }

    static contextType = LanguageContext;


    componentDidUpdate(prevProps, prevState) {
        if (this.context !== undefined) {
            if (this.context.value !== this.state.current_lg) {
                this.setState({ current_lg: this.context.value })
            } else if (this.context.value === this.state.current_lg
                && prevState.current_lg !== this.state.current_lg) {

               this.props.dispatch(act_getDetail_Logo_Published(this.state.current_lg))
            }
        }

    }
componentDidMount(){
    this.setState({ current_lg: this.props.user.siteLocalisation.value })
}
    componentWillUnmount() {
        this.props.dispatch(act_clearDetail_Logo())
    }


    renderLogo = () => {
        // console.log(this)
        if (this.props.logo.logoDetail !== undefined && this.props.logo.logoDetail.images.length > 0) {

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