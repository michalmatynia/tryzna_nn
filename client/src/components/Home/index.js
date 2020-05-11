import React, { Component } from 'react'
// import HomePromotion from './home_promotion';
// import CardBlock from '../utils/card_block';
import BannerBlock from '../utils/Blocks/banner_block';
import Desc from '../Description';

import { connect } from 'react-redux';
import { getProductsBySell, getProductsByArrival } from '../../redux/actions/products_actions';
import { act_listSlides } from '../../redux/actions/CMS/slides_actions';
import { act_getDetail_by_Args_Desc } from '../../redux/actions/CMS/desc_actions';

// Context

class Home extends Component {

    state = {
        current_lg: '',
        get_slides:
        {
            sortBy: 'createdAdd',
            order: 'desc',
            limit: '4',
            publish: true
        }
    }

    componentDidUpdate(prevProps, prevState) {

        if (
            this.props.user.siteLocalisation !== undefined
            // && this.props.logo.logoDetail !== undefined
            // && prevProps.logo.logoDetail !== undefined
            && this.props.user.siteLocalisation !== prevProps.user.siteLocalisation
            // && Object.keys(this.props.logo.logoDetail).length > 0
        ) {
            let args = {}
            if (this.props.slides.slideDetail !== undefined) {
                args = {}
                args['sortBy'] = 'createdAdd'
                args['order'] = 'desc'
                args['limit'] = 4
                args['visible'] = true
                this.props.dispatch(act_listSlides(this.props.user.siteLocalisation.value, args));
            }

            if (this.props.description.descDetail !== undefined) {
                args = {}
                args['visible'] = true
                this.props.dispatch(act_getDetail_by_Args_Desc(this.props.user.siteLocalisation.value, args))
            }
        }
    }


    componentDidMount() {


        this.props.dispatch(getProductsBySell());
        this.props.dispatch(getProductsByArrival());

        if (
            this.props.user.siteLocalisation !== undefined
        ) {

            let args = {}
            args['sortBy'] = 'createdAdd'
            args['order'] = 'desc'
            args['limit'] = 4
            args['visible'] = true
            this.props.dispatch(act_listSlides(this.props.user.siteLocalisation.value, args));
            args = {}
            args['visible'] = true
            this.props.dispatch(act_getDetail_by_Args_Desc(this.props.user.siteLocalisation.value, args))
        }
        // Get Slides
    }

    render() {
        return (
            <div>
                <BannerBlock
                    list={this.props.slides.adminGetSlides}
                    title="Banner"
                />
                <Desc
                    {...this.props.description.descDetail} />
                {/* <CardBlock
                    list={this.props.products.bySell}
                    title="Best selling guitars"
                />
                <HomePromotion />
                <CardBlock
                    list={this.props.products.byArrival}
                    title="New Arrivals"
                /> */}
            </div>
        )
    }
}

const mapStateToProps = (state) => {

    return {
        products: state.products,
        slides: state.slides,
        description: state.description,
    }
}

export default connect(mapStateToProps)(Home);
