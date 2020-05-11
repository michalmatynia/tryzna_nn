import React, { Component } from 'react';
import UserLayout from '../../../../../hoc/user';

import FormField from '../../../../utils/Form/formfield';
import { update, generateData, isFormValid, populateFields } from '../../../../utils/Form/formActions';

import { connect } from 'react-redux';

import { act_getDetail_by_Args_Desc, act_updateDetail_Desc, act_addDesc_Auto, act_clearDetail } from '../../../../../redux/actions/CMS/desc_actions';

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
            visible: {
                element: 'select',
                value: '',
                config: {
                    label: 'Visible',
                    name: 'visible_input',
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
            language: {
                element: 'mylabel',
                value: '',
                config: {
                    label: 'Language',
                    name: 'language_input',
                    type: 'text',
                    placeholder: 'Language goes here',
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

    componentDidUpdate(prevProps) {

        if (
            this.props.user.siteLocalisation !== undefined
            && this.props.description.descDetail !== undefined
            && prevProps.description.descDetail !== undefined
            && this.props.user.siteLocalisation.value !== prevProps.user.siteLocalisation.value
            && Object.keys(this.props.description.descDetail).length > 0
        ) {
            this.props.dispatch(act_getDetail_by_Args_Desc(this.props.user.siteLocalisation.value))
                .then(response => {
                    
                    if (response.payload !== "") {
                        const newFormData = populateFields(this.state.formdata, this.props.description.descDetail);
                        this.setState({
                            formdata: newFormData
                        });
                    }

                })

        } else if ((
            this.props.user.siteLocalisation !== undefined
            && this.props.description.descDetail !== undefined
        ) && (
                (this.props.description.descDetail !== prevProps.description.descDetail && Object.keys(this.props.description.descDetail).length === 0)
                || (Object.keys(this.props.description.descDetail).length !== 0 && this.props.user.siteLocalisation.value !== prevProps.user.siteLocalisation.value)
            )) {

            let dataToSubmit = generateData(this.state.formdata, 'description');
            dataToSubmit['language'] = this.props.user.siteLocalisation.value
            dataToSubmit['visible'] = true
            dataToSubmit['mainText'] = 'Example Text'

            this.props.dispatch(act_addDesc_Auto(this.props.user.siteLocalisation.value, dataToSubmit))
                .then(response2 => {

                    const newFormData = populateFields(this.state.formdata, this.props.description.descDetail);

                    this.setState({
                        formdata: newFormData
                    })

                })


        }

    }

    componentDidMount() {

        if (
            this.props.user.siteLocalisation !== undefined
        ) {
            this.props.dispatch(act_getDetail_by_Args_Desc(this.props.user.siteLocalisation.value))
                .then(response => {

                    if (response.payload !== "") {
                        const newFormData = populateFields(this.state.formdata, this.props.description.descDetail);
                        this.setState({
                            formdata: newFormData
                        });
                    }
                })
        }
    }

    componentWillUnmount() {
        this.props.dispatch(act_clearDetail('description'))

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

            let args = {}
            args['_id'] = this.props.description.descDetail._id


            this.props.dispatch(act_updateDetail_Desc(this.props.user.siteLocalisation.value, args, dataToSubmit))
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
                        <h1><FormField
                            id={'language'}
                            formdata={this.state.formdata.language}
                        />Edit Description</h1>
                        <FormField
                            id={'mainText'}
                            formdata={this.state.formdata.mainText}
                            change={(element) => this.updateForm(element)}
                        />
                        <div className="form_divider"></div>
                        <FormField
                            id={'visible'}
                            formdata={this.state.formdata.visible}
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
        description: state.description,
        user: state.user
    }
}

export default connect(mapStateToProps)(EditSlide);