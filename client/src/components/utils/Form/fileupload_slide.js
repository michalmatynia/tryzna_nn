import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import { act_uploadSlideImage, act_removeSlideImage } from '../../../redux/actions/slides_actions';


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
    
    
            this.props.dispatch(act_removeSlideImage(image_id, this.props.parent_id))
                .then(response => {
                    // console.log(response)
                    this.setState({
                        uploadedFiles: response.payload.images
                    }, () => {
                        this.props.imagesHandler(response.payload.images)
                    })
                })
        }
    
        showUploadedImages = () => (
    
            // console.log('Show Uploaded Images'),
            // console.log(this.state),
    
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
    
            // if (this.props.slides.slideDetail !== undefined) {
            //     entity_id = this.props.slides.slideDetail._id;
            // }

        this.props.dispatch(act_uploadSlideImage(formData, axiosconfig, this.props.parent_id))
            .then(response => {
                //console.log(this.state.uploadedFiles)
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
        if (props.reset) {
            return state = {
                uploadedFiles: []
            }
        }
        if (props.parent_id && props.slides.slideDetail !== undefined) {
            // console.log(props)
            return state = {
                // entity_id: props.slides.slideDetail._id
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