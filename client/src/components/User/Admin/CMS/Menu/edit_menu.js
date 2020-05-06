import React, { Component } from 'react';
import UserLayout from '../../../../../hoc/user';

import FormField from '../../../../utils/Form/formfield';
import { update, generateData, isFormValid, populateFields } from '../../../../utils/Form/formActions';

import { connect } from 'react-redux';

import { act_getDetail_Menu, act_updateDetail_Menu, act_listMenus, act_addMenu } from '../../../../../redux/actions/CMS/menu_actions';
// import FileUpload from '../../../../utils/Form/CMS/fileupload_slide'

class EditMenu extends Component {

    state = {
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
        console.log(this.props)
        console.log(prevProps)
        console.log(this.state.formdata.position.config.options)

        // 0. Get a Menu item and calculate position

        if ((
            this.props.menu.menuDetail !== undefined
            && this.props.user.siteLocalisation !== undefined
            && Object.keys(this.state.formdata.position.config.options).length === 0

            // && this.props.user.siteLocalisation.value === prevProps.user.siteLocalisation.value
            // && Object.keys(this.state.formdata.position.config.options).length === 0
            // && Object.keys(this.props.menu.adminGetMenus).length === 0

        )
            // && (
            //         (this.props.logo.logoDetail !== prevProps.logo.logoDetail && Object.keys(this.props.logo.logoDetail).length === 0)
            //         || (Object.keys(this.props.logo.logoDetail).length !== 0 && this.props.user.siteLocalisation.value !== prevProps.user.siteLocalisation.value)
            //     )
        ) {
            console.log('INSIDE A - Set position')

            let line = [];
            let totalPos = [];

            if (Object.keys(this.props.menu.adminGetMenus).length !== 0) {

                this.props.menu.adminGetMenus.forEach((item, i) => {
                    i = i + 1;
                    line = { key: i, value: i }
                    totalPos.push(line)

                })

            }

            const newFormData = populateFields(this.state.formdata, this.props.menu.menuDetail);
            newFormData['position'].config.options = totalPos;

            this.setState({
                formdata: newFormData
            })

        } else if (
            this.props.user.siteLocalisation !== undefined
            && this.props.menu.menuDetail !== undefined
            && this.props.user.siteLocalisation.value !== prevProps.user.siteLocalisation.value
        ) {
            console.log('Language Changed')
        } else {

            // Dlaczego jest 3 run update, sprawdzic czy Logo zachowuje sie tak samo, dac nothing jaka trzecia opcje

            console.log('nothing')
        }
        
        // else if ((
        //     this.props.user.siteLocalisation !== undefined
        //     && this.props.menu.menuDetail !== undefined
        // ) && (
        //         (this.props.menu.menuDetail !== prevProps.menu.menuDetail && Object.keys(this.props.menu.menuDetail).length === 0)
        //         || (Object.keys(this.props.menu.menuDetail).length !== 0 && this.props.user.siteLocalisation.value !== prevProps.user.siteLocalisation.value)
        //     )){}



        // 1. If I update

        // 2. If I change the language - I need to recalculate the List of Menus for a given Lg

        // 2. A If there is a Menu with the same Link

        // 2. B If there are no Menus with the same Link, Add new




    }

    componentDidMount() {

        console.log('ComponentDidMount')
        if (
            this.props.user.siteLocalisation !== undefined
        ) {

            this.props.dispatch(act_getDetail_Menu(this.props.match.params.id))
            // .then(response => {
            //     console.log('INSIDE ComponentDIDMount')

            //     if (response.payload !== "") {
            //         const newFormData = populateFields(this.state.formdata, this.props.menu.menuDetail);
            //         this.setState({
            //             formdata: newFormData
            //         });
            //     }
            // })
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

            let args = {}
            args['parent_id'] = this.props.match.params.id

            this.props.dispatch(act_updateDetail_Menu(this.props.user.siteLocalisation.value, args, dataToSubmit))
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