componentDidUpdate(prevProps, prevState) {

    console.log('Component Did Update')
    console.log(this.props)
    console.log(prevProps)


    // If I update

    // If I change the language

    if (
        // this.props.menu.adminGetMenus !== undefined
        this.props.menu.menuDetail !== undefined
        && this.props.user.siteLocalisation !== undefined
        && prevProps.user.siteLocalisation !== undefined
        && this.props.user.siteLocalisation.value === prevProps.user.siteLocalisation.value
        && Object.keys(this.state.formdata.position.config.options).length === 0
    ) {

        // console.log('set position Options')

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

        //     })
    }


    else if (

        this.props.menu.menuDetail !== undefined
        && this.props.user.siteLocalisation !== undefined
        && prevProps.user.siteLocalisation !== undefined
        && this.props.user.siteLocalisation.value !== prevProps.user.siteLocalisation.value

        // LANGUAGE CHANGE
    ) {

        let args = {}
        args['linkTo'] = this.props.menu.menuDetail.linkTo


        this.props.dispatch(act_listMenus(this.props.user.siteLocalisation.value, args))
            .then(response => {
                if (Object.keys(response.payload).length === 0) {

                    // 2.a if there are no entities, add new
                    let dataToSubmit = generateData(this.state.formdata, 'menu');
                    dataToSubmit['language'] = this.props.user.siteLocalisation.value

                    this.props.dispatch(act_addMenu(this.props.user.siteLocalisation.value, args, dataToSubmit))
                        .then(response2 => {

                            this.props.dispatch(act_getDetail_Menu(response2.payload.entity._id))
                                .then(response3 => {
                                    const newFormData = populateFields(this.state.formdata, this.props.menu.menuDetail);

                                    this.setState({
                                        formdata: newFormData
                                    })

                                })

                        })

                } else {

                    // 2.b if there are just get detail
                    this.props.dispatch(act_getDetail_Menu(response.payload[0]._id))
                        .then(response2 => {
                            // console.log(response2)
                            const newFormData = populateFields(this.state.formdata, this.props.menu.menuDetail);

                            this.setState({
                                formdata: newFormData
                            })

                        })
                }



            })

       // console.log('LG CHANGE Get Detail Menu')
        // console.log(response)

        const newFormData = populateFields(this.state.formdata, this.props.menu.menuDetail);
        this.setState({
            formdata: newFormData
        });
    }

}