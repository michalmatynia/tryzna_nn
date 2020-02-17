import React, { Component } from 'react'
// import HomePromotion from './home_promotion';
// import CardBlock from '../utils/card_block';
import BannerBlock from '../utils/Blocks/banner_block';
import Desc from '../Description';

import { connect } from 'react-redux';
import { getProductsBySell, getProductsByArrival } from '../../redux/actions/products_actions';
import { act_getData_Slides } from '../../redux/actions/CMS/slides_actions';
import { act_getDetail_Desc_Published } from '../../redux/actions/CMS/desc_actions';

class Home extends Component {

    state = {
        first_lg: 'en',
        default_lg: 'en',
        get_slides:
        {
            sortBy: 'createdAdd',
            order: 'desc',
            limit: '4',
            publish: true
        }
    }

    componentDidUpdate(prevProps) {
        // // console.log(this.props)
        // if (
        //     this.props.user.siteLocalisation !== undefined
        //     && this.props.user.siteLocalisation.value !== undefined
        //     && prevProps.user.siteLocalisation !== undefined
        //     && prevProps.user.siteLocalisation.value !== undefined
        //     // && this.props.description !== undefined
        // ) {

        //     if (prevProps.user.siteLocalisation.value !== this.props.user.siteLocalisation.value
        //         || this.props.user.siteLocalisation.value !== this.state.first_lg
        //     ) {
        //         this.setState({ first_lg: this.props.user.siteLocalisation.value })
        //         this.props.dispatch(act_getDetail_Desc_Published(this.props.user.siteLocalisation.value, this.state.default_lg))
        //     }
        // }

    }

    componentDidMount() {
console.log(this.props)
        this.props.dispatch(getProductsBySell());
        this.props.dispatch(getProductsByArrival());

        // Get Slides
        const args = this.state.get_slides
        this.props.dispatch(act_getData_Slides(args));
        // console.log(this.props.products)
        if (this.props.user.siteLocalisation !== undefined && this.props.user.siteLocalisation.value !== undefined ) {
            this.props.dispatch(act_getDetail_Desc_Published(this.props.user.siteLocalisation.value, this.state.default_lg));
        }

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
