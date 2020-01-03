import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import CircularProgrees from '@material-ui/core/CircularProgress';

class Fileupload extends Component {
    state = {
        uploadedFiles: [],
        uploading: false,
    }


    onRemove = (image_id, entity_id) => {
        // console.log(id)
        axios.get(`/api/slide/removeimage?public_id=${image_id}&entity_id=${entity_id}`)
            .then(response => {

                this.setState({
                    uploadedFiles: response.data.images
                }, () => {
                    this.props.imagesHandler(response.data.images)
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
                            onClick={() => this.onRemove(item.public_id, this.props.list._id)}
                        />
                    </div>
                </div>
            </div>
        ))

    )

    onDrop = (files) => {
        this.setState({ uploading: true });
        let formData = new FormData();
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }

        formData.append("file", files[0]);

        axios.post('/api/users/uploadimage', formData, config)
            .then(response => {

                this.setState({
                    uploading: false,
                    uploadedFiles: [
                        ...this.state.uploadedFiles,
                        response.data
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
        if (props.list) {
            return state = {
                uploadedFiles: props.list.images,
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

export default Fileupload;