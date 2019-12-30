import React, { Component } from 'react';

class Banner extends Component {

    renderBannerImage(images) {
        // console.log(this)
        if (images.length > 0) {

            return images[0].url

        } else {

            return '/images/image_not_availble.png'
        }
    }

    render() {
        const props = this.props;
        return (
                    <div className="featured_image"
                        style={{
                            background: `url(${this.renderBannerImage(props.images)}) no-repeat`,
                            height: `${window.innerHeight}px`

                        }}>
                        <div className="featured_action">
                            <div className="tag title">{props.lineOne}</div>
                            <div className="tag title">{props.lineTwo}</div>
                        </div>

                    </div>
        );
    }
}



export default Banner;