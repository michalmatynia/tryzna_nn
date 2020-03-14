import React, { Component } from 'react';
import UserLayout from '../../../../../hoc/user';

import FormField from '../../../../utils/Form/formfield';
import { update, generateData, isFormValid, populateFields } from '../../../../utils/Form/formActions';

import { connect } from 'react-redux';

import { act_getDetail_Menu, act_updateDetail_Menu, act_listMenus } from '../../../../../redux/actions/CMS/menu_actions';
// import FileUpload from '../../../../utils/Form/CMS/fileupload_slide'

class EditMenu extends Component {

    state = {
        get_args:
        {
            sortBy: 'position'
        },
        formError: false,
        formSuccess: false,
        formdata: {
            name: {
                element: 'input',
                value: '',
                config: {
                    label: 'Name',
                    name: 'name_input',
                    type: 'text',
                    placeholder: 'Enter text for Name'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: false

            },
            linkTo: {
                element: 'input',
                value: '',
                config: {
                    label: 'Link To',
                    name: 'linkto_input',
                    type: 'text',
                    placeholder: 'Enter text for Link'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: false

            },
            level: {
                element: 'select',
                value: '',
                config: {
                    label: 'Level',
                    name: 'level_input',
                    options: [
                        { key: 'top', value: 'top' },
                        { key: 'bottom', value: 'bottom' },
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
            public: {
                element: 'select',
                value: '',
                config: {
                    label: 'Public',
                    name: 'public_input',
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
                    required: false
                },
                valid: true,
                touched: false,
                validationMessage: '',
                showlabel: true

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

            }
        }
    }

    componentDidUpdate(prevProps, prevState) {

        console.log('Component Did Update')
        // console.log(this.props)
        // console.log(prevProps)
        // console.log(this.state)
        // console.log(prevState)
        console.log(' ========')
        if (
            this.props.menu.adminGetMenus !== undefined
            && this.props.menu.menuDetail !== undefined
            && this.props.user.siteLocalisation !== undefined
            && prevProps.user.siteLocalisation !== undefined
            && this.props.user.siteLocalisation.value === prevProps.user.siteLocalisation.value
            // && this.state.formdata.language.value === prevState.formdata.language.value
            && this.state.formdata.position.config.options === prevState.formdata.position.config.options
            && Object.keys(this.state.formdata.position.config.options).length === 0
        ) {
            console.log('set position Options')
            console.log(this.props.menu.adminGetMenus)

                    let line = [];
                    let totalPos = [];
                    // let i = 0
                    if (Object.keys(this.props.menu.adminGetMenus).length !== 0) {

                        this.props.menu.adminGetMenus.forEach((item, i) => {
                            i = i + 1;
                            line = { key: i, value: i }
                            totalPos.push(line)

                        })

                    }

                    // const newFormData = {
                    //     ...this.state.formdata
                    // }
                    
                    const newFormData = populateFields(this.state.formdata, this.props.menu.menuDetail);
                    newFormData['position'].config.options = totalPos;

                    this.setState({
                        formdata: newFormData
                    })

            //     })
        }


        else if ((

            this.props.menu.menuDetail !== undefined
            && this.props.user.siteLocalisation !== undefined
            && prevProps.user.siteLocalisation !== undefined
            && this.props.user.siteLocalisation.value !== prevProps.user.siteLocalisation.value
            && this.state.formdata.language.value !== ''
            && this.state.formdata.position.value !== ''
           // && this.state.formdata.language.value === prevState.formdata.language.value
           // && this.state.formdata.position.config.options === prevState.formdata.position.config.options
            && Object.keys(this.state.formdata.position.config.options).length !== 0

            // LANGUAGE CHANGE
        ) || (
                this.props.menu.menuDetail === undefined
                && prevProps.menu.menuDetail === undefined
                && this.props.user.siteLocalisation !== undefined
                && this.state.formdata.language.value === ''
            )) {

            console.log('Component Did Update - LG CHANGE')

            let dataToSubmit = generateData(this.state.formdata, 'menu');

            // console.log(dataToSubmit)

            this.props.dispatch(act_getDetail_Menu(this.props.match.params.id, this.props.user.siteLocalisation.value, this.state.get_args, dataToSubmit))
                .then(response => {

                    console.log(this.props)
                    console.log(prevProps)
                    console.log(this.state)
                    console.log(prevState)

                    console.log('LG CHANGE Get Detail Menu')
                    console.log(response)
                    const newFormData = populateFields(this.state.formdata, this.props.menu.menuDetail);
                    this.setState({
                        formdata: newFormData
                    });
                })
        }

    }

    componentDidMount() {


        console.log('Component Did Mount')
        if (
            this.props.user.siteLocalisation !== undefined
        ) {
            console.log('Component Did Mount - INSIDE')

            this.props.dispatch(act_getDetail_Menu(this.props.match.params.id, this.props.user.siteLocalisation.value, this.state.get_args, null))
                .then((response) => {

                    // Run list entities here to extract the position information

                    // console.log('component Did Mount - INSIDE - get Detail')
                    // console.log(this.props)
                    // const newFormData = populateFields(this.state.formdata, this.props.menu.menuDetail);
                    // this.setState({
                    //     formdata: newFormData
                    // });
                })
        }

    }

    updateForm = (element) => {
        const newFormdata = update(element, this.state.formdata, 'menu');
        this.setState({
            formError: false,
            formdata: newFormdata
        })
    }

    submitForm = (event) => {
        event.preventDefault();

        let dataToSubmit = generateData(this.state.formdata, 'menu');
        let formIsValid = isFormValid(this.state.formdata, 'menu');

        if (formIsValid) {
            this.props.dispatch(act_updateDetail_Menu(dataToSubmit, this.props.match.params.id))
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
                    <h1><FormField
                        id={'language'}
                        formdata={this.state.formdata.language}
                    />Edit menu</h1>
                    <form onSubmit={(event) => this.SubmitForm(event)}>
                        <FormField
                            id={'name'}
                            formdata={this.state.formdata.name}
                            change={(element) => this.updateForm(element)}
                        />
                        <FormField
                            id={'linkTo'}
                            formdata={this.state.formdata.linkTo}
                            change={(element) => this.updateForm(element)}
                        />
                        <div className="form_divider"></div>
                        <FormField
                            id={'level'}
                            formdata={this.state.formdata.level}
                            change={(element) => this.updateForm(element)}
                        />
                        <FormField
                            id={'public'}
                            formdata={this.state.formdata.public}
                            change={(element) => this.updateForm(element)}
                        />
                        <FormField
                            id={'position'}
                            formdata={this.state.formdata.position}
                            // defaultValue={{ key: 1, value: 1 }}
                            change={(element) => this.updateForm(element)}
                        />
                        <FormField
                            id={'publish'}
                            formdata={this.state.formdata.publish}
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
                        <button onClick={(event) => this.submitForm(event)}>Update</button>
                    </form>
                </div>
            </UserLayout>
        );
    }
}

const mapStateToProps = (state) => {

    return {
        menu: state.menu
    }
}

export default connect(mapStateToProps)(EditMenu);