import React, { Component } from 'react';
import axios from 'axios';

import FormField from '../utils/Form/formfield';
import { update, generateData, isFormValid } from '../utils/Form/formActions';

class ResetUser extends Component {

    state = {
        formError: false,
        formSuccess: false,
        formErrorMessage: '',
        formdata: {
            email: {
                element: 'input',
                value: '',
                config: {
                    name: 'email_input',
                    type: 'email',
                    placeholder: 'Enter your email'
                },
                validation: {
                    required: true,
                    email: true
                },
                valid: false,
                touched: false,
                validationMessage: ''

            }
        }
    }


    submitForm = (event) => {
        event.preventDefault();

        let dataToSubmit = generateData(this.state.formdata, 'reset_email');
        let formIsValid = isFormValid(this.state.formdata, 'reset_email');

        if (formIsValid) {
            axios.post('/api/user/reset_user', dataToSubmit)
            .then(response=>{
                if(response.data.success){
                    this.setState({
                        formSuccess:true
                    })
                } else {
                    this.setState({
                        formError: true,
                        formErrorMessage: response.data.message
                    })
        
                }
            })
        } else {
            this.setState({
                formError: true,
            })

        }
    }

    updateForm = (element) => {
        const newFormdata = update(element, this.state.formdata, 'reset_email');
        this.setState({
            formError: false,
            formdata: newFormdata
        })
    }

    render() {
        return (
            <div className="container">
                <h1>Reset passwords</h1>
                <form onSubmit={(event) => this.submitForm()}>
                    <FormField
                        id={'email'}
                        formdata={this.state.formdata.email}
                        change={(element) => this.updateForm(element)}
                    />
                    {this.state.formSuccess ?
                    <div className="form_success">
                        Done, check your email
                    </div>
                    :null

                    }
                    {this.state.formError ?
                        <div className="error_label">{this.state.formErrorMessage}</div>
                        : null}
                    <button onClick={(event) => this.submitForm(event)}>Send email to reset password</button>
                </form>
            </div>
        );
    }
}

export default ResetUser;