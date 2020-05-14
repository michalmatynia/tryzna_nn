app.get('/api/slide/removeimage', auth, admin, (req, res) => {

    if (req.query.parent_id) {
        Slide.findOneAndUpdate(

            { _id: mongoose.Types.ObjectId(req.query.parent_id) },
            {
                "$pull":
                    { "images": { "public_id": req.query.image_id } }

            },
            { new: true },
            (err, doc) => {
                cloudinary.uploader.destroy(req.query.image_id, (error) => {
                    if (error) return res.json({ success: false, error });
                    res.status(200).send('ok');
                })

            })
    } else {
        cloudinary.uploader.destroy(req.query.image_id, (error, result) => {
            if (error) return res.json({ success: false, error });
            res.status(200).send('ok');
        })
    }

})