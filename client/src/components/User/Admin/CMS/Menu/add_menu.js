import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserLayout from '../../../../../hoc/user';

import FormField from '../../../../utils/Form/formfield';
import { update, generateData, isFormValid, resetFields } from '../../../../utils/Form/formActions';

import { act_addMenu, act_listMenus, act_clearMenu } from '../../../../../redux/actions/CMS/menu_actions';

class AddMenu extends Component {

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
            this.props.menu.adminGetMenus === undefined
            && this.props.user.siteLocalisation !== undefined
            && prevProps.user.siteLocalisation !== undefined
            && this.props.user.siteLocalisation.value === prevProps.user.siteLocalisation.value
            && this.state.formdata.language.value !== ''
            && this.state.formdata.position.value === ''
            && prevState.formdata.language.value !== ''
            && prevState.formdata.position.value === ''
        ) || (
                this.props.menu.adminGetMenus !== undefined
                && this.props.user.siteLocalisation !== undefined
                && prevProps.user.siteLocalisation !== undefined
                && this.props.user.siteLocalisation.value !== prevProps.user.siteLocalisation.value
                && this.state.formdata.language.value !== ''
                && this.state.formdata.position.value !== ''
                && prevState.formdata.language.value !== ''
                && prevState.formdata.position.value !== ''
            ) || (

                // When Language is changed
                this.props.menu.adminGetMenus !== undefined
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
            this.props.dispatch(act_listMenus(this.props.user.siteLocalisation.value, args))
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
        this.props.dispatch(act_clearMenu('menu'))

    }

    updateFields = (newFormData) => {
        this.setState({
            formdata: newFormData
        })
    }

    updateForm = (element) => {
        const newFormdata = update(element, this.state.formdata, 'menu');
        this.setState({
            formError: false,
            formdata: newFormdata
        })
    }

    resetFieldHandler = () => {

        const newFormData = resetFields(this.state.formdata, 'menu');

        this.setState({
            formdata: newFormData,
            formSuccess: true
        });
        setTimeout(() => {
            this.setState({
                formSuccess: false
            }, () => {
                this.props.dispatch(act_clearMenu('menu'))
            })
        }, 3000)
    }

    submitForm = (event) => {
        event.preventDefault();

        let dataToSubmit = generateData(this.state.formdata, 'menu');
        let formIsValid = isFormValid(this.state.formdata, 'menu');

        if (formIsValid) {
            let args = {}
            args['sortBy'] = 'position'

            this.props.dispatch(act_addMenu(this.props.user.siteLocalisation.value, args, dataToSubmit))
                .then((response) => {

                    if (this.props.menu.adminAddMenu.success) {
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

    render() {
        return (
            <UserLayout>
                <div>
                    <h1><FormField
                        id={'language'}
                        formdata={this.state.formdata.language}
                    />Add menu</h1>
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
                        <button onClick={(event) => this.submitForm(event)}>Add Menu</button>
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

export default connect(mapStateToProps)(AddMenu);