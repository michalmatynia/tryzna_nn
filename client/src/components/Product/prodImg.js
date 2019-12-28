import React, { Component } from 'react';
// import ImageModalBox from '../utils/lightbox';
import Carousel, { Modal, ModalGateway } from 'react-images';

class ProdImg extends Component {

    state = {
        modalIsOpen: false,
        imagePos: 0,
        modalboxImages: [],
        urlImages: []
    }

    componentDidMount() {
        if (this.props.detail.images.length > 0) {
            let urlImages = [];
            this.props.detail.images.forEach(item => {
                urlImages.push(item.url)

            })
            this.setState({
                urlImages
            })
        }
    }



    toggleModal = () => {
        if (this.props.detail.images.length > 0) {
            let modalboxImages = [];
            this.state.urlImages.forEach(element => {
                modalboxImages.push({ src: `${element}` })

            });
            this.setState({
                modalIsOpen: !this.state.modalIsOpen,
                modalboxImages
            })

        } 

    };

    showThumbs = () => (
        this.state.urlImages.map((item, i) => (
            i > 0 ?
                <div
                    key={i}
                    onClick={() => this.toggleModal(i)}
                    className="thumb"
                    style={{ background: `url(${item}) no-repeat` }}
                >

                </div>
                : null
        )
        )
    )

    renderCardImage = (images) => {
        if (images.length > 0) {
            return images[0].url
        } else {
            return '/images/image_not_availble.png'
        }

    }

    render() {


        const { detail } = this.props;
        return (
            <div className="product_image_container">
                <div className="main_pic">
                    <div
                        style={{ background: `url(${this.renderCardImage(detail.images)}) no-repeat` }}
                        onClick={() => this.toggleModal()}
                    >

                    </div>
                </div>
                <div className="main_thumbs">
                    {this.showThumbs(detail)}

                </div>
                <ModalGateway>
                {this.state.modalIsOpen ? (
                    <Modal onClose={this.toggleModal}>
                        <Carousel
                        views={this.state.modalboxImages}
                         />
                    </Modal>
                ) : null}
            </ModalGateway>
            </div>
        );
    }
}

export default ProdImg;