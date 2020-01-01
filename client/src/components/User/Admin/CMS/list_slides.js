import React, { Component } from 'react';
import UserLayout from '../../../../hoc/user';
import ListSlidesBlock from '../CMS/list_slides_block';

// import { connect } from 'react-redux';
// import { getCartItems, removeCartItem, onSuccessBuy } from '../../redux/actions/user_actions';


// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFrown } from '@fortawesome/free-solid-svg-icons';
// import { faSmile } from '@fortawesome/free-solid-svg-icons';

import { connect } from 'react-redux';
import { act_getSlides, act_removeSlideItem } from '../../../../redux/actions/slides_actions';

class ListSlides extends Component {

    state = {
        get_slides:
        {
            sortBy: 'createdAdd',
            order: 'desc',
            limit: '10'        }
    }

    componentDidMount() {

        const args = this.state.get_slides
        this.props.dispatch(act_getSlides(args));
        
    }

    removeSlideFromDb = (id) => {

        console.log('refrefre')
        this.props.dispatch(act_removeSlideItem(id))
        .then(()=>{})
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
                        removeItem={(id)=> this.removeSlideFromDb(id)}
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