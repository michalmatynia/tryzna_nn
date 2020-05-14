import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import { act_uploadImage_Slide, act_removeImage_Slide } from '../../../../redux/actions/CMS/slides_actions';
// import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import CircularProgrees from '@material-ui/core/CircularProgress';


class Fileupload extends Component {
    state = {
        uploading: false
    }


    // onRemove = (image_id) => {

    //     this.props.dispatch(act_removeImage_Slide(image_id, this.props.parent_id))
    //         .then(response => {

    //             console.log('inside REmove');
    //             console.log(response);

    //             let images = this.state.uploadedFiles.filter(item => {
    //                 return item.public_id !== image_id;
    //             })

    //             console.log(images)

    //             this.setState({
    //                 uploadedFiles: images
    //             }, () => {
    //                 this.props.imagesHandler(images)
    //             })
    //         })
    // }
    onRemove = (image_id) => {

        this.props.dispatch(act_removeImage_Slide(image_id, this.props.parent_id))
            .then(response => {

                this.props.imagesHandler()

            })
    }
    showUploadedImages = () => (

        // console.log('show uploaded'),
        // console.log(this.props),
        (this.props.slides.slideDetail !== undefined && this.props.slides.slideDetail !== "" && Object.keys(this.props.slides.slideDetail.images).length !== 0) ?
        this.props.slides.slideDetail.images.map(item => (
            <div className="dropzone_box"
                key={item.public_id}
            >

                <div
                    className="wrap"
                    style={{ background: `url(${item.url}) no-repeat` }}
                ><div className="delete_overlay">
                        <FontAwesomeIcon
                            icon={faTrash}
                            onClick={() => this.onRemove(item.public_id)}
                        />
                    </div>
                </div>
            </div>
        ))
        : null

    )
    onDrop = (files) => {

        console.log('run On Drop');
        console.log(files);

        this.setState({ uploading: true });
        let formData = new FormData();
        const axiosconfig = {
            header: { 'content-type': 'multipart/form-data' }
        }
        console.log(this.state);

        formData.append("file", files[0]);

        this.props.dispatch(act_uploadImage_Slide(formData, axiosconfig, this.props.parent_id))
            .then(response => {
                console.log('inside upload image');
               this.setState({
                    uploading: false
                }, () => {
                    console.log('Callback inside on Drop-SetState');

                    this.props.imagesHandler(response.payload)

                })

            })
    }
    // onDrop = (files) => {

    //     console.log('run On Drop');
    //     console.log(files);

    //     this.setState({ uploading: true });
    //     let formData = new FormData();
    //     const axiosconfig = {
    //         header: { 'content-type': 'multipart/form-data' }
    //     }
    //     console.log(this.state);

    //     formData.append("file", files[0]);

    //     this.props.dispatch(act_uploadImage_Slide(formData, axiosconfig, this.props.parent_id))
    //         .then(response => {
    //             console.log('inside upload image');

    //             this.setState({
    //                 uploadedFiles: [...this.state.uploadedFiles, response.payload],
    //                 uploading: false
    //             }, () => {
    //                 console.log('Callback inside on Drop-SetState');

    //                 this.props.imagesHandler(this.state.uploadedFiles)

    //             })
    //         })
    // }


    static getDerivedStateFromProps(props, state) {
        console.log('getDerived states from Props');
        console.log(props);
        console.log(state);

        // if (
        //     props.reset
        //     || (Object.keys(state.uploadedFiles).length === 0 && props.slides.slideDetail !== undefined && Object.keys(props.slides.slideDetail.images).length === 0)
        //     || (
        //         // (props.slides.slideDetail !== undefined && Object.keys(props.slides.slideDetail.images).length === 0)
        //         props.slides.slideDetail === '' && !props.parent_id
        //     )
        //     // || (Object.keys(state.uploadedFiles).length !== 0 && props.slides.slideDetail !== undefined && Object.keys(props.slides.slideDetail.images).length === 0)
        //     //(props.reset)

        // ) {
        //     console.log('INSIDE GDS RESET');

        //     return state = {
        //         uploadedFiles: []
        //     }
        // }
        // if (
        //     props.parent_id
        //     && (props.slides.slideDetail !== undefined || props.slides.slideDetail === '')
        //     && (
        //         (Object.keys(state.uploadedFiles).length !== 0 && Object.keys(props.slides.slideDetail.images) === 0)
        //         || (Object.keys(state.uploadedFiles).length === 0 && Object.keys(props.slides.slideDetail.images) !== 0)
        //     )
        // ) {

        //     console.log('INSIDE getDerivedStates');
        //     // console.log(props)

        //     return state = {
        //         uploadedFiles: props.slides.slideDetail.images,
        //     }
        // }

        return null
    }

    render() {
        return (
            <div>
                <section>
                    <div className="dropzone clear">
                        <Dropzone
                            onDrop={(e) => this.onDrop(e)}
                            className="dropzone_box"
                            multiple={false}
                        >
                            {({ getRootProps, getInputProps }) => (
                                <section >
                                    <div className="dropzone_box" {...getRootProps()}>
                                        <div className="wrap">
                                            <FontAwesomeIcon
                                                icon={faPlusCircle}

                                            />
                                            <input {...getInputProps()} />
                                        </div>
                                    </div>
                                </section>
                            )}
                        </Dropzone>
                        {
                            this.props.slides.slideDetail !== undefined ?
                        this.showUploadedImages() : null
                        }
                        {
                            this.state.uploading ?
                                <div className="dropzone_box" style={{
                                    textAlign: 'center',
                                    paddingTop: '60px'
                                }}>
                                    <CircularProgrees
                                        style={{ color: '#00bcd4' }}
                                        thickness={7}
                                    />
                                </div>

                                : null
                        }

                    </div>
                </section>

            </div>
        );
    }
}

const mapStateToProps = (state) => {

    return {
        slides: state.slides
    }
}

export default connect(mapStateToProps)(Fileupload);