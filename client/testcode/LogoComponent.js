componentDidUpdate(prevProps, prevState) {
        console.log('ComDidup')

        if (
            this.props.user.siteLocalisation !== undefined
            && this.props.logo.adminGetLogos === undefined
        ) {

            
            let args = {}

            this.props.dispatch(act_listLogos(this.props.user.siteLocalisation.value, args))
            .then(response => {
                console.log(response)
            })

            // this.props.dispatch(act_getDetail_Logo_by_Lg(this.props.user.siteLocalisation.value))
            //     .then(response => {
            //         // console.log('componentDidMount - act_getDetail_Logo')
            //         // console.log(response)
            //         // console.log(this.props.logo.logoDetail)
            //         const newFormData = populateFields(this.state.formdata, this.props.logo.logoDetail);
            //         this.setState({
            //             formdata: newFormData
            //         });
            //     })
        }


        // Jesli a) nie ma bazy na liscie, klikniecie na jezyk
        // b) Baza jest na liscie
        // klikniecie bezposrednio na 

        if (

            this.props.user.siteLocalisation !== undefined
            && prevProps.user.siteLocalisation !== undefined
            // && this.props.user.siteLocalisation.value !== prevProps.user.siteLocalisation.value
        ) {

            // I. IF LANGUAGE CHANGE
            // console.log(this.state)
            console.log('INSIDE A')

            // Get list of Logos
            let args = {}

                    console.log('List Logos')
                    // console.log(response)
                    if (Object.keys(
                        this.props.logo.adminGetLogos).length === 0
                        // && this.props.logo.logoDetail === undefined
                    ) {

                        // 2.a if there are no entities, add new
                        let dataToSubmit = generateData(this.state.formdata, 'logo');
                        dataToSubmit['language'] = this.props.user.siteLocalisation.value

                        this.props.dispatch(act_addLogo(this.props.user.siteLocalisation.value, args, dataToSubmit))
                            .then(response2 => {
                                console.log('Add Logo')
                                console.log(response2)

                                const newFormData = populateFields(this.state.formdata, response2.payload.entity);

                                this.setState({
                                    formdata: newFormData
                                })

                            })

                    } else if (
                        (
                            this.props.logo.logoDetail !== undefined
                            && this.props.logo.logoDetail === prevProps.logo.logoDetail
                            && this.props.user.siteLocalisation.value === prevProps.user.siteLocalisation.value
                        ) || (
                            this.props.logo.logoDetail !== undefined
                            && this.props.user.siteLocalisation.value !== prevProps.user.siteLocalisation.value
                        )
                    ) {
                        console.log('INSIDE C')
                        // console.log(response)

                        // 2.b if there are just get detail
                        this.props.dispatch(act_getDetail_Logo_by_Lg(this.props.user.siteLocalisation.value))
                            .then(response2 => {

                                // console.log(response2)
                                const newFormData = populateFields(this.state.formdata, this.props.logo.logoDetail);

                                this.setState({
                                    formdata: newFormData
                                })

                            })
                    }
               
            // 1. Get Logo Detail

            // 2. Create New
        }
        // else if (
        //     this.props.logo.logoDetail !== undefined
        //     && this.props.user.siteLocalisation !== undefined
        //     && prevProps.user.siteLocalisation !== undefined
        //     && this.props.user.siteLocalisation.value === prevProps.user.siteLocalisation.value
        //     && this.props.logo.logoDetail !== prevProps.logo.logoDetail
        // ){

        //     console.log('INSIDE D')
        //     this.props.dispatch(act_getDetail_Logo_by_Lg(this.props.user.siteLocalisation.value))
        //         .then(response2 => {

        //             // console.log(response2)
        //             const newFormData = populateFields(this.state.formdata, this.props.logo.logoDetail);

        //             this.setState({
        //                 formdata: newFormData
        //             })

        //         })
        // }

    }