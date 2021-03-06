import React, { Component } from 'react';

import FormField from '../../utils/Form/formfield';
import { update, generateData, isFormValid, populateFields } from '../../utils/Form/formActions';

import { connect } from 'react-redux';

import { getSiteData, updateSiteData } from '../../../redux/actions/site_actions';

import { languages } from '../../utils/Form/Fixed_categories/languages';

class UpdateSiteNfo extends Component {

    state = {
        formError: false,
        formSuccess: false,
        formdata: {
            address: {
                element: 'input',
                value: '',
                config: {
                    label: 'Address',
                    name: 'address_input',
                    type: 'text',
                    placeholder: 'Enter the site address'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true

            },
            hours: {
                element: 'input',
                value: '',
                config: {
                    label: 'Working hours',
                    name: 'hours_input',
                    type: 'text',
                    placeholder: 'Enter the site working hours'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true

            },
            phone: {
                element: 'input',
                value: '',
                config: {
                    label: 'Phone number',
                    name: 'phone_input',
                    type: 'text',
                    placeholder: 'Enter the phone number'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true

            },
            email: {
                element: 'input',
                value: '',
                config: {
                    label: 'Shop email',
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
                validationMessage: '',
                showlabel: true

            },
            default_language: {
                element: 'select',
                value: '',
                config: {
                    label: 'Default Language',
                    name: 'language_input',
                    options: languages

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

    updateForm = (element) => {
        const newFormdata = update(element, this.state.formdata, 'site_nfo');
        this.setState({
            formError: false,
            formdata: newFormdata
        })
    }

    submitForm = (event) => {
        event.preventDefault();

        let dataToSubmit = generateData(this.state.formdata, 'site_nfo');
        let formIsValid = isFormValid(this.state.formdata, 'site_nfo');

        if (formIsValid) {
            this.props.dispatch(updateSiteData(dataToSubmit))
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

    // default_languageList = () => (

    //     <FormControl>
    //         <NativeSelect
    //             defaultValue={this.props.site_lg}
    //             onChange={e => this.handleChange(e.target.value)}
    //         >
    //             {this.props.lg_list ?
    //                 this.props.lg_list.map((value, i) => (
    //                     <option
    //                         value={value.name}
    //                         key={i}
    //                     // onChange={this.handleChange('checkedA')}
    //                     >{value.name}</option>

    //                 ))
    //                 : null}
    //         </NativeSelect>
    //     </FormControl>
    // )


    componentDidMount() {

        // const formdata = this.state.formdata;
        // const newFormData = populateOptionFields(formdata, languages, 'default_language');


        this.props.dispatch(getSiteData())
            .then(() => {

                const newFormData = populateFields(this.state.formdata, this.props.site.siteData[0]);
                
                this.setState({
                    formdata: newFormData
                });
            })
    }

    render() {
        return (
            <div>
                <form onSubmit={(event) => this.submitForm()}>
                    <h1>Site Info</h1>
                    <FormField
                        id={'address'}
                        formdata={this.state.formdata.address}
                        change={(element) => this.updateForm(element)}
                    />
                    <FormField
                        id={'hours'}
                        formdata={this.state.formdata.hours}
                        change={(element) => this.updateForm(element)}
                    />
                    <FormField
                        id={'phone'}
                        formdata={this.state.formdata.phone}
                        change={(element) => this.updateForm(element)}
                    />
                    <FormField
                        id={'email'}
                        formdata={this.state.formdata.email}
                        change={(element) => this.updateForm(element)}
                    />
                    <FormField
                        id={'default_language'}
                        formdata={this.state.formdata.default_language}
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
        );
    }
}

const mapStateToProps = (state) => {
    return {
        site: state.site
    }
}

export default connect(mapStateToProps)(UpdateSiteNfo);