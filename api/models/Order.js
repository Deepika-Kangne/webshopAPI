const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    productId: { type: mongoose.Types.ObjectId, ref: 'Product', required: true },
    Quantity: { type: Number, default: 1 }
});

module.exports = mongoose.model('Order', OrderSchema);