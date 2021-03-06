import React from 'react';

import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';

const FormField = ({ formdata, change, id }) => {
    
   // console.log(formdata)

    const showError = () => {
        let errorMessage = null;

        if (formdata.validation && !formdata.valid) {

            errorMessage = (
                <div className="error_label">
                    {formdata.validationMessage}
                </div>
            )

        }

        return errorMessage;
    }

    const renderTemplate = () => {
        let formTemplate = null;

        switch (formdata.element) {
            case ('input'):
                formTemplate = (
                    <div className="formBlock">
                        {formdata.showlabel ?
                            <div className="label_inputs">{formdata.config.label}</div>
                            : null}
                        <input
                            {...formdata.config}
                            value={formdata.value}
                            onBlur={(event) => change({ event, id, blur: true })}
                            onChange={(event) => change({ event, id })}
                        />
                        {showError()}
                    </div>
                )
                break;
            case ('select'):
                formTemplate = (
                    <div className="formBlock">
                        {formdata.showlabel ?
                            <div className="label_inputs">{formdata.config.label}</div>
                            : null}
                        <select
                            // defaultValue={defaultValue}
                            value={formdata.value}
                            onBlur={(event) => change({ event, id, blur: true })}
                            onChange={(event) => change({ event, id })}
                        >
                            <option value="">Select one</option>
                            {
                                formdata.config.options.map(item => (
                                    <option key={item.key} value={item.key}>{item.value}</option>
                                ))
                            }
                        </select>
                        {showError()}
                    </div>
                )

                break;
            case ('textarea'):
                formTemplate = (
                    <div className="formBlock">
                        {formdata.showlabel ?
                            <div className="label_inputs">{formdata.config.label}</div>
                            : null}
                        <textarea
                            {...formdata.config}
                            value={formdata.value}
                            onBlur={(event) => change({ event, id, blur: true })}
                            onChange={(event) => change({ event, id })}
                        />
                        {showError()}
                    </div>
                )
                break;
            case ('selectdefault'):
                formTemplate = (
                    <FormControl>
                        <NativeSelect
                            // defaultValue={this.props.menu.menuDetail.value ? this.props.menu.menuDetail.value : null}
                            value={formdata.value}
                            onBlur={(event) => change({ event, id, blur: true })}
                            onChange={(event) => change({ event, id })}
                        >
                            {
                                formdata.config.options.map(item => (
                                    <option key={item.key} value={item.key}>{item.key}</option>
                                ))
                            }
                        </NativeSelect>
                    </FormControl>
                )
                break;
            case ('mylabel'):
                formTemplate = (
                    <div className="formBlock">
                        {formdata.showlabel ?
                            <div className="label_inputs">{formdata.value}</div>
                            : null}

                        {showError()}
                    </div>
                )
                break;
            default:
                formTemplate = null;
        }

        return formTemplate;
    }

    return (
        <div>
            {renderTemplate()}
        </div>
    )
}

export default FormField;
