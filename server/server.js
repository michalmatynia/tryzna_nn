const express = require('express');
//

// File Upload
const formidable = require('express-formidable');
const cloudinary = require('cloudinary');

const SHA256 = require('crypto-js/sha256');
const moment = require('moment');
// Bring JSON in request
const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');

const app = express();
const mongoose = require('mongoose');
const async = require('async');

require('dotenv').config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true });
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '2000kb' }));
app.use(cookieParser());

// Production version
app.use(express.static('client/build'));

// Methods
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

// Models
const { User } = require('./models/user');
const { Brand } = require('./models/taxonomy/brand');
const { Wood } = require('./models/taxonomy/wood');
const { Product } = require('./models/product');
const { Payment } = require('./models/payment');
const { Site } = require('./models/site');

// API
const { Nation } = require('./models/APIdata/nation');

// Models - CMS
const { Menu } = require('./models/cms/menu');
const { Logo } = require('./models/cms/logo');
const { Slide } = require('./models/cms/slide');
const { Desc } = require('./models/cms/desc');

// Middlewares
const { auth } = require('./middleware/auth');
const { admin } = require('./middleware/admin');

//UTILS
const { sendEmail } = require('./utils/mail')

// const date = new Date();
// const po = `PO-${date.getSeconds()}${date.getMilliseconds()}-${SHA256("32432423").toString().substring(0,8)}`

// console.log(po)

const multer = require('multer');
let storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.jpg' && ext !== '.png') {
            return cb(res.status(400).end('only jpg/png are allowed'), false);
        }
        cb(null, true)
    }


});

// If I want to upload Multiple, I need to pass an array here and make changes according to documentation of Multer
const upload = multer({ storage: storage }).single('file')

app.post('/api/user/uploadfile', auth, admin, (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.json({ success: false, err })
        }
        return res.json({ success: true })
    })
})

const fs = require('fs');
const path = require('path');

app.get('/api/user/admin_files', auth, admin, (req, res) => {
    const dir = path.resolve('.') + '/uploads/';

    fs.readdir(dir, (err, items) => {
        return res.status(200).send(items);
    })
})

app.get('api/user/download/:id', auth, admin, (req, res) => {
    const file = path.resolve('.') + `/uploads/${req.params.id}`;
    res.download(file)
})

// ======================
//     NATION
//=======================
app.get('/api/nation/list_entities', (req, res) => {

    let sort = req.query.sortBy ? req.query.sortBy : { name: 1 };
    let limit = req.query.limit ? parseInt(req.query.limit) : 1000;

    let allArgs = {};

    for (const [key, value] of Object.entries(req.query)) {

        if (key !== 'sort' && key !== 'limit' && key !== '_id') {
            allArgs[key] = value
        }
    }

    Nation.
        find(allArgs)
        .sort(sort)
        .limit(limit)
        .exec((err, doc) => {

            if (err) return res.status(400).send(err);
            res.send(doc)
        })
})

app.post('/api/nation/sync_entity', (req, res) => {

    let sort = req.query.sort ? req.query.sort : { name: 1 };
    let limit = req.query.limit ? parseInt(req.query.limit) : 1000;

    let allArgs = {};

    for (const [key, value] of Object.entries(req.query)) {

        if (key !== 'sort' && key !== 'limit' && key !== '_id') {
            allArgs[key] = value
        }
    }

    req.body.forEach((item) => {


        Nation.findOneAndUpdate(
            { name: item.name },
            {
                "$set": item
            }, { new: true },
            (err, doc) => {

                if (!doc) {
                    const nation = new Nation(item);

                    nation.save((err2, doc2) => {

                    })

                }

            }
        )



    })
    res.status(200).json({
        success: true
    })

    // Nation.
    //     find(allArgs)
    //     // .sort({position : 1})
    //     .sort(sort)
    //     .limit(limit)
    //     .exec((err2, doc2) => {
    //         if (err2) return res.status(400).send(err2);
    //         res.send(doc2)
    //     })

})

app.get('/api/nation/remove_entity_from_list', auth, (req, res) => {

    // let sort = req.query.sort ? req.query.sort : { name: 1 };
    // let limit = req.query.limit ? parseInt(req.query.limit) : 1000;

    // let allArgs = {};

    // for (const [key, value] of Object.entries(req.query)) {

    //     if (key !== 'sort' && key !== 'limit' && key !== '_id') {
    //         allArgs[key] = value
    //     }
    // }

    Nation.
        findOneAndDelete({ _id: req.query._id }, (err, docs) => {

            // Nation.
            //     find(allArgs)
            //     // .sort({position : 1})
            //     .sort(sort)
            //     .limit(limit)
            //     .exec((err2, doc2) => {
                    if (err) return res.status(400).send(err);
                    res.send(docs)
            //     })

        })

})

// ======================
//     SITE SETTINGS
//=======================

// ======================
//     LANGUAGE
//=======================

app.get('/api/language/list_entities', (req, res) => {

    let sortBy = req.query.sortBy ? req.query.sortBy : { position: 1 };
    let limit = req.query.limit ? parseInt(req.query.limit) : 1000;

    let allArgs = {};

    for (const [key, value] of Object.entries(req.query)) {

        if (key !== 'sortBy') {
            allArgs[key] = value
        }
    }

    Slide.
        find(allArgs)
        // .sort({position : 1})
        .sort(sortBy)
        .limit(limit)
        .exec((err, doc) => {

            if (err) return res.status(400).send(err);
            res.send(doc)
        })
})

// ======================
//          SLIDES
//=======================

app.get('/api/slide/list_entities', (req, res) => {

    let sortBy = req.query.sortBy ? req.query.sortBy : { position: 1 };
    let limit = req.query.limit ? parseInt(req.query.limit) : 1000;

    let allArgs = {};

    for (const [key, value] of Object.entries(req.query)) {

        if (key !== 'sortBy') {
            allArgs[key] = value
        }
    }

    Slide.
        find(allArgs)
        // .sort({position : 1})
        .sort(sortBy)
        .limit(limit)
        .exec((err, doc) => {

            if (err) return res.status(400).send(err);
            res.send(doc)
        })
})

app.post('/api/slide/add_entity', (req, res) => {

    // I need to get the list of languages
    // for Each language, create a slide


    const slide = new Slide(req.body);

    slide.save((err, doc) => {

        let allArgs = {};

        for (const [key, value] of Object.entries(req.query)) {

            if (key !== 'sortBy') {
                allArgs[key] = value
            }
        }

        if (!err) {
            Slide.
                find({ language: req.query.language })
                .sort({ position: 1, createdAt: -1 })
                .exec((err2, doc2) => {

                    if (doc2.length > 1) {

                        let i = 0;
                        let found = false;
                        doc2.map(item => {
                            i = i + 1;

                            if (parseInt(doc.position) === i && found === false && item._id.toString() !== doc._id.toString()) {

                                Slide.findOneAndUpdate(
                                    { _id: mongoose.Types.ObjectId(item._id) },
                                    {
                                        "$set": {
                                            position: parseInt(i + 1)
                                        }
                                    }, { new: true },
                                    (err3, doc3) => {

                                    }
                                )

                            } else if (item._id.toString() === doc._id.toString()) {

                                found = true
                            } else if (parseInt(doc.position) !== i && found === true) {

                                Slide.findOneAndUpdate(
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
        }


        if (err) return res.json({ success: false, err });
        res.status(200).json({
            success: true,
            entity: doc
        })
    })
})

// TE SA POTRZEBNE DO SKLEPU ALE USUNAC POTEM
// app.post('/api/slide/article', auth, admin, (req, res) => {

//     const slide = new Slide(req.body);

//     slide.save((err, doc) => {
//         if (err) return res.json({ success: false, err });
//         res.status(200).json({
//             success: true,
//             article: doc
//         })
//     })
// })

// app.get('/api/slide/articles', (req, res) => {
//     let order = req.query.order ? req.query.order : "asc";
//     let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
//     let limit = req.query.limit ? parseInt(req.query.limit) : 100;

//     let findArgs = {};
//     // console.log(req.query)
//     if (req.query.publish) { findArgs['publish'] = req.query.publish }


//     Slide.
//         find(findArgs)
//         .sort([[sortBy, order]])
//         .limit(limit)
//         .exec((err, articles) => {
//             if (err) return res.status(400).send(err);
//             res.send(articles)
//         })

// })
app.get('/api/slide/remove_entity_from_list', auth, (req, res) => {


    Slide.findOne({ _id: req.query._id }, (err, doc) => {

        image_ids = []
        images_ids = doc['images'].map(item => {
            cloudinary.uploader.destroy(item.public_id)
        })
    })

    Slide.
        findOneAndDelete({ _id: req.query._id }, (err, docs) => {


            if (err) { return res.status(400).send(err); }
            else {

                Slide.
                    find({ language: docs.language })
                    .sort({ position: 1, createdAt: -1 })
                    .exec((err2, doc2) => {

                        if (doc2.length >= 1) {

                            let i = 0;
                            doc2.map(item => {
                                i = i + 1;

                                Slide.findOneAndUpdate(
                                    { _id: mongoose.Types.ObjectId(item._id) },
                                    {
                                        "$set": {
                                            position: parseInt(i)
                                        }
                                    }, { new: true },
                                    (err3, doc3) => {
                                        if (err3) { return res.status(400).send(err3); }
                                    }
                                )

                            })
                        }

                        res.send(doc2)

                    })

            }

        })

})
// app.get('/api/slide/remove_slide', auth, (req, res) => {

//     Slide.findOne({ _id: req.query._id }, (err, doc) => {


//         image_ids = []
//         images_ids = doc['images'].map(item => {
//             cloudinary.uploader.destroy(item.public_id)
//         })
//     })
//     Slide.findOneAndDelete({ _id: req.query._id }, (err, docs) => {
//         Slide.
//             find()
//             .exec((err, docs) => {
//                 res.send(docs)
//             })
//     })
// })

// Fetch Product by ID (Query String) - SHOP FILTER SEARCH
app.get('/api/slide/articles_by_id', (req, res) => {
    let type = req.query.type;

    let items = req.query._id;

    if (type === "array") {
        let ids = req.query._id.split(',');
        items = [];
        items = ids.map(item => {
            return mongoose.Types.ObjectId(item)
        })
    }

    Slide.
        find({ '_id': { $in: items } })
        .exec((err, docs) => {
            return res.status(200).send(docs)
        })
});

app.get('/api/slide/get_entity_by_id', (req, res) => {

    Slide.findOne({
        _id: mongoose.Types.ObjectId(req.query._id)
    }, (err, doc) => {

        if (err) return res.status(400).send(err);
        res.status(200).send(doc)

    })

});

app.get('/api/slide/get_entity_by_args', (req, res) => {

    let allArgs = {};

    for (const [key, value] of Object.entries(req.query)) {

        if (key !== 'sortBy') {
            allArgs[key] = value
        }
    }

    Slide.
        findOne(allArgs)
        // .sort({ position: 1, createdAt: -1 })
        .exec((err, doc) => {

            if (err) return res.status(400).send(err);
            res.status(200).send(doc)
        })

});

app.post('/api/slide/update_entity', auth, admin, (req, res) => {

    let allArgs = {};

    for (const [key, value] of Object.entries(req.query)) {

        if (key !== 'sortBy') {
            allArgs[key] = value
        }
    }

    Slide.findOneAndUpdate(
        { language: req.query.language, _id: req.query._id },
        {
            "$set": req.body
        },
        { new: true },
        (err, doc) => {

            Slide.findOneAndUpdate(
                { language: req.query.language, _id: { $ne: req.query._id }, position: req.body.position },
                {
                    "$set": {
                        position: req.query.previousPos
                    }
                },
                { new: true },
                (err2, doc2) => { })


            if (err) return res.json({ success: false, err });
            return res.status(200).send({ doc })
        }
    )
});

app.post('/api/slide/set_visible', auth, (req, res) => {

    let checked = null

    if (req.query.checked === 'true') {
        checked = false
    } else {
        checked = true
    }

    Slide.findOneAndUpdate(
        { _id: req.query._id },
        {
            "$set": {
                visible: checked
            }
        },
        { new: true },
        (err, doc) => {

            Slide.
                find({ language: req.query.language })
                .sort({ position: 1, createdAt: -1 })
                .exec((err, articles) => {
                    if (err) return res.status(400).send(err);
                    res.send(articles)
                })
        }
    );
})

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

app.post('/api/slide/uploadimage', auth, admin, formidable(), (req, res) => {

    cloudinary.uploader.upload(req.files.file.path, (result) => {

        if (req.query.parent_id && result.public_id) {

            Slide.findOneAndUpdate(

                { _id: mongoose.Types.ObjectId(req.query.parent_id) },
                {
                    "$push":
                        { "images": { "public_id": result.public_id, "url": result.url } }

                },
                { new: true },
                (err, doc) => {
                    res.send(
                        {
                            public_id: result.public_id,
                            url: result.url
                        }
                    )
                })

        } else if (result.public_id) {

            res.send(
                {
                    public_id: result.public_id,
                    url: result.url
                }
            )
        } else {
            return res.status(400).send(err);
        }
    }, {
        public_id: `${Date.now()}`,
        resource_type: 'auto',
        folder: 'Tryzna'
        // ,transform: '200px'
    })
})


// ======================
//          PRODUCTS
//=======================

app.post('/api/product/shop', (req, res) => {
    let order = req.body.order ? req.body.order : 'desc';
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";

    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === 'price') {
                findArgs[key] = {

                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                }
            } else {
                findArgs[key] = req.body.filters[key]
            }
        }
    }

    findArgs['publish'] = true;

    Product.
        find(findArgs)
        .populate('brand')
        .populate('wood')
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, articles) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({
                size: articles.length,
                articles
            })

        })
})


// BY ARRiVAL
// /articles?sortBy=createdAt&order=desc&limit=4
// BY SALE
// /articles?sortBy=sold&order=desc&limit=4
app.get('/api/product/articles', (req, res) => {
    let order = req.query.order ? req.query.order : "asc";
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    let limit = req.query.limit ? parseInt(req.query.limit) : 100;

    Product.find()
        .populate('brand')
        .populate('wood')
        .sort([[sortBy, order]])
        .limit(limit)
        .exec((err, articles) => {
            if (err) return res.status(400).send(err);
            res.send(articles)
        })

})



// Fetch Product by ID (Query String)
app.get('/api/product/articles_by_id', (req, res) => {
    let type = req.query.type;

    let items = req.query.id;

    if (type === "array") {
        let ids = req.query.id.split(',');
        items = [];
        items = ids.map(item => {
            return mongoose.Types.ObjectId(item)
        })
    }

    Product.
        find({ '_id': { $in: items } })
        .populate('brand')
        .populate('wood')
        .exec((err, docs) => {
            return res.status(200).send(docs)
        })
});


app.post('/api/product/article', auth, admin, (req, res) => {
    const product = new Product(req.body);

    product.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        res.status(200).json({
            success: true,
            article: doc
        })
    })
})

app.get('/api/product/getarticles', (req, res) => {
    Product.find({}, (err, articles) => {
        if (err) return res.status(400).send(err);
        res.status(200).send(articles)
    })
})

// ======================
//          WOODS
//=======================

app.post('/api/product/wood', auth, admin, (req, res) => {
    const wood = new Wood(req.body);

    wood.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        res.status(200).json({
            success: true,
            wood: doc
        })
    })

});

app.get('/api/product/woods', (req, res) => {
    Wood.find({}, (err, woods) => {
        if (err) return res.status(400).send(err);
        res.status(200).send(woods)
    })
})

// ======================
//          BRAND
//=======================

app.post('/api/product/brand', auth, admin, (req, res) => {

    const brand = new Brand(req.body);

    brand.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        res.status(200).json({
            success: true,
            brand: doc
        })
    })

})

app.get('/api/product/brands', (req, res) => {
    Brand.find({}, (err, brands) => {
        if (err) return res.status(400).send(err);
        res.status(200).send(brands)
    })
})

// ======================
//          USERS
//=======================

app.post('/api/user/reset_user', (req, res) => {

    User.findOne(
        { 'email': req.body.email },
        (err, user) => {
            if (!user) { return res.json({ success: false, message: "Email not found" }); } else {
                user.generateResetToken((err, user) => {
                    if (err) return res.json({ success: false, message: 'Unable to generate a token' });
                    sendEmail(user.email, user.name, null, "reset_password", user)
                    return res.json({ success: true })
                })
            }
        }
    )
})

app.post('/api/user/reset_password', (req, res) => {

    var today = moment().startOf('day').valueOf();

    User.findOne({
        resetToken: req.body.resetToken,
        resetTokenExp: {
            $gte: today
        }
    }, (err, user) => {
        if (!user) return res.json({ success: false, message: 'Sorry, token invalid, generate a new one' })

        user.password = req.body.password;
        user.resetToken = '';
        user.resetTokenExp = '';

        user.save((err, doc) => {
            if (err) return res.json({ success: false, err });
            return res.status(200).json({
                success: true
            })
        })
    })
})

app.get('/api/user/auth', auth, (req, res) => {
    res.status(200).json({
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        cart: req.user.cart,
        history: req.user.history
    })

})

app.post('/api/user/register', (req, res) => {


    const candidate_user = new User(req.body);

    // Check if duplicate present 

    User.findOne({ 'email': req.body.email }, (err, user) => {
        if (user) { return res.json({ success: false, message: "Email is already registered" }); } else {

            // Save the User
            candidate_user.save((err, doc) => {
                if (err) return res.json({ success: false, message: err.message });
                sendEmail(doc.email, doc.name, null, "welcome");
                return res.status(200).json({
                    success: true,
                    // userdata: doc
                })

            })

        } // if(!user)
    })

})

app.post('/api/user/login', (req, res) => {

    User.findOne({ 'email': req.body.email }, (err, user) => {

        if (!user) { return res.json({ loginSuccess: false, message: "Auth failed, email not found" }); } else {

            user.comparePassword(req.body.password, (err, isMatch) => {

                if (!isMatch) {
                    return res.json({ loginSuccess: false, message: 'Invalid Credentials' });
                } else {
                    /// Generate a token
                    user.generateToken((err, user) => {
                        if (err) return res.status(400).send(err);
                        res.cookie('w_auth', user.token).status(200).json({
                            loginSuccess: true
                        })
                    })
                } // end compare Pw
            })
        } // if(!user)
    })
})

app.get('/api/user/logout', auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id },
        { token: '' },
        (err, doc) => {
            if (err) return res.json({ success: false, err });
            return res.status(200).send({
                success: true
            })
        }
    )
})

app.post('/api/users/uploadimage', auth, admin, formidable(), (req, res) => {
    cloudinary.uploader.upload(req.files.file.path, (result) => {
        res.status(200).send({
            public_id: result.public_id,
            url: result.url
        })
    }, {
        public_id: `${Date.now()}`,
        resource_type: 'auto'
        // ,transform: '200px'
    })
})


app.get('/api/users/removeimage', auth, admin, (req, res) => {
    let image_id = req.query.public_id;
    cloudinary.uploader.destroy(image_id, (error, result) => {
        if (error) return res.json({ success: false, error });
        res.status(200).send('ok');
    })
})

app.post('/api/user/addToCart', auth, (req, res) => {
    User.findOne({ _id: req.user._id }, (err, doc) => {
        let duplicate = false;
        doc.cart.forEach((item) => {
            if (item.id == req.query.productId) {
                duplicate = true;

            }
        })

        if (duplicate) {
            User.findOneAndUpdate(
                { _id: req.user._id, "cart.id": mongoose.Types.ObjectId(req.query.productId) },
                { $inc: { "cart.$.quantity": 1 } },
                { new: true },
                () => {
                    if (err) return res.json({ success: false, err });
                    res.status(200).json(doc.cart)
                }

            )
        } else {
            User.findOneAndUpdate(
                { _id: req.user._id },
                {
                    $push: {
                        cart: {
                            id: mongoose.Types.ObjectId(req.query.productId),
                            quantity: 1,
                            date: Date.now()
                        }
                    }
                },
                { new: true },
                (err, doc) => {
                    if (err) return res.json({ success: false, err });
                    res.status(200).json(doc.cart)
                }
            )
        }
    })
})

app.get('/api/user/removeFromCart', auth, (req, res) => {
    User.findOneAndUpdate(
        { _id: req.user._id },
        {
            "$pull":
                { "cart": { "id": mongoose.Types.ObjectId(req.query._id) } }

        },
        { new: true },
        (err, doc) => {
            let cart = doc.cart;
            let array = cart.map(item => {
                return mongoose.Types.ObjectId(item.id)
            });

            Product.
                find({ '_id': { $in: array } })
                .populate('brand')
                .populate('wood')
                .exec((err, cartDetail) => {
                    return res.status(200).json({
                        cartDetail,
                        cart
                    })
                })
        }
    );
})

app.post('/api/user/successBuy', auth, (req, res) => {

    let history = [];
    let transactionData = {};

    const date = new Date();
    const po = `PO-${date.getSeconds()}${date.getMilliseconds()}-${SHA256(req.user._id).toString().substring(0, 8)}`


    // user history
    req.body.cartDetail.forEach((item) => {
        history.push({

            porder: po,
            dateOfPurchase: Date.now(),
            name: item.name,
            brand: item.brand.name,
            id: item._id,
            price: item.price,
            quantity: item.quantity,
            paymentId: req.body.paymentData.paymentID
        })
    })

    // PAYMENTS DASH
    transactionData.user = {
        id: req.user._id,
        name: req.user.name,
        lastname: req.user.lastname,
        email: req.user.email
    }
    transactionData.data = {
        ...req.body.paymentData,
        porder: po
    };
    transactionData.product = history;

    User.findOneAndUpdate(
        { _id: req.user._id },
        { $push: { history: history }, $set: { cart: [] } },
        { new: true },
        (err, user) => {
            if (err) return res.json({ success: false, err });

            const payment = new Payment(transactionData);
            payment.save((err, doc) => {
                if (err) return res.json({ success: false, err });
                let products = [];
                doc.product.forEach(item => {
                    products.push({ id: item.id, quantity: item.quantity })
                })

                async.eachSeries(products, (item, callback) => {
                    Product.updateOne(
                        { _id: item.id },
                        {
                            $inc: {
                                "sold": item.quantity
                            }
                        },
                        { new: false },
                        callback
                    )
                }, (err) => {
                    if (err) return res.json({ success: false, err })
                    sendEmail(user.email, user.name, null, "purchase", transactionData)
                    res.status(200).json({
                        success: true,
                        cart: user.cart,
                        cartDetail: []
                    })
                })
            });
        }
    )
});

app.post('/api/user/update_profile', auth, (req, res) => {

    User.findOneAndUpdate(
        { _id: req.user._id },
        {
            "$set": req.body
        },
        { new: true },
        (err, doc) => {
            if (err) return res.json({ success: false, err });
            return res.status(200).send({
                success: true
            })
        }
    );
})

// ======================
//          Site
//=======================

app.get('/api/site/site_data', (req, res) => {

    Site.find({}, (err, site) => {
        if (err) return res.status(400).send(err);
        res.status(200).send(site[0].siteInfo)
    });
});

app.post('/api/site/site_data', auth, admin, (req, res) => {

    Site.findOneAndUpdate(
        { name: 'Site' },
        { "$set": { siteInfo: req.body } },
        { new: true },
        (err, doc) => {
            if (err) return res.json({ success: false, err });
            return res.status(200).send({
                success: true,
                siteInfo: doc.siteInfo
            })
        }
    )
});

// ======================
//          Description
//=======================

app.get('/api/desc/list_entities', (req, res) => {
    let sortBy = req.query.sortBy ? req.query.sortBy : "updatedAt";
    let limit = req.query.limit ? parseInt(req.query.limit) : 1000;

    let allArgs = {};

    for (const [key, value] of Object.entries(req.query)) {

        if (key !== 'sortBy') {
            allArgs[key] = value
        }
    }

    Desc.
        find(allArgs)
        .sort([[sortBy]])
        .limit(limit)
        .exec((err, doc) => {

            if (err) return res.status(400).send(err);
            res.send(doc)
        })

})

app.get('/api/desc/get_entity_by_args', (req, res) => {

    let allArgs = {};

    for (const [key, value] of Object.entries(req.query)) {

        if (key !== 'sortBy') {
            allArgs[key] = value
        }
    }

    Desc.
        findOne(allArgs)
        // .sort({ position: 1, createdAt: -1 })
        .exec((err, doc) => {

            if (err) return res.status(400).send(err);
            res.status(200).send(doc)
        })

});

app.post('/api/desc/add_entity', (req, res) => {

    const desc = new Desc(req.body);

    desc.save((err, doc) => {

        if (err) return res.json({ err });
        res.status(200).json({ doc })


    })
})

app.post('/api/desc/add_entity_auto', (req, res) => {

    const desc = new Desc(req.body);

    desc.save((err, doc) => {

        if (err) return res.status(400).send(err);
        res.status(200).send(doc)

    })
})

app.post('/api/desc/update_entity', auth, admin, (req, res) => {

    Desc.findOneAndUpdate(
        { language: req.query.language, _id: req.query._id },
        {
            "$set": req.body
        },
        { new: true },
        (err, doc) => {
            if (err) return res.json({ success: false, err });
            return res.status(200).send({ doc })
        }
    )
});

// ======================
//          Logo
//=======================

app.get('/api/logo/list_entities', (req, res) => {
    let sortBy = req.query.sortBy ? req.query.sortBy : "updatedAt";
    let limit = req.query.limit ? parseInt(req.query.limit) : 1000;

    let allArgs = {};

    for (const [key, value] of Object.entries(req.query)) {

        if (key !== 'sortBy') {
            allArgs[key] = value
        }
    }

    Logo.
        find(allArgs)
        .sort([[sortBy]])
        .limit(limit)
        .exec((err, doc) => {

            if (err) return res.status(400).send(err);
            res.send(doc)
        })

})

app.get('/api/logo/get_entity_by_id', (req, res) => {

    //console.log(req.query._id)

    Logo.findOne({
        _id: mongoose.Types.ObjectId(req.query._id)
    }, (err, doc) => {

        if (err) return res.status(400).send(err);
        res.status(200).send(doc)

    })

});

app.get('/api/logo/get_entity_by_args', (req, res) => {

    let allArgs = {};

    for (const [key, value] of Object.entries(req.query)) {

        if (key !== 'sortBy') {
            allArgs[key] = value
        }
    }

    Logo.
        findOne(allArgs)
        // .sort({ position: 1, createdAt: -1 })
        .exec((err, doc) => {

            if (err) return res.status(400).send(err);
            res.status(200).send(doc)
        })

});

app.post('/api/logo/add_entity', (req, res) => {

    const logo = new Logo(req.body);

    logo.save((err, doc) => {

        if (err) return res.json({ err });
        res.status(200).json({ doc })


    })
})

app.post('/api/logo/add_entity_auto', (req, res) => {

    const logo = new Logo(req.body);

    logo.save((err, doc) => {

        if (err) return res.status(400).send(err);
        res.status(200).send(doc)

    })
})

app.post('/api/logo/update_entity', auth, admin, (req, res) => {

    Logo.findOneAndUpdate(
        { language: req.query.language, _id: req.query._id },
        {
            "$set": req.body
        },
        { new: true },
        (err, doc) => {
            if (err) return res.json({ success: false, err });
            return res.status(200).send({ doc })
        }
    )
});

// LOGO - Image Handler

app.get('/api/logo/removeimage', auth, admin, (req, res) => {

    Logo.updateMany(

        {
            _id: {
                $exists: true
            }
        },
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


})

app.post('/api/logo/uploadimage', auth, admin, formidable(), (req, res) => {

    cloudinary.uploader.upload(req.files.file.path, (result) => {

        if (result.public_id) {

            Logo.updateMany(

                {
                    _id: {
                        $exists: true
                    }
                },
                {
                    "$push":
                        { "images": { "public_id": result.public_id, "url": result.url } }

                },

                { new: true },
                (err, doc) => {
                    // console.log(err)
                    res.send(
                        {
                            public_id: result.public_id,
                            url: result.url
                        }
                    )
                })

        }
        else {
            return res.status(400).send(err);
        }
    }, {
        public_id: `${Date.now()}`,
        resource_type: 'auto',
        folder: 'Tryzna/Logo'
        // ,transform: '200px'
    })
})

// ======================
//          Menu
//=======================

app.get('/api/menu/list_entities', (req, res) => {
    let sortBy = req.query.sortBy ? req.query.sortBy : { position: 1 };
    let limit = req.query.limit ? parseInt(req.query.limit) : 1000;

    let allArgs = {};

    for (const [key, value] of Object.entries(req.query)) {

        if (key !== 'sortBy') {
            allArgs[key] = value
        }
    }

    Menu.
        find(allArgs)
        // .sort({position : 1})
        .sort(sortBy)
        .limit(limit)
        .exec((err, doc) => {




            if (err) return res.status(400).send(err);
            res.send(doc)
        })

})

app.post('/api/menu/add_entity', (req, res) => {

    const menu = new Menu(req.body);

    menu.save((err, doc) => {

        let allArgs = {};

        for (const [key, value] of Object.entries(req.query)) {

            if (key !== 'sortBy') {
                allArgs[key] = value
            }
        }

        if (!err) {
            Menu.
                find({ language: req.query.language })
                .sort({ position: 1, createdAt: -1 })
                .exec((err2, doc2) => {

                    if (doc2.length > 1) {

                        let i = 0;
                        let found = false;
                        doc2.map(item => {
                            i = i + 1;

                            if (parseInt(doc.position) === i && found === false && item._id.toString() !== doc._id.toString()) {

                                Menu.findOneAndUpdate(
                                    { _id: mongoose.Types.ObjectId(item._id) },
                                    {
                                        "$set": {
                                            position: parseInt(i + 1)
                                        }
                                    }, { new: true },
                                    (err3, doc3) => {

                                    }
                                )

                            } else if (item._id.toString() === doc._id.toString()) {

                                found = true
                            } else if (parseInt(doc.position) !== i && found === true) {

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
        }

        if (err) return res.json({ success: false, err });
        res.status(200).json({
            success: true,
            entity: doc
        })
    })
})

app.get('/api/menu/remove_entity', auth, (req, res) => {

    Menu.
        findOneAndDelete({ _id: req.query._id }, (err, docs) => {

            if (err) { return res.status(400).send(err); }
            else {

                Menu.
                    find({ language: docs.language })
                    .sort({ position: 1, createdAt: -1 })
                    .exec((err2, doc2) => {

                        if (doc2.length >= 1) {

                            let i = 0;
                            doc2.map(item => {
                                i = i + 1;

                                Menu.findOneAndUpdate(
                                    { _id: mongoose.Types.ObjectId(item._id) },
                                    {
                                        "$set": {
                                            position: parseInt(i)
                                        }
                                    }, { new: true },
                                    (err3, doc3) => {
                                        if (err3) { return res.status(400).send(err3); }
                                    }
                                )

                            })
                        }
                    })

                res.send(docs)
            }

        })

})

app.get('/api/menu/get_entity_by_id', (req, res) => {

    //console.log(req.query._id)

    Menu.findOne({
        _id: mongoose.Types.ObjectId(req.query._id)
    }, (err, doc) => {

        if (err) return res.status(400).send(err);
        res.status(200).send(doc)

    })

});

app.get('/api/menu/get_entity_by_args', (req, res) => {

    let allArgs = {};

    for (const [key, value] of Object.entries(req.query)) {

        if (key !== 'sortBy') {
            allArgs[key] = value
        }
    }

    Menu.
        findOne(allArgs)
        // .sort({ position: 1, createdAt: -1 })
        .exec((err, doc) => {

            if (err) return res.status(400).send(err);
            res.status(200).send(doc)
        })

});

app.post('/api/menu/update_entity', auth, admin, (req, res) => {

    let allArgs = {};

    for (const [key, value] of Object.entries(req.query)) {

        if (key !== 'sortBy') {
            allArgs[key] = value
        }
    }

    Menu.findOneAndUpdate(
        { language: req.query.language, _id: req.query._id },
        {
            "$set": req.body
        },
        { new: true },
        (err, doc) => {

            Menu.findOneAndUpdate(
                { language: req.query.language, _id: { $ne: req.query._id }, position: req.body.position },
                {
                    "$set": {
                        position: req.query.previousPos
                    }
                },
                { new: true },
                (err, doc) => { })

            if (err) return res.json({ success: false, err });
            return res.status(200).send({ doc })
        }
    )
});

app.post('/api/menu/set_visible', auth, (req, res) => {

    let checked = null

    if (req.query.checked === 'true') {
        checked = false
    } else {
        checked = true
    }

    Menu.findOneAndUpdate(
        { _id: req.query._id },
        {
            "$set": {
                visible: checked
            }
        },
        { new: true },
        (err, doc) => {

            Menu.
                find({ language: req.query.language })
                .sort({ position: 1, createdAt: -1 })
                .exec((err, articles) => {
                    if (err) return res.status(400).send(err);
                    res.send(articles)
                })
        }
    );
})
// ---

if (process.env.NODE_ENV === 'production') {
    const path = require('path');
    app.get('/*', (req, res) => {
        res.sendfile(path.resolve(__dirname, '../client', 'build', 'index.html'))
    })
}

const port = process.env.PORT || 3002;

app.listen(port, () => {
    console.log(`Server running at ${port}`)
})