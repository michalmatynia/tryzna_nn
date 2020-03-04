import React, { Component } from 'react'
// import HomePromotion from './home_promotion';
// import CardBlock from '../utils/card_block';
import BannerBlock from '../utils/Blocks/banner_block';
import Desc from '../Description';

import { connect } from 'react-redux';
import { getProductsBySell, getProductsByArrival } from '../../redux/actions/products_actions';
import { act_getData_Slides } from '../../redux/actions/CMS/slides_actions';
import { act_getDetail_Desc_Published } from '../../redux/actions/CMS/desc_actions';

// Context
import { LanguageContext } from '../../hoc/Context/mycontext'

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

    static contextType = LanguageContext;


    componentDidUpdate(prevProps, prevState) {
        

        
        if (this.context !== undefined
            && this.context.value !== undefined
            && Object.keys(this.context).length !== 0) {

               //  console.log(this.context)

            if (this.context.value !== this.state.current_lg) {
                this.setState({ current_lg: this.context.value })
            } else if (this.context.value === this.state.current_lg
                && prevState.current_lg !== this.state.current_lg) {
              // console.log(prevState.current_lg)

               //console.log(this.state.current_lg)
                this.props.dispatch(act_getDetail_Desc_Published(this.props.user.siteLocalisation.value, this.state.current_lg))
            }
        }

        
        
        

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
        if (this.context !== undefined
            && this.context.value !== undefined
            && Object.keys(this.context).length !== 0) {
            
            }

        this.props.dispatch(getProductsBySell());
        this.props.dispatch(getProductsByArrival());

        // Get Slides
        const args = this.state.get_slides
        this.props.dispatch(act_getData_Slides(args));
        // console.log(this.props.products)
        // if (this.props.user.siteLocalisation !== undefined && this.props.user.siteLocalisation.value !== undefined) {
        //     this.props.dispatch(act_getDetail_Desc_Published(this.props.user.siteLocalisation.value, this.state.default_lg));
        // }

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
