import React, { Component } from 'react';
import UserLayout from '../../../../../hoc/user';
import ListSlidesBlock from '../Slides/list_slides_block';

import { connect } from 'react-redux';
import { act_listSlides, act_removeItem_Slide, act_setVisible_Slide } from '../../../../../redux/actions/CMS/slides_actions';

class ListSlides extends Component {

    state = {
        get_slides:
        {
            sortBy: 'createdAdd',
            order: 'desc',
            limit: '10'
        }
    }

    componentDidMount() {

        const args = this.state.get_slides
        this.props.dispatch(act_listSlides(args));

    }

    removeSlideFromDb = (id) => {

        // console.log(id)
        this.props.dispatch(act_removeItem_Slide(id))

    }

    handlePublish = (id, checked) => {

        // console.log(checked)
        this.props.dispatch(act_setVisible_Slide(id, checked))

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
                            removeItem={(id) => this.removeSlideFromDb(id)}
                            handlePublish={(id, checked) => this.handlePublish(id, checked)}
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