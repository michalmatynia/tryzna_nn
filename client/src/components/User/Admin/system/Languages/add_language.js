import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserLayout from '../../../../../hoc/user';

import FormField from '../../../../utils/Form/formfield';
import { update, generateData, isFormValid, resetFields, populatePositionField } from '../../../../utils/Form/formActions';
import FileUpload from '../../../../utils/Form/CMS/fileupload_slide'

import { act_addLanguage, act_clearDetail, act_clearList, act_listLanguages } from '../../../../../redux/actions/system/language_actions';

class AddLanguage extends Component {

    state = {
        formError: false,
        formSuccess: false,
        formdata: {
            country_id: {
                element: 'select',
                value: '',
                config: {
                    label: 'Country',
                    name: 'country_input',
                    options: []

                },
                validation: {
                    required: false
                },
                valid: true,
                touched: false,
                validationMessage: '',
                showlabel: true

            },
            position: {
                element: 'select',
                value: '',
                config: {
                    label: 'Position',
                    name: 'position_input',
                    options: []

                },
                validation: {
                    required: false
                },
                valid: true,
                touched: false,
                validationMessage: '',
                showlabel: true

            },
            visible: {
                element: 'select',
                value: true,
                config: {
                    label: 'Visible',
                    name: 'visible_input',
                    options: [
                        { key: true, value: 'yes' },
                        { key: false, value: 'no' },
                    ]

                },
                validation: {
                    required: false
                },
                valid: true,
                touched: false,
                validationMessage: '',
                showlabel: true

            }
        }
    }
    // componentDidUpdate(prevProps, prevState) {

    //     if (
    //         this.props.user.siteLocalisation !== undefined
    //         && prevProps.user.siteLocalisation !== undefined
    //     ) {
    //         // When Slide is Added 
    //         if ((
    //             this.props.user.siteLocalisation.value === prevProps.user.siteLocalisation.value
    //             && this.state.formdata.language.value === ''
    //         ) || (
    //                 this.props.user.siteLocalisation.value !== prevProps.user.siteLocalisation.value
    //                 && this.state.formdata.language.value !== ''
    //             )) {


    //             let args = {}
    //             args['sortBy'] = 'position'
    //             this.props.dispatch(act_listSlides(this.props.user.siteLocalisation.value, args))
    //                 .then(response => {
    //                     const newFormData = populatePositionField(this.state.formdata, response, this.props.user.siteLocalisation.value, 'position', 'add');
    //                     this.updateFields(newFormData)
    //                 })

    //         }

    //     } // END OF Universal condition

    // }

    componentDidMount() {
        // let args = {}
        // args['sortBy'] = 'position'
        // this.props.dispatch(act_listSlides(this.props.user.siteLocalisation.value, args))
        //     .then(response => {
        //         const newFormData = populatePositionField(this.state.formdata, response, this.props.user.siteLocalisation.value, 'position', 'add');
        //         this.updateFields(newFormData)
        //     })
    }

    // componentWillUnmount() {
    //     this.props.dispatch(act_clearDetail('languages'))
    //     this.props.dispatch(act_clearList('languages'))

    // }

    // updateFields = (newFormData) => {
    //     this.setState({
    //         formdata: newFormData
    //     })
    // }

    // updateForm = (element) => {
    //     const newFormdata = update(element, this.state.formdata, 'languages');
    //     this.setState({
    //         formError: false,
    //         formdata: newFormdata
    //     })
    // }

    resetFieldHandler = () => {

        const newFormData = resetFields(this.state.formdata, 'languages');
        newFormData['visible'].value = true

        this.setState({
            formdata: newFormData,
            formSuccess: true
        });
        setTimeout(() => {
            this.setState({
                formSuccess: false
            }, () => {
                this.props.dispatch(act_clearDetail('languages'))
            })
        }, 3000)
    }


    submitForm = (event) => {
        event.preventDefault();

        let dataToSubmit = generateData(this.state.formdata, 'languages');

        let formIsValid = isFormValid(this.state.formdata, 'languages');

        if (formIsValid) {
            let args = {}
            args['sortBy'] = 'position'
            this.props.dispatch(act_addLanguage( args, dataToSubmit))
                .then((response) => {


                    if (this.props.languages.adminDetailLanguage.success) {
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

    // removeImagesHandler = (images) => {

    //     const newFormData = { ...this.state.formdata };

    //     let reducedNewFormData = newFormData['images'].value.filter(item => {
    //         console.log(item);

    //         return item.public_id !== images;

    //     })

    //     newFormData['images'].value = reducedNewFormData
    //     newFormData['images'].valid = true;
    //     this.updateFields(newFormData)

    // }

    // addImagesHandler = (images) => {

    //     const newFormData = { ...this.state.formdata };

    //     if (images !== null) {

    //         newFormData['images'].value.push(images)
    //     }

    //     newFormData['images'].valid = true;
    //     this.updateFields(newFormData)

    // }



    render() {
        return (
            <UserLayout>
                <div>
                    <h1>Add languages</h1>
                    <form onSubmit={(event) => this.SubmitForm(event)}>
                        {/* <FileUpload
                            removeImagesHandler={(images) => this.removeImagesHandler(images)}
                            addImagesHandler={(images) => this.addImagesHandler(images)}
                            reset={this.state.formSuccess}
                            parent_id=''
                            images_add={this.state.formdata.images}
                        /> */}
                        <FormField
                            id={'country_id'}
                            formdata={this.state.formdata.country_id}
                            change={(element) => this.updateForm(element)}
                        />
                        <div className="form_divider"></div>
                        <FormField
                            id={'position'}
                            formdata={this.state.formdata.position}
                            change={(element) => this.updateForm(element)}
                        />
                        <FormField
                            id={'visible'}
                            formdata={this.state.formdata.visible}
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
                        <button onClick={(event) => this.submitForm(event)}>Add</button>
                    </form>
                </div>
            </UserLayout>

        );
    }
}

const mapStateToProps = (state) => {

    return {
        languages: state.languages
    }
}

export default connect(mapStateToProps)(AddLanguage);