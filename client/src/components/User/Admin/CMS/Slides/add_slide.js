import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserLayout from '../../../../../hoc/user';

import FormField from '../../../../utils/Form/formfield';
import { update, generateData, isFormValid, resetFields, populatePositionField } from '../../../../utils/Form/formActions';
import FileUpload from '../../../../utils/Form/CMS/fileupload_slide'

import { act_addSlide, act_clearDetail, act_listSlides } from '../../../../../redux/actions/CMS/slides_actions';

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
                    type: 'hidden',
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
        console.log('ComponentDidUpdate');

        console.log(this.state.formdata);
        // console.log(prevState.formdata);
        // console.log(this.props);
        // console.log(prevProps);

        // Universal condition
        if (
            this.props.user.siteLocalisation !== undefined
            && prevProps.user.siteLocalisation !== undefined
        ) {
            // When Slide is Added 
            if ((
                this.props.user.siteLocalisation.value === prevProps.user.siteLocalisation.value
                && this.state.formdata.language.value === ''
            ) || (
                    this.props.user.siteLocalisation.value !== prevProps.user.siteLocalisation.value
                    && this.state.formdata.language.value !== ''
                )) {


                let args = {}
                args['sortBy'] = 'position'
                this.props.dispatch(act_listSlides(this.props.user.siteLocalisation.value, args))
                    .then(response => {
                        const newFormData = populatePositionField(this.state.formdata, response, this.props.user.siteLocalisation.value, 'position');
                        this.updateFields(newFormData)
                        //  console.log(this.props.products.brands)
                    })

            }

        } // END OF Universal condition

    }

    componentDidMount() {
        if (
            this.props.user.siteLocalisation !== undefined
        ) {

            let args = {}
            args['sortBy'] = 'position'
            this.props.dispatch(act_listSlides(this.props.user.siteLocalisation.value, args))
                .then(response => {
                    const newFormData = populatePositionField(this.state.formdata, response, this.props.user.siteLocalisation.value, 'position');
                    this.updateFields(newFormData)
                    //  console.log(this.props.products.brands)
                })

        }
    }

    componentWillUnmount() {
        this.props.dispatch(act_clearDetail('slides'))

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
        // console.log('reset Field handler');
        // console.log(this.state.formdata);


        const newFormData = resetFields(this.state.formdata, 'slides');
        newFormData['visible'].value = true

        this.setState({
            formdata: newFormData,
            formSuccess: true
        });
        setTimeout(() => {
            this.setState({
                formSuccess: false
            }, () => {
                this.props.dispatch(act_clearDetail('slides'))
            })
        }, 3000)
    }


    submitForm = (event) => {
        event.preventDefault();

        let dataToSubmit = generateData(this.state.formdata, 'slides');
        // dataToSubmit['visible'].value = true

        // dataToSubmit['visible'] = true

        // console.log(this.state.formdata)
        // console.log(dataToSubmit)


        let formIsValid = isFormValid(this.state.formdata, 'slides');

        // console.log('Is the Form Valid?');

        // console.log(formIsValid);


        if (formIsValid) {
            let args = {}
            args['sortBy'] = 'position'
            this.props.dispatch(act_addSlide(this.props.user.siteLocalisation.value, args, dataToSubmit))
                .then((response) => {
                    // console.log('inside addSlide');
                    // console.log(response);
                    // console.log(this.state);




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

    imagesHandler = (images, type) => {
        console.log('ImagesHandler');

        console.log(images);
        console.log(type);

        const newFormData = { ...this.state.formdata };

        if (images !== null && type === "add") {
            newFormData['images'].value.push(images)
        } else if (type === "remove") {
            newFormData['images'].value.filter(item => {
                return item.public_id !== images.public_id;

            })
        }

        console.log(newFormData);

        newFormData['images'].valid = true;

        this.updateFields(newFormData)

    }



    render() {
        return (
            <UserLayout>
                <div>
                    <h1>Add slides</h1>
                    <form onSubmit={(event) => this.SubmitForm(event)}>
                        <FileUpload
                            imagesHandler={(images,type) => this.imagesHandler(images, type)}
                            reset={this.state.formSuccess}
                            parent_id=''
                            images_add={this.state.formdata.images}
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