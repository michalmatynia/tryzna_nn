import React, { Component } from 'react';
import UserLayout from '../../../../hoc/user';

import FormField from '../../../utils/Form/formfield';
import { update, generateData, isFormValid, populateFields } from '../../../utils/Form/formActions';

import { connect } from 'react-redux';

import { act_getDetail_Slide, act_updateDetail_Slide } from '../../../../redux/actions/slides_actions';
import FileUpload from '../../../utils/Form/fileupload_slide'

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

    componentDidMount() {

        const id = this.props.match.params.id;

        this.props.dispatch(act_getDetail_Slide(id))
        .then(() => {    
            const newFormData = populateFields(this.state.formdata, this.props.slides.slideDetail);
            this.setState({
                formdata: newFormData
            });
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
            this.props.dispatch(act_updateDetail_Slide(dataToSubmit))
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

        // console.log('fefesfcs')
        // console.log(this)

        const newFormData = {
            ...this.state.formdata
        }
        newFormData['images'].value = images;
        newFormData['images'].valid = true;

        this.setState({
            formdata: newFormData
        }
        , ()=> {this.props.dispatch(act_getDetail_Slide(this.props.match.params.id))}
        )
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
                        list={this.props.slides.slideDetail}
                        linktype='Edit'
                        parent_id={this.props.match.params.id}
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