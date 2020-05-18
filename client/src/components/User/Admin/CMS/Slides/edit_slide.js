import React, { Component } from 'react';
import UserLayout from '../../../../../hoc/user';

import FormField from '../../../../utils/Form/formfield';
import { update, generateData, isFormValid, populateFields, populatePositionField } from '../../../../utils/Form/formActions';

import { connect } from 'react-redux';

import { act_getDetail_by_Id_Slide, act_getDetail_by_Args_Slide, act_updateDetail_Slide, act_clearDetail, act_clearList, act_listSlides, act_addSlide } from '../../../../../redux/actions/CMS/slides_actions';
import FileUpload from '../../../../utils/Form/CMS/fileupload_slide'

class EditSlide extends Component {

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
                    required: false
                },
                valid: true,
                touched: false,
                validationMessage: '',
                showlabel: true

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

    componentDidUpdate(prevProps, prevState) {

        // Universal Rule


        if (this.props.slides.slideDetail !== undefined
            && this.props.user.siteLocalisation !== undefined) {

            if (
                Object.keys(this.state.formdata.position.config.options).length === 0
                && this.state.formdata.position.value === '') {



                let args = {}
                args['sortBy'] = 'position'
                this.props.dispatch(act_listSlides(this.props.user.siteLocalisation.value, args))
                    .then(response => {


                        let newFormData = populateFields(this.state.formdata, this.props.slides.slideDetail);
      

                        newFormData = populatePositionField(newFormData, response, this.props.user.siteLocalisation.value, 'position', 'edit');
                        this.updateFields(newFormData)
                    })

            } else if (
                this.props.user.siteLocalisation.value !== prevProps.user.siteLocalisation.value
            ) {

                let args = {}
                this.props.dispatch(act_getDetail_by_Args_Slide(this.props.user.siteLocalisation.value, args))
                    .then(response => {

                        if (Object.keys(response.payload).length !== 0) {

                            let args = {}
                            args['sortBy'] = 'position'
                            this.props.dispatch(act_listSlides(this.props.user.siteLocalisation.value, args))
                                .then(response => {
                                    let newFormData = populateFields(this.state.formdata, this.props.slides.slideDetail);

                                    newFormData = populatePositionField(newFormData, response, this.props.user.siteLocalisation.value, 'position');
                                    this.updateFields(newFormData)
                                })

                        } else {

                            let dataToSubmit = generateData(this.state.formdata, 'slides');
                            dataToSubmit['language'] = this.props.user.siteLocalisation.value
                            // Here add with identical images
                            this.props.dispatch(act_addSlide(this.props.user.siteLocalisation.value, args, dataToSubmit))
                                .then(response2 => {

                                    this.props.dispatch(act_getDetail_by_Id_Slide(response2.payload.entity._id))
                                        .then(response3 => {
                                            let newFormData = populateFields(this.state.formdata, this.props.slides.slideDetail);

                                            newFormData = populatePositionField(newFormData, response, this.props.user.siteLocalisation.value, 'position');
                                            this.updateFields(newFormData)


                                        })

                                })

                        }
                    })
            }

            // END OF Universal Rule

        }



    }

    componentDidMount() {

        if (
            this.props.user.siteLocalisation !== undefined
        ) {
            this.props.dispatch(act_getDetail_by_Id_Slide(this.props.match.params.id))
        }

    }

    componentWillUnmount() {
        this.props.dispatch(act_clearDetail('slides'))
        this.props.dispatch(act_clearList('slides'))
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

    submitForm = (event) => {
        event.preventDefault();

        let dataToSubmit = generateData(this.state.formdata, 'slides');
        let formIsValid = isFormValid(this.state.formdata, 'slides');

        if (formIsValid) {
            let args = {}
            args['_id'] = this.props.match.params.id
            args['previousPos'] = this.props.slides.slideDetail.position

            this.props.dispatch(act_updateDetail_Slide(this.props.user.siteLocalisation.value, args, dataToSubmit))
                .then(() => {
                    this.setState({
                        formSuccess: true
                    }, () => {
                        setTimeout(() => {
                            this.setState({
                                formSuccess: false
                            })
                        }, 500)
                    })
                })

        } else {
            this.setState({
                formError: true
            })

        }
    }

    removeImagesHandler = (images) => {


        this.props.dispatch(act_getDetail_by_Id_Slide(this.props.match.params.id))
            .then(response => {
                const newFormData = populateFields(this.state.formdata, this.props.slides.slideDetail);

                this.setState({
                    formdata: newFormData
                })

            })
    }
    addImagesHandler = (images) => {

        this.props.dispatch(act_getDetail_by_Id_Slide(this.props.match.params.id))
            .then(response => {
                const newFormData = populateFields(this.state.formdata, this.props.slides.slideDetail);

                this.setState({
                    formdata: newFormData
                })

            })

    }

    render() {
        return (

            <UserLayout>
                <div>
                    <form onSubmit={(event) => this.submitForm()}>
                        <h1>Edit Slide</h1>
                        <FileUpload
                            addImagesHandler={(images) => this.addImagesHandler(images)}
                            removeImagesHandler={(images) => this.removeImagesHandler(images)}
                            reset={this.state.formSuccess}
                            parent_id={this.props.match.params.id}
                            images_add={{}}
                        // entity={this.props.slides.slideDetail}
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
                            id={'position'}
                            formdata={this.state.formdata.position}
                            // defaultValue={{ key: 1, value: 1 }}
                            change={(element) => this.updateForm(element)}
                        />
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
        slides: state.slides
    }
}

export default connect(mapStateToProps)(EditSlide);