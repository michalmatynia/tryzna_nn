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
        console.log(this.props)
        if (this.context !== undefined) {
            if (this.context.value !== this.state.current_lg) {
                this.setState({ current_lg: this.context.value })
            } else if (this.context.value === this.state.current_lg
                && prevState.current_lg !== this.state.current_lg) {

               // this.props.dispatch(act_getDetail_Logo_Published(this.state.current_lg))
            }
        }

    }
    componentDidMount() {
        // this.props.dispatch(act_getDetail_Logo_Published(this.props.current_lg))
    }

    componentWillUnmount() {
        this.props.dispatch(act_clearDetail_Logo())
    }


    renderLogo = () => (
        <div>
            test
        </div>
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
        logo: state.logo,
        user: state.user
    }
}

export default connect(mapStateToProps)(Logo);