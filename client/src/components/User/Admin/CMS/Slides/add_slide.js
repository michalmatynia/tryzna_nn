import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserLayout from '../../../../../hoc/user';

import FormField from '../../../../utils/Form/formfield';
import { update, generateData, isFormValid, resetFields } from '../../../../utils/Form/formActions';
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

        if ((
            this.props.user.siteLocalisation !== undefined
            && !this.state.formdata.language.value
        ) || (
                this.props.user.siteLocalisation !== undefined
                && prevProps.user.siteLocalisation !== undefined
                && this.state.formdata.language.value
                && prevProps.user.siteLocalisation.value !== this.props.user.siteLocalisation.value
            )) {

            const newFormData = {
                ...this.state.formdata
            }
            newFormData['language'].value = this.props.user.siteLocalisation.value;

            this.setState({
                formdata: newFormData
            })

        }

        if ((
            this.props.slides.adminGetSlides === undefined
            && this.props.user.siteLocalisation !== undefined
            && prevProps.user.siteLocalisation !== undefined
            && this.props.user.siteLocalisation.value === prevProps.user.siteLocalisation.value
            && this.state.formdata.language.value !== ''
            && this.state.formdata.position.value === ''
            && prevState.formdata.language.value !== ''
            && prevState.formdata.position.value === ''
        ) || (
                this.props.slides.adminGetSlides !== undefined
                && this.props.user.siteLocalisation !== undefined
                && prevProps.user.siteLocalisation !== undefined
                && this.props.user.siteLocalisation.value !== prevProps.user.siteLocalisation.value
                && this.state.formdata.language.value !== ''
                && this.state.formdata.position.value !== ''
                && prevState.formdata.language.value !== ''
                && prevState.formdata.position.value !== ''
            ) || (

                this.props.slides.adminGetSlides !== undefined
                && this.props.user.siteLocalisation !== undefined
                && prevProps.user.siteLocalisation !== undefined
                && this.props.user.siteLocalisation.value === prevProps.user.siteLocalisation.value
                && this.state.formdata.language.value !== ''
                && this.state.formdata.position.value === ''
                && prevState.formdata.language.value !== ''
                && prevState.formdata.position.value === ''
            )) {
            let args = {}
            args['sortBy'] = 'position'
            this.props.dispatch(act_listSlides(this.props.user.siteLocalisation.value, args))
                .then(response => {
                    let line = [];
                    let totalPos = [];
                    let i = 0
                    if (Object.keys(response.payload).length !== 0) {

                        response.payload.forEach((item, i) => {
                            i = i + 1;
                            line = { key: i, value: i }
                            totalPos.push(line)

                        })

                    }

                    i = totalPos.length + 1;
                    totalPos.push({ key: i, value: i })
                    const newFormData = {
                        ...this.state.formdata
                    }
                    newFormData['position'].config.options = totalPos;
                    newFormData['position'].value = totalPos.length;
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
            const newFormData = {
                ...this.state.formdata
            }
            newFormData['language'].value = this.props.user.siteLocalisation.value;

            this.setState({
                formdata: newFormData
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

        const newFormData = resetFields(this.state.formdata, 'slides');

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
        let formIsValid = isFormValid(this.state.formdata, 'slides');

        if (formIsValid) {
            let args = {}
            args['sortBy'] = 'position'
            this.props.dispatch(act_addSlide(this.props.user.siteLocalisation.value, args, dataToSubmit))
                .then((response) => {

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
                    <h1><FormField
                        id={'language'}
                        formdata={this.state.formdata.language}
                    />Add slides</h1>
                    <form onSubmit={(event) => this.SubmitForm(event)}>
                        <FileUpload
                            imagesHandler={(images) => this.imagesHandler(images)}
                            reset={this.state.formSuccess}
                            parent_id=''
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