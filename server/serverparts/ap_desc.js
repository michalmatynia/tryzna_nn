// ======================
//          Description
//=======================

app.get('/api/desc/show_entity', (req, res) => {

    Desc.findOne({ language: req.query.lg, publish: true }, (err, doc) => {

        if (err) return res.status(400).send(err);
        res.status(200).send(doc)

    })

});

app.get('/api/desc/get_entity', (req, res) => {

    Desc.findOne({ language: req.query.lg }, (err, doc) => {

        if (err) return res.status(400).send(err);
        res.status(200).send(doc)

    })

});

app.post('/api/desc/add_entity', (req, res) => {

    // Find by Language
    // if find is empty, save the new 
    // console.log('oduweobeowbcoewbcob')

    const desc = new Desc({mainText: 'Some Example Description', language: req.query.lg, publish:true});

    desc.save((error, doc) => {
        if (error) return res.json({ error });
        res.status(200).json({ doc })
    })
})

app.post('/api/desc/update_entity', auth, admin, (req, res) => {

    Desc.findOneAndUpdate(
        { language: req.query.lg, _id: req.query.parent_id },
        {
            "$set": req.body
        },
        { new: true },
        (err, doc) => {

            // console.log(doc)
            if (err) return res.json({ success: false, err });
            return res.status(200).send({doc})
        }
    )
});