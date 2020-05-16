import React, { Component } from 'react';
import UserLayout from '../../../../../hoc/user';
import ListSlidesBlock from '../Slides/list_slides_block';

import { connect } from 'react-redux';
import { act_listSlides, act_removeItem_Slide, act_setVisible_Slide, act_clearList, act_clearDetail } from '../../../../../redux/actions/CMS/slides_actions';

class ListSlides extends Component {

    state = {

    }

    componentDidUpdate(prevProps, prevState) {
        
        if ((

            this.props.user.siteLocalisation !== undefined
            && prevProps.user.siteLocalisation === undefined
        ) || (
                this.props.user.siteLocalisation !== undefined
                && prevProps.user.siteLocalisation !== undefined
                && prevProps.user.siteLocalisation.value !== this.props.user.siteLocalisation.value

            )) {

            this.props.dispatch(act_listSlides(this.props.user.siteLocalisation.value))

        }

    }

    componentDidMount() {

        if (
            this.props.user.siteLocalisation !== undefined
        ) {
            this.props.dispatch(act_listSlides(this.props.user.siteLocalisation.value))
        }
    }

    componentWillUnmount() {
        this.props.dispatch(act_clearList('slides'))
        this.props.dispatch(act_clearDetail('slides'))

    }

    removeEntityFromDb = (id) => {
        // console.log('Remooou');

        // Check if remove is repositioning
        let args = {}

        this.props.dispatch(act_removeItem_Slide(id))
            .then(response => {
                
                this.props.dispatch(act_listSlides(this.props.user.siteLocalisation.value, args))
                .then(response2 => {
  
                    
                })
            })

    }

    handleVisible = (id, checked) => {
        let args = {}
        args['_id'] = id
        args['checked'] = checked

        this.props.dispatch(act_setVisible_Slide(this.props.user.siteLocalisation.value, args))

    }

    render() {
        return (
            <UserLayout>
                <div>
                    <h1>List Slides</h1>
                    <div className="user_cart">
                        <ListSlidesBlock
                            type="cart"
                            list={this.props.slides.adminGetSlides}
                            removeItem={(id) => this.removeEntityFromDb(id)}
                            handleVisible={(id, checked) => this.handleVisible(id, checked)}
                        />
                    </div>
                </div>
            </UserLayout>

        );
    }

}

const mapStateToProps = (state) => {
    return {
        slides: state.slides
    }
}

export default connect(mapStateToProps)(ListSlides);