import React, { Component } from 'react'
// import HomePromotion from './home_promotion';
// import CardBlock from '../utils/card_block';
import BannerBlock from '../utils/Blocks/banner_block';
import Desc from '../Description';

import { connect } from 'react-redux';
import { getProductsBySell, getProductsByArrival } from '../../redux/actions/products_actions';
import { act_getData_Slides } from '../../redux/actions/slides_actions';
import { act_getDetail_Desc } from '../../redux/actions/desc_actions';

class Home extends Component {

    state = {
        onepage_lg: 'en',
        get_slides:
        {
            sortBy: 'createdAdd',
            order: 'desc',
            limit: '4',
            publish: true
        }
    }

    componentDidUpdate(prevProps) {
        // console.log(prevProps)
        // console.log(this.props)
        if (
            this.props.user.siteLocalisation !== undefined
            && this.props.user.siteLocalisation.name !== undefined
            && prevProps.user.siteLocalisation !== undefined
            && prevProps.user.siteLocalisation.name !== undefined
            && this.props.description !== undefined
            // && this.props.description.descDetail !== undefined
        ) {

            if (prevProps.user.siteLocalisation.name !== this.props.user.siteLocalisation.name 
                || this.props.user.siteLocalisation.name !== this.state.onepage_lg
                ) {
                // console.log(this.props.user.siteLocalisation.name)
                this.setState({ onepage_lg: this.props.user.siteLocalisation.name })

                this.props.dispatch(act_getDetail_Desc(this.props.user.siteLocalisation.name))
            } 
        }

    }

    componentDidMount() {
        // console.log(this.props.user.siteLocalisation.name)

        this.props.dispatch(getProductsBySell());
        this.props.dispatch(getProductsByArrival());

        // Get Slides
        const args = this.state.get_slides
        this.props.dispatch(act_getData_Slides(args));
        // console.log(this.props.products)

        this.props.dispatch(act_getDetail_Desc(this.state.onepage_lg));
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
