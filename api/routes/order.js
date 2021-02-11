const express = require('express');
const router = express();
const mongoose = require('mongoose');
const Orders = require('../models/Order');

router.get('/', (req, resp, next) => {
    Orders.find().select('_id productId Quantity').exec().then(result => {
        resp.status(200).json(result);
    }).catch(error => {
        resp.status(200).json(error)
    })

});

router.post('/', (req, resp, next) => {
    console.log(req.body.product_id);

    ////////////////Object variables Object is been created and model where object is define should have same variable names case sensitive////
    const orderobj = new Orders({
        _id: new mongoose.Types.ObjectId(),
        productId: req.body.product_id,
        Quantity: req.body.quantity
    })

    orderobj.save().then(result => {
        console.log(result);
        resp.status(200).json(result);
    }).catch(error => {
        resp.status(500).json(error);
    })
});

router.delete('/:orderId', (req, resp, next) => {
    const id = req.params.orderId
    Orders.remove({ _id: id }).exec().then(result => {
        resp.status(200).json(result);
    }).catch(error => {
        resp.status(200).json(error)
    })
});

router.patch('/:Id', (req, resp, next) => {
    const id = req.params.Id;
    if (id === 'special') {
        resp.status(200).json({
            message: 'orders POST special chater added',
            productId: id
        });
    } else {
        Orders.find({ _id: id }, function (err, order) {
            if (err) {
                res.send(err);
            }
            else {
                resp.status(200).json({
                    message: 'orders POST',
                    productId: order
                });
            }
        });

    }
});

module.exports = router;