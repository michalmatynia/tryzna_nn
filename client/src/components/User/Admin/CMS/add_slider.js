import React, { Component } from 'react';
import UserLayout from '../../../../hoc/user';

import FormField from '../../../utils/Form/formfield';
import { update, generateData, isFormValid, resetFields } from '../../../utils/Form/formActions';
import FileUpload from '../../../utils/Form/fileupload'


import { connect } from 'react-redux';
import { addSlide, clearSlide } from '../../../../redux/actions/cms_actions';

class addSlider extends Component {

    state = {
        formError: false,
        formSuccess: false,
        formdata: {
            lineOne: {
                element: 'input',
                value: '',
                config: {
                    label: 'Line One',
                    name: 'name_input',
                    type: 'text',
                    placeholder: 'Enter text for Line One'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: false

            },
            lineTwo: {
                element: 'input',
                value: '',
                config: {
                    label: 'Line Two',
                    name: 'name_input',
                    type: 'text',
                    placeholder: 'Enter text for Line Two'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: false

            },
            publish: {
                element: 'select',
                value: '',
                config: {
                    label: 'Publish',
                    name: 'publish_input',
                    options: [
                        { key: true, value: 'yes' },
                        { key: false, value: 'no' },
                    ]

                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true

            },
            images: {
                value: [],


                validation: {
                    required: false
                },
                valid: true,
                touched: false,
                validationMessage: '',
                showlabel: false

            }
        }
    }

    updateForm = (element) => {
        const newFormdata = update(element, this.state.formdata, 'add_slider');
        this.setState({
            formError: false,
            formdata: newFormdata
        })
    }

    resetFieldHandler = () => {

        const newFormData = resetFields(this.state.formdata, 'add_slider');

        this.setState({
            formdata: newFormData,
            formSuccess: true
        });
        setTimeout(() => {
            this.setState({
                formSuccess: false
            }, () => {
                this.props.dispatch(clearSlide('add_slider'))
            })
        }, 3000)
    }

    submitForm = (event) => {
        event.preventDefault();

        let dataToSubmit = generateData(this.state.formdata, 'add_slider');
        let formIsValid = isFormValid(this.state.formdata, 'add_slider');

        if (formIsValid) {
            this.props.dispatch(addSlider(dataToSubmit))
                .then(() => {
                    if (this.props.products.adminAddProduct.success) {
                        this.resetFieldHandler();
                    } else {
                        this.setState({ formError: true })
                    }
                })
        } else {
            this.setState({
                formError: true
            })

        }
    }

    imagesHandler = (images) => {
        const newFormData = {
            ...this.state.formdata
        }
        newFormData['images'].value = images;
        newFormData['images'].valid = true;

        this.setState({
            formdata: newFormData
        })
    }

    render() {
        return (
            <UserLayout>
<div>
                    <h1>Add slider</h1>
                    <form onSubmit={(event) => this.SubmitForm(event)}>
                        <FileUpload
                            imagesHandler={(images) => this.imagesHandler(images)}
                            reset={this.state.formSuccess}
                        />
                        <FormField
                            id={'lineOne'}
                            formdata={this.state.formdata.name}
                            change={(element) => this.updateForm(element)}
                        />
                        <FormField
                            id={'lineTwo'}
                            formdata={this.state.formdata.name}
                            change={(element) => this.updateForm(element)}
                        />
                        <div className="form_divider"></div>
                        <FormField
                            id={'publish'}
                            formdata={this.state.formdata.publish}
                            change={(element) => this.updateForm(element)}
                        />
                        {this.state.formSuccess ?
                            <div className="form_success">
                                Success
                        </div>
                            : null}


                        {this.state.formError ?
                            <div className="error_label">Please check your data</div>
                            : null}
                        <button onClick={(event) => this.submitForm(event)}>Add Slider</button>
                    </form>
                </div>
            </UserLayout>

        );
    }
}

export default addSlider;