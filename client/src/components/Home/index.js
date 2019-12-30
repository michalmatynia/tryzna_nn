import React, { Component } from 'react'
// import HomeSlider from './home_slider';
import HomePromotion from './home_promotion';
import CardBlock from '../utils/card_block';
import BannerBlock from '../utils/Blocks/banner_block';

import { connect } from 'react-redux';
import { getProductsBySell, getProductsByArrival } from '../../redux/actions/products_actions';
import { act_getSlidesByArrival } from '../../redux/actions/slides_actions';
class Home extends Component {

    componentDidMount() {
        // console.log(this.props)

        this.props.dispatch(getProductsBySell());
        this.props.dispatch(getProductsByArrival());

        // Get Slides
        
        this.props.dispatch(act_getSlidesByArrival());
        // console.log(this.props.products)
    }

    render() {
        return (
            <div>
                <BannerBlock
                list={this.props.slides.byArrival}
                title="Banner"
                />
                <CardBlock
                    list={this.props.products.bySell}
                    title="Best selling guitars"
                />
                <HomePromotion />
                <CardBlock
                    list={this.props.products.byArrival}
                    title="New Arrivals"
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products,
        slides: state.slides
    }
}

export default connect(mapStateToProps)(Home);
