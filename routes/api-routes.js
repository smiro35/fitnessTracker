const router = require('express').Router();
const axios = require('axios');

// **look into path**
const path = require('path');
const db = require('../models');
// Activities
// GET index, get all activities
router.get('/activities', (req, res) => {
    db.Activity.findAll()
        .then((activities) => {
            console.log(activities);
            res.json(activities);
        });
});
// POST create, create a new activity
router.post('/activities', (req, res) => {
    const activity = req.body;
    // console.log(activity);
    db.Activity.create(activity)
        .then((results) => {
            res.json({
                success: true,
            });
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                errors: err.errors,
            });
        });
});
router.post('/weights', (req, res) => {
    const weight = req.body;
    console.log(weight);
    db.Weights.create(weight)
        .then((results) => {
            res.json({
                success: true,
            });
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                errors: err.errors,
            });
        });
});

router.get('/activities/:name', (req, res) => {
    const { name } = req.params;
    console.log(name);
    db.Activity.findAll({
        where: {
            name,
        },
    }).then((response) => {
        console.log(response);
        res.json({
            success: true,
        });
    });
});
// DELETE deletes an activity by id
router.delete('/meal/:id', (req, res) => {
    const { id } = req.params;
    db.Activity.destroy({
        where: {
            id,
        },
    }).then((response) => {
        res.json({
            success: true,
        });
    });
});
// PUT updates an activity by id
router.put('/meal/:id', (req, res) => {
    res.send('updates an activity by id');
});
// GET individual activity by id
router.get('/meal/:id', (req, res) => {
    res.send('gets individual activity');
});


router.post('/mealsss', (req, res) => {
    const nutriQ = 'https://trackapi.nutritionix.com/v2/natural/nutrients';

    axios({

            url: nutriQ,
            method: 'POST',

            headers: {
                'Content-Type': 'application/json',
                'x-app-id': '145e3180',
                'x-app-key': '1a1f6f68bf0b4aaebf563a6251c3bba5',

            },
            data: {
                query: req.body.query,
                timezone: 'US/Eastern',
            },


        })
        .then((response) => {
            console.log(response.data);

            res.json(response.data);
        }).catch((err) => {
            console.log(err.message);
            res.send(404);
        });
});

router.get('/weight', (req, res) => {
    db.Weight.findAll()
        .then((weight) => {
            // console.log(weight);
            res.json(weight);
            res.sendFile(path.join(__dirname, '../public', 'index.html'));
        });
});


// POST create, create a new weight
router.post('/weight', (req, res) => {
    console.log(req.body);
    const weight = req.body;
    console.log(weight);
    db.Weight.create(weight)
        .then((results) => {
            res.json({
                success: true,
            });
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                errors: err.errors,
            });
        });
});

module.exports = router;