import React, { Component } from 'react'
import HomePromotion from './home_promotion';
import CardBlock from '../utils/card_block';
import BannerBlock from '../utils/Blocks/banner_block';

import { connect } from 'react-redux';
import { getProductsBySell, getProductsByArrival } from '../../redux/actions/products_actions';
import { act_getData_Slides } from '../../redux/actions/slides_actions';
class Home extends Component {

    state = {
        get_slides:
        {
            sortBy: 'createdAdd',
            order: 'desc',
            limit: '4',
            publish: true
        }
    }

    componentDidMount() {
        // console.log(this.props)

        this.props.dispatch(getProductsBySell());
        this.props.dispatch(getProductsByArrival());

        // Get Slides
        const args = this.state.get_slides
        this.props.dispatch(act_getData_Slides(args));
        // console.log(this.props.products)
    }

    render() {
        return (
            <div>
                <BannerBlock
                    list={this.props.slides.adminGetSlides}
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
