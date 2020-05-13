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
        uploadedFiles: [],
        uploading: false
    }

    
        onRemove = (image_id) => {

            this.props.dispatch(act_removeImage_Slide(image_id, this.props.parent_id))
                .then(response => {
                    
                    let images = this.state.uploadedFiles.filter(item => {
                        return item.public_id !== image_id;
                    })
  
                    this.setState({
                        uploadedFiles: images
                    }, () => {
                        this.props.imagesHandler(images)
                    })
                })
        }
    
        showUploadedImages = () => (

            this.state.uploadedFiles.map(item => (
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
    
        )
    
        onDrop = (files) => {

            this.setState({ uploading: true });
            let formData = new FormData();
            const axiosconfig = {
                header: { 'content-type': 'multipart/form-data' }
            }
    
            formData.append("file", files[0]);

        this.props.dispatch(act_uploadImage_Slide(formData, axiosconfig, this.props.parent_id))
            .then(response => {

                this.setState({
                    uploading: false,
                    uploadedFiles: [
                        ...this.state.uploadedFiles,
                        response.payload
                    ]
                }, () => {
                    this.props.imagesHandler(this.state.uploadedFiles)
                })
            })
    }

    static getDerivedStateFromProps(props, state) {
        if (
            (props.reset ) 
        ) {
            return state = {
                uploadedFiles: []
            }
        }
        if (props.parent_id && (props.slides.slideDetail !== undefined || props.slides.slideDetail === '')) {

            return state = {
                uploadedFiles: props.slides.slideDetail.images,
            }
        }

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
                        {this.showUploadedImages()}
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