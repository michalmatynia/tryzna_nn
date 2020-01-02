import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import CircularProgrees from '@material-ui/core/CircularProgress';

class Fileupload extends Component {
    state = {
        uploadedFiles: [],
        uploading: false,
    }

getImagesFromProps = () => {
console.log('fewf')
    if (this.props.list) {
        let images = this.props.list.images

        this.setState({
            uploadedFiles: images
        }, () => {
            this.props.imagesHandler(images)
        })
    }
}



    onRemove = (id) => {
        axios.get(`/api/users/removeimage?public_id=${id}`)
            .then(response => {
                let images = this.state.uploadedFiles.filter(item => {
                    return item.public_id !== id;
                })

                this.setState({
                    uploadedFiles: images
                }, () => {
                    this.props.imagesHandler(images)
                })
            })
    }

nestedFunctions = () => {
    this.getImagesFromProps(),
    this.showUploadedImages()
}

    showUploadedImages = () => (
        // ({ length: lengthFooBArX }) => lengthFooBArX);
        // console.log(this.props.list),
        // this.getImagesFromProps(),
        
        
        this.state.uploadedFiles.map(item => (
            <div className="dropzone_box"
                key={item.public_id}
                onClick={() => this.onRemove(item.public_id)}
            >
                <div
                    className="wrap"
                    style={{ background: `url(${item.url}) no-repeat` }}
                >

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

                // console.log(response.data)

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
    if(props.reset){
        return state = {
            uploadedFiles:[]
        }
    }
    return null
}

static getImagesFromProps(){

    console.log('fewf')


    // if (this.props.list) {
    //     let images = this.props.list.images

    //     this.setState({
    //         uploadedFiles: images
    //     }, () => {
    //         this.props.imagesHandler(images)
    //     })
    // }
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
                        {this.nestedFunctions()}
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