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
        // let type = 'remove'



        if (this.props.parent_id !== "") {
            this.props.dispatch(act_removeImage_Slide(image_id, this.props.parent_id))
                .then(response => {

                    this.props.removeImagesHandler(image_id)

                })
        } else {
            this.props.removeImagesHandler(image_id)

        }


    }
    showUploadedImages = () => {
        console.log('Show Images');

        console.log(this.props);

        let entityimages = {}

        this.props.parent_id !== "" ? entityimages = this.props.slides.slideDetail.images : entityimages = this.props.images_add.value

        console.log(entityimages);


        return (
            (this.props.slides.slideDetail !== undefined && this.props.slides.slideDetail !== "" && Object.keys(this.props.slides.slideDetail.images).length !== 0)
                || (Object.keys(this.props.images_add).length !== 0 && this.props.parent_id === "")
                ?
                entityimages.map(item => (
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


    }
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
                    this.props.addImagesHandler(response.payload)

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
                        {// console.log(this.props),
                            this.props.slides.slideDetail !== undefined || (Object.keys(this.props.images_add).length !== 0 && this.props.parent_id === "") ?
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