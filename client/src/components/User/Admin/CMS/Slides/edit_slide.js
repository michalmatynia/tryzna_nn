import React, { Component } from 'react';
import UserLayout from '../../../../../hoc/user';

import FormField from '../../../../utils/Form/formfield';
import { update, generateData, isFormValid, populateFields } from '../../../../utils/Form/formActions';

import { connect } from 'react-redux';

import { act_getDetail_by_Id_Slide, act_getDetail_by_Args_Slide, act_updateDetail_Slide, act_clearDetail, act_listSlides, act_addSlide } from '../../../../../redux/actions/CMS/slides_actions';
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

        console.log('componentDidUpdate');


        if ((
            this.props.slides.slideDetail !== undefined
            && this.props.user.siteLocalisation !== undefined
            && Object.keys(this.state.formdata.position.config.options).length === 0)) {

            let line = [];
            let totalPos = [];

            if (Object.keys(this.props.slides.adminGetSlides).length !== 0) {

                this.props.slides.adminGetSlides.forEach((item, i) => {
                    i = i + 1;
                    line = { key: i, value: i }
                    totalPos.push(line)
                })
            }

            const newFormData = populateFields(this.state.formdata, this.props.slides.slideDetail);
            newFormData['position'].config.options = totalPos;

            this.setState({
                formdata: newFormData
            })

        } else if (
            this.props.user.siteLocalisation !== undefined
            && this.props.slides.slideDetail !== undefined
            && this.props.user.siteLocalisation.value !== prevProps.user.siteLocalisation.value
        ) {

            let args = {}

            // Tutaj powinien byc link do identycznym image Array
            // args['linkTo'] = this.props.slides.slideDetail.linkTo

            this.props.dispatch(act_getDetail_by_Args_Slide(this.props.user.siteLocalisation.value, args))
                .then(response => {

                    if (Object.keys(response.payload).length !== 0) {

                        this.props.dispatch(act_listSlides(this.props.user.siteLocalisation.value))
                            .then(response2 => {

                                let line = [];
                                let totalPos = [];

                                if (Object.keys(response2.payload).length !== 0) {

                                    this.props.slides.adminGetSlides.forEach((item, i) => {
                                        i = i + 1;
                                        line = { key: i, value: i }
                                        totalPos.push(line)

                                    })
                                }

                                const newFormData = populateFields(this.state.formdata, this.props.slides.slideDetail);
                                newFormData['position'].config.options = totalPos;

                                this.setState({
                                    formdata: newFormData
                                })
                            })

                    } else {

                        let dataToSubmit = generateData(this.state.formdata, 'slides');
                        dataToSubmit['language'] = this.props.user.siteLocalisation.value

                        this.props.dispatch(act_addSlide(this.props.user.siteLocalisation.value, args, dataToSubmit))
                            .then(response2 => {

                                this.props.dispatch(act_getDetail_by_Id_Slide(response2.payload.entity._id))
                                    .then(response3 => {
                                        const newFormData = populateFields(this.state.formdata, this.props.slides.slideDetail);

                                        this.setState({
                                            formdata: newFormData
                                        })

                                    })

                            })

                    }
                })
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

        console.log('Submit Form');
        console.log(dataToSubmit);

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

    // imagesHandler = (images) => {

    //     this.props.dispatch(act_getDetail_by_Id_Slide(this.props.match.params.id))
    //     .then(response => {

    //         if (response.payload !== "") {
    //             const newFormData = populateFields(this.state.formdata, this.props.slide.slideDetail);
    //             this.setState({
    //                 formdata: newFormData
    //             });
    //         }

    //     })
    // }

    imagesHandler = (images) => {
        console.log('Image handler - BEfore Dispatch');
        console.log(this.state);
        console.log(this.props);
        console.log(images);

        // if (this.props.slides.slideDetail !== undefined && this.props.slides.slideDetail !== "" && images !== null) {
        //     images = [...this.props.slides.slideDetail.images, images]
        // } else if (this.props.slides.slideDetail !== undefined && this.props.slides.slideDetail !== "" && images === null) {
        //     images = this.props.slides.slideDetail.images
        // }
        this.props.dispatch(act_getDetail_by_Id_Slide(this.props.match.params.id))
        .then(response => {
            const newFormData = populateFields(this.state.formdata, this.props.slides.slideDetail);

            this.setState({
                formdata: newFormData
            })

        })

        // else {
        //     images = this.props.slides.slideDetail.images
        // }

        // const newFormData = {
        //     ...this.state.formdata
        // }

        // newFormData['images'].value = images;
        // newFormData['images'].valid = true;

        // this.setState({
        //     formdata: newFormData
        // }
        //     , () => {  }
        // )
    }

    render() {
        return (

            <UserLayout>
                <div>
                    <form onSubmit={(event) => this.submitForm()}>
                        <h1>Edit Slide</h1>
                        <FileUpload
                            imagesHandler={(images) => this.imagesHandler(images)}
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