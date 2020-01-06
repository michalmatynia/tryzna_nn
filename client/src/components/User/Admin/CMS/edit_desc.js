import React, { Component } from 'react';
import UserLayout from '../../../../hoc/user';

import FormField from '../../../utils/Form/formfield';
import { update, generateData, isFormValid, populateFields } from '../../../utils/Form/formActions';

import { connect } from 'react-redux';

import { act_getDetail_Desc, act_updateDetail_Desc } from '../../../../redux/actions/desc_actions';

class EditSlide extends Component {

    state = {
        formError: false,
        formSuccess: false,
        formdata: {
            mainText: {
                element: 'textarea',
                value: '',
                config: {
                    label: 'Description',
                    name: 'description_input',
                    type: 'text',
                    placeholder: 'Enter text for Description'
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
            translate: {
                element: 'select',
                value: '',
                config: {
                    label: 'Translate',
                    name: 'translate_input',
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

            }
        }
    }

    componentDidMount() {

        this.props.dispatch(act_getDetail_Desc())
            .then(() => {
                const newFormData = populateFields(this.state.formdata, this.props.description.descDetail);
                this.setState({
                    formdata: newFormData
                });
            })
    }

    updateForm = (element) => {
        const newFormdata = update(element, this.state.formdata, 'description');
        this.setState({
            formError: false,
            formdata: newFormdata
        })
    }

    submitForm = (event) => {
        event.preventDefault();

        let dataToSubmit = generateData(this.state.formdata, 'description');
        let formIsValid = isFormValid(this.state.formdata, 'description');

        if (formIsValid) {
            this.props.dispatch(act_updateDetail_Desc(dataToSubmit, this.props.description.descDetail))
                .then(() => {
                    this.setState({
                        formSuccess: true
                    }, () => {
                        setTimeout(() => {
                            this.setState({
                                formSuccess: false
                            })
                        }, 2000)
                    })
                })

        } else {
            this.setState({
                formError: true
            })

        }
    }


    render() {
        return (
            <UserLayout>
                <div>
                    <form onSubmit={(event) => this.submitForm()}>
                        <h1>Edit Description</h1>
                        <FormField
                            id={'mainText'}
                            formdata={this.state.formdata.mainText}
                            change={(element) => this.updateForm(element)}
                        />
                        <div className="form_divider"></div>
                        <FormField
                            id={'publish'}
                            formdata={this.state.formdata.publish}
                            change={(element) => this.updateForm(element)}
                        />
                        <FormField
                            id={'translate'}
                            formdata={this.state.formdata.translate}
                            change={(element) => this.updateForm(element)}
                        />
                        <div>
                            {
                                this.state.formSuccess ?
                                    <div className="form_success">success</div>
                                    : null
                            }
                            {this.state.formError ?
                                <div className="error_label">Please check your data</div>
                                : null}
                            <button onClick={(event) => this.submitForm(event)}>Update</button>

                        </div>
                    </form>
                </div>
            </UserLayout>
        );
    }
}

const mapStateToProps = (state) => {

    return {
        description: state.description
    }
}

export default connect(mapStateToProps)(EditSlide);