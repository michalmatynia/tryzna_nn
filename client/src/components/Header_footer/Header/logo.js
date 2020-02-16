import React, { Component } from 'react';
import { act_getDetail_Logo_Published, act_clearDetail_Logo } from '../../../redux/actions/CMS/logo_actions';
import { connect } from 'react-redux';

class Logo extends Component {

    componentDidMount() {
        // const id = this.props.match.params.id;
        this.props.dispatch(act_getDetail_Logo_Published())
    }

    componentWillUnmount() {
        this.props.dispatch(act_clearDetail_Logo())
    }


    renderLogo = () => (
        console.log(this.props.site_lg)
    )


    render() {
        return (
            <div>
                {this.renderLogo()}
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        logo: state.logo
    }
}

export default connect(mapStateToProps)(Logo);