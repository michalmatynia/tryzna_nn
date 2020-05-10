import React, { Component } from 'react';
import UserLayout from '../../../../../hoc/user';

import FormField from '../../../../utils/Form/formfield';
import { update, generateData, isFormValid, populateFields } from '../../../../utils/Form/formActions';

import { connect } from 'react-redux';

import { act_getDetail_by_Args_Logo, act_clearDetail, act_updateDetail_Logo, act_addLogo_Auto } from '../../../../../redux/actions/CMS/logo_actions';
import FileUpload from '../../../../utils/Form/CMS/fileupload_logo'

class EditLogo extends Component {

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
            visible: {
                element: 'select',
                value: '',
                config: {
                    label: 'Visible',
                    name: 'visible_input',
                    options: [
                        { key: true, value: 'yes' },
                        { key: false, value: 'no' }
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

        console.log('ComponentDidUpdate');


        if (
            this.props.user.siteLocalisation !== undefined
            && this.props.logo.logoDetail !== undefined
            && prevProps.logo.logoDetail !== undefined
            && this.props.user.siteLocalisation.value !== prevProps.user.siteLocalisation.value
            && Object.keys(this.props.logo.logoDetail).length > 0
        ) {
            this.props.dispatch(act_getDetail_by_Args_Logo(this.props.user.siteLocalisation.value))
                .then(response => {
                    console.log('INSIDE B');
                    

                    if (response.payload !== "") {
                        const newFormData = populateFields(this.state.formdata, this.props.logo.logoDetail);
                        this.setState({
                            formdata: newFormData
                        });
                    }

                })

        } else if ((
            this.props.user.siteLocalisation !== undefined
            && this.props.logo.logoDetail !== undefined
        ) && (
                (this.props.logo.logoDetail !== prevProps.logo.logoDetail && Object.keys(this.props.logo.logoDetail).length === 0)
                || (Object.keys(this.props.logo.logoDetail).length !== 0 && this.props.user.siteLocalisation.value !== prevProps.user.siteLocalisation.value)
            )) {
                console.log('INSIDE C');

            let dataToSubmit = generateData(this.state.formdata, 'logo');
            dataToSubmit['language'] = this.props.user.siteLocalisation.value
            dataToSubmit['visible'] = true

            this.props.dispatch(act_addLogo_Auto(this.props.user.siteLocalisation.value, dataToSubmit))
                .then(response2 => {

                    const newFormData = populateFields(this.state.formdata, this.props.logo.logoDetail);

                    this.setState({
                        formdata: newFormData
                    })

                })


        }

    }
    componentDidMount() {
        console.log('ComponentDidMount');

        if (
            this.props.user.siteLocalisation !== undefined
        ) {

            console.log(this.props.user.siteLocalisation.value);

            this.props.dispatch(act_getDetail_by_Args_Logo(this.props.user.siteLocalisation.value))
                .then(response => {
                    console.log('INSIDE A');
                    console.log(response);
                    
                    if (response.payload !== "") {
                        const newFormData = populateFields(this.state.formdata, this.props.logo.logoDetail);
                        this.setState({
                            formdata: newFormData
                        });
                    }

                })
        }
    }
    componentWillUnmount() {
        this.props.dispatch(act_clearDetail('logo'))
    }

    updateForm = (element) => {
        const newFormdata = update(element, this.state.formdata, 'logo');
        this.setState({
            formError: false,
            formdata: newFormdata
        })
    }

    submitForm = (event) => {
        event.preventDefault();

        let dataToSubmit = generateData(this.state.formdata, 'logo');
        let formIsValid = isFormValid(this.state.formdata, 'logo');

        if (formIsValid) {
            // this.props.user.siteLocalisation.value, args, dataToSubmit
            let args = {}
            args['_id'] = this.props.logo.logoDetail._id
            // console.log(this.props.logo.logoDetail._id);
            // console.log(this.props);


            this.props.dispatch(act_updateDetail_Logo(this.props.user.siteLocalisation.value, args, dataToSubmit))
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

    imagesHandler = (images) => {


        const newFormData = {
            ...this.state.formdata
        }
        newFormData['images'].value = images;
        newFormData['images'].valid = true;

        this.setState({
            formdata: newFormData
        }
            , () => { this.props.dispatch(act_getDetail_by_Args_Logo(this.props.user.siteLocalisation.value)) }
        )
    }

    render() {
        return (
            <UserLayout>
                <div>
                    <form onSubmit={(event) => this.submitForm()}>
                        <h1><FormField
                            id={'language'}
                            formdata={this.state.formdata.language}
                        />Edit Logo</h1>
                        <FileUpload
                            imagesHandler={(images) => this.imagesHandler(images)}
                            reset={this.state.formSuccess}
                        />
                        <FormField
                            id={'lineOne'}
                            formdata={this.state.formdata.lineOne}
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
        logo: state.logo
    }
}

export default connect(mapStateToProps)(EditLogo);