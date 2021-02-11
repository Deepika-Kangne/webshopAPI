const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    _id : mongoose.Types.ObjectId,
    name :  {type : String ,required:true},
    price : {type : Number ,required:true}
});

module.exports = mongoose.model('Product',ProductSchema);