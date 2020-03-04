import React, { Component } from 'react'
import Header from '../components/Header_footer/Header';
import Footer from '../components/Header_footer/Footer';
import Home from '../components/Home/index';

// import { setCookie, setLocalisation } from '../redux/actions/user_actions';

import { connect } from 'react-redux';
import { getSiteData } from '../redux/actions/site_actions';

import { languages } from '../components/utils/Form/Fixed_categories/languages';

class Layout extends Component {

    state = {
        first_lg: 'en'
    }

    componentDidUpdate(prevProps) {

        if (Object.keys(this.props.site).length !== 0) {
            //  set default language
            let default_lg = ''

            default_lg = languages.filter(item => parseInt(this.props.site.siteData[0].default_language) === item.key)

            default_lg = (default_lg[0].value)
            //console.log(default_lg)

            if (
                this.props.user.siteLocalisation !== undefined
                && this.props.user.siteLocalisation.value !== undefined
                && prevProps.user.siteLocalisation !== undefined
                && prevProps.user.siteLocalisation.value !== undefined
            ) {

                if (prevProps.user.siteLocalisation.value !== this.props.user.siteLocalisation.value
                    || this.props.user.siteLocalisation.value !== this.state.first_lg
                ) {
                    this.setState({ first_lg: this.props.user.siteLocalisation.value })
                }
            }

        }

    }


    renderChildrenWithProps = () => (

        console.log(React.Children.map)
    )

    componentDidMount() {

        // const childrenWithProps = React.Children.map((item, i) =>
        // {console.log(item)} )
        // React.cloneElement(child, { doSomething: this.doSomething }
        // console.log(this.props.children)

        //     let elements = React.Children.toArray(this.props.children)
        //    elements = React.cloneElement(elements[0], { lala: 'Michallllfref' })


        if (Object.keys(this.props.site).length === 0) {
            this.props.dispatch(getSiteData())
        }
    }

    render() {
        return (
            <div>
                <Header />
                <div className="page_container">
                    {
                    this.props.children
                    /* {this.renderChildrenWithProps()} */}
                </div>
                <Footer data={this.props.site} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        site: state.site,
        user: state.user
    }
}


export default connect(mapStateToProps)(Layout);
