import React, { Component } from 'react'
import Header from '../components/Header_footer/Header';
import Footer from '../components/Header_footer/Footer';

// import { setCookie, setLocalisation } from '../redux/actions/user_actions';

import { connect } from 'react-redux';
import { getSiteData } from '../redux/actions/site_actions';

import { languages } from '../components/utils/Form/Fixed_categories/languages';

import { LanguageContext } from './Context/mycontext'


class Layout extends Component {

    state = {
        first_lg: 'en'
    }

    componentDidUpdate(prevProps) {

        

        if (Object.keys(this.props.site).length !== 0) {

            // console.log(this.props.user)
            let default_lg = ''

            default_lg = languages.filter(item => parseInt(this.props.site.siteData[0].default_language) === item.key)
            default_lg = (default_lg[0].value)

            if (
                (this.props.user.siteLocalisation !== undefined
                    && this.props.user.siteLocalisation.value !== undefined
                )
                //  && prevProps.user.siteLocalisation !== undefined
                //  && prevProps.user.siteLocalisation.value !== undefined
                // && ( prevProps.user.siteLocalisation.value !== this.props.user.siteLocalisation.value
                //  || this.props.user.siteLocalisation.value !== this.state.first_lg )
            ) {

                console.log('HOC PHASE II')
                console.log(this.state.first_lg)

                if ((
                    prevProps.user.siteLocalisation !== undefined
                    && prevProps.user.siteLocalisation.value !== undefined
                    && prevProps.user.siteLocalisation.value !== this.props.user.siteLocalisation.value
                ) || (
                        this.props.user.siteLocalisation.value !== this.state.first_lg)
                ) {
                    this.setState({ first_lg: this.props.user.siteLocalisation.value })
                } else if (this.props.user.siteLocalisation.value === '') {
                    this.setState({ first_lg: default_lg })

                }
            }

        }

    }
    componentDidMount() {
        console.log('HOC PHASE I')

        if (Object.keys(this.props.site).length === 0) {
            this.props.dispatch(getSiteData())
        }
    }

    render() {
        return (
            <LanguageContext.Provider value={'en'}>
                <div>
                    <Header />
                    <div className="page_container">
                        {this.props.children}
                    </div>
                    <Footer data={this.props.site} />
                </div>
            </LanguageContext.Provider>
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
