imagesHandler = (images) => {

    console.log('Images Handler');
    console.log(images);
    console.log(this.props);

    


    const newFormData = {
        ...this.state.formdata
    }
    newFormData['images'].value = images;
    newFormData['images'].valid = true;

    this.setState({
        formdata: newFormData
    }
        , () => {
            console.log('Before Dispatch');
            console.log(this.state);

            this.props.dispatch(act_getDetail_by_Args_Logo(this.props.user.siteLocalisation.value))
            .then(response => {

                // if (response.payload !== "") {
                //     const newFormData = populateFields(this.state.formdata, this.props.logo.logoDetail);
                //     this.setState({
                //         formdata: newFormData
                //     });
                // }

            })
        }
    )
}