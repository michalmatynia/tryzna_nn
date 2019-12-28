import React, { Component } from 'react';
import UserLayout from '../../../hoc/user';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import CircularProgrees from '@material-ui/core/CircularProgress';

class AddFile extends Component {

    state = {
        formSuccess: false,
        formError: false,
        uploading: false,
        files: []
    }

    onDrop(files) {
        this.setState({uploading: true})
        let formData = new FormData();
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }

        formData.append("file", files[0]);

        axios.post('/api/user/uploadfile', formData, config)
        .then(response=>{
            if(response.data.success){
                this.setState({
                    formSuccess:true,
                    formError:false,
                    uploading:false
                }, ()=>{
                    setTimeout(()=>{
                        this.setState({formSuccess: false})
                    }, 2000)
                })
            }
        })
    }

componentDidMount(){
    axios.get('/api/user/admin_files')
    .then(response=>{
        this.setState({
            files:response.data
        })
    })
}

showFileList = () => (
    this.state.files ?
    this.state.files.map((item, i)=> (
        <li key={i}>
            <Link to={`/api/user/download/${item}`} target="_blank">
            {item}
            </Link>
        </li>
    ))
    :null
)

    render() {
        return (
            <UserLayout>
                <h1>Upload file</h1>
                <div>
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
                <div style={{clear:'both'}}>
                    {
                        this.state.formSuccess ?
                        <div className="form_success">Success</div>
                        :null
                    }
                    {this.state.formError ?
                    <div className="error_label">Please check your data</div> 
                    :''
                }
                </div>
                <hr/>
                <div>
                    <ul>
                        {this.showFileList()}
                    </ul>
                </div>
                </div>
            </UserLayout>
        );
    }
}

export default AddFile;