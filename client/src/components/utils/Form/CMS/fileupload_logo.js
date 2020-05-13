import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import { act_uploadImage_Logo, act_removeImage_Logo } from '../../../../redux/actions/CMS/logo_actions';
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

        this.props.dispatch(act_removeImage_Logo(image_id))
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
        console.log('in Drop');
        
        console.log(this.props)

        this.setState({ uploading: true });
        let formData = new FormData();
        const axiosconfig = {
            header: { 'content-type': 'multipart/form-data' }
        }

        formData.append("file", files[0]);

        this.props.dispatch(act_uploadImage_Logo(formData, axiosconfig))
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
        // console.log('FileUpload-Get Derived State')
        // console.log(state)
        // console.log(props)

        if (
            (props.reset || (props.logo.logoDetail === '' || props.logo.logoDetail === undefined))
        ) {
            return state = {
                uploadedFiles: []
            }
        } else if (props.logo.logoDetail !== undefined) {
            return state = {
                uploadedFiles: props.logo.logoDetail.images,
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
        logo: state.logo
    }
}

export default connect(mapStateToProps)(Fileupload);