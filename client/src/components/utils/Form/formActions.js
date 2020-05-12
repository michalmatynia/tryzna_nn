export const validate = (element, formdata = []) => {
    let error = [true, ''];


    if (element.validation.email) {
        // eslint-disable-next-line
        const valid = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(element.value)
        const message = `${!valid ? 'Must be a valid email' : ''}`;
        error = !valid ? [valid, message] : error;
    }

    if (element.validation.confirm) {
        const valid = element.value.trim() === formdata[element.validation.confirm].value;
        const message = `${!valid ? 'Passwords do not match' : ''}`;
        error = !valid ? [valid, message] : error;
    }

    if (element.validation.required) {
        const valid = element.value.trim() !== '';
        const message = `${!valid ? 'This field is required' : ''}`;
        error = !valid ? [valid, message] : error;
    }

    return error

}

// When a field is Touched, it is automatically Validated. Hidden and Untouched fields remain unvalidated

export const update = (element, formdata, formName) => {
    const newFormdata = {
        ...formdata
    }

    const newElement = {
        ...newFormdata[element.id]
    }

    newElement.value = element.event.target.value;

    if (element.blur) {

        // console.log(element.blur)

        let validData = validate(newElement, formdata);
        newElement.valid = validData[0];
        newElement.validationMessage = validData[1];
    }


    newElement.touched = element.blur;
    newFormdata[element.id] = newElement;

    return newFormdata
}

export const generateData = (formdata, formName) => {

    let dataToSubmit = {};

    for (let key in formdata) {
        if (key !== 'confirmPassword') {
            dataToSubmit[key] = formdata[key].value;
        }

    }


    return dataToSubmit;
}

// Checks if the valid param is everywhere set to true

export const isFormValid = (formdata, formName) => {
    let formIsValid = true;

    for (let key in formdata) {
        formIsValid = formdata[key].valid && formIsValid
    }

    return formIsValid;
}

export const populateOptionFields = (formdata, arrayData = [], field) => {
    const newArray = [];
    const newFormdata = { ...formdata };



    arrayData.forEach(item => {
        newArray.push({ key: item._id, value: item.name })
    });

    newFormdata[field].config.options = newArray;
    return newFormdata;
}

export const populatePositionField = (formdata, response, language, field) => {

    const totalPos = [];
    let i = 0
    if (Object.keys(response.payload).length !== 0) {

        response.payload.forEach((item, i) => {
            i = i + 1;
            totalPos.push({ key: i, value: i })

        })

    }

    i = totalPos.length + 1;
    totalPos.push({ key: i, value: i })
    const newFormData = {
        ...formdata
    }

    newFormData[field].config.options = totalPos;
    newFormData[field].value = totalPos.length;
    //----
    newFormData['language'].value = language;


    return newFormData;
}


export const resetFields = (formdata, formName) => {

    const newFormdata = { ...formdata };


    for (let key in newFormdata) {

        // console.log(key);

        if (key === 'images') {
            newFormdata[key].value = [];

        } else {
            newFormdata[key].value = '';
        }

        //       newFormdata[key].valid = false;
        newFormdata[key].touched = false;
        newFormdata[key].validationMessage = '';
    }

    return newFormdata;

}

export const populateFields = (formData, fields) => {

    for (let key in formData) {

        formData[key].value = fields[key];
        formData[key].valid = true;
        formData[key].touched = true;
        formData[key].validationMessage = '';

    }
    return formData;
}