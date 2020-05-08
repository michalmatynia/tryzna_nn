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

//= ========================

     //     // ========== Recalculate position

            // if (!err) {
            //     Menu.
            //         find({ language: req.query.language })
            //         .sort({ position: 1, createdAt: -1 })
            //         .exec((err2, doc2) => {
            //             // console.log(doc2)
            //             console.log('==========BEGIN============');

            //             if (doc2.length > 1) {



            //                 let i = 0;
            //                 let found = false;
            //                 doc2.map(item => {
            //                     i = i + 1;

            //                     console.log('EachItem')
            //                     console.log(item)
            //                     console.log(found);


            //                     if (parseInt(req.body.position) === i && found === false && item._id.toString() !== req.query._id.toString()){
            //                         console.log('INSIDE A1');
            //                         console.log(found);

            //                             Menu.findOneAndUpdate(
            //                                 { _id: mongoose.Types.ObjectId(item._id) },
            //                                 {
            //                                     "$set": {
            //                                         position: parseInt(i + 1) 
            //                                     }
            //                                 }, { new: true },
            //                                 (err3, doc3) => {
            //                                     console.log(err3);
                                                
            //                                 }
            //                             )
                                    

            //                     } else if(item._id.toString() === req.query._id.toString()) {
            //                         console.log('INSIDE A2');
            //                         console.log(found);

            //                         found = true
            //                     } else if (parseInt(req.body.position) !== i && found === true) {
            //                         console.log('INSIDE A3');
            //                         console.log(found);
                                    
            //                         console.log(item.linkTo);


            //                         Menu.findOneAndUpdate(
            //                             { _id: mongoose.Types.ObjectId(item._id) },
            //                             {
            //                                 "$set": {
            //                                     position: parseInt(i)
            //                                 }
            //                             }, { new: true },
            //                             (err3, doc3) => {
            //                             }
            //                         )
            //                     }
            //                 })
            //             }
            //         })
            // }
            //     // ==========

            Menu.
            find(allArgs)
            .sort({ position: 1, createdAt: -1 })
            .exec((err2, doc2) => {

                if (doc2.length > 1) {

                    let i = 0;
                    let found = false;
                    doc2.map(item => {
                        i = i + 1;

                        if (item._id.toString() === menu._id.toString() && item.position === menu.position && found === false) {

                            found = true

                        } else if (found === true) {

                            Menu.findOneAndUpdate(
                                { _id: mongoose.Types.ObjectId(item._id) },
                                {
                                    "$set": {
                                        position: parseInt(i)
                                    }
                                }, { new: true },
                                (err3, doc3) => {
                                }
                            )
                        }
                    })
                }
            })