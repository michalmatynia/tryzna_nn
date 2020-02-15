import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserLayout from '../../../../../hoc/user';

import FormField from '../../../../utils/Form/formfield';
import { update, generateData, isFormValid, resetFields } from '../../../../utils/Form/formActions';
import FileUpload from '../../../../utils/Form/CMS/fileupload_slide'

import { act_addSlide, act_clearSlide } from '../../../../../redux/actions/CMS/slides_actions';

class AddSlide extends Component {

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
                    required: false
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
                    required: false
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

    updateFields = (newFormData) => {
        this.setState({
            formdata: newFormData
        })
    }

    updateForm = (element) => {
        const newFormdata = update(element, this.state.formdata, 'slides');
        this.setState({
            formError: false,
            formdata: newFormdata
        })
    }

    resetFieldHandler = () => {

        const newFormData = resetFields(this.state.formdata, 'slides');

        this.setState({
            formdata: newFormData,
            formSuccess: true
        });
        setTimeout(() => {
            this.setState({
                formSuccess: false
            }, () => {
                this.props.dispatch(act_clearSlide('slides'))
            })
        }, 3000)
    }

    submitForm = (event) => {
        event.preventDefault();

        let dataToSubmit = generateData(this.state.formdata, 'slides');
        let formIsValid = isFormValid(this.state.formdata, 'slides');

        if (formIsValid) {
            this.props.dispatch(act_addSlide(dataToSubmit))
                .then(() => {
                    if (this.props.slides.adminAddSlide.success) {
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
                    <h1>Add slides</h1>
                    <form onSubmit={(event) => this.SubmitForm(event)}>
                        <FileUpload
                            imagesHandler={(images) => this.imagesHandler(images)}
                            reset={this.state.formSuccess}
                            parent_id = ''
                        />
                        <FormField
                            id={'lineOne'}
                            formdata={this.state.formdata.lineOne}
                            change={(element) => this.updateForm(element)}
                        />
                        <FormField
                            id={'lineTwo'}
                            formdata={this.state.formdata.lineTwo}
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
                        <button onClick={(event) => this.submitForm(event)}>Add Slide</button>
                    </form>
                </div>
            </UserLayout>

        );
    }
}

const mapStateToProps = (state) => {

    return {
        slides: state.slides
    }
}

export default connect(mapStateToProps)(AddSlide);