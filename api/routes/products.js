const express = require('express');
const router = express();
const mongoose = require('mongoose');
const Product = require('../models/Product');

/////////////////To Get All Data //////////////
router.get('/',(req,resp,next)=>{
    Product.find()
    .select('_id name price')
    .exec()
    .then(data =>{
        const response_data ={
            message :'List of all Product',
            count : data.length,
            product_list : data.map(dt =>{
                    return { name : dt.name,
                        price: dt.price,
                        id:dt.id,
                        request_url : {
                            method:'GET',
                            url : 'http://localhost:3000/products/'+dt._id
                        }
                    }
                })
        }
        resp.status(200).json(response_data);
    })
    .catch(err =>{
        resp.status(500).json(err);
    })  
});
//////////////To UPDATE PRODUCT /////////////////
router.patch('/:productId',(req,resp,next)=>{
    const id = req.params.productId;
    const updateOps = {};
    for(const values of req.body){
        updateOps[values.optName] = values.optValue;
    }
    Product.update({_id:id},{$set:updateOps})
    .exec()
    .then(res=>resp.status(200).json({
        message : 'Update Successfully'
    }))
    .catch(err =>{
        resp.status(500).json(err);
    }) 
});
/////////////////// TO GET PRODCUT////////////////
router.get('/:productId',(req,resp,next)=>{
        const id = req.params.productId;
        Product.findById(id)
        .exec()
        .then(res =>{
                console.log('from Database',res);
            if(res){
                resp.status(200).json(res);
            }else
            {
                resp.status(404).json({
                    message : 'No Valid Data Found'
                });
            }
        })
        .catch(err =>{console.log(err);
            resp.status(500).json({error : err})
        })
    // if(id==='special'){
    //     resp.status(200).json({
    //         message :'product POST special chater added',
    //         productId:req.params.productId
    //     });
    // }else
    // {
    //     resp.status(200).json({
    //         message :'product POST',
    //         productId:req.params.productId
    //     });
    // }
});
/////////////////// TO ADD PRODUCT ////////////
router.post('/:prodName',(req,resp,next)=>{

 
    const product = new Product({
        _id : new mongoose.Types.ObjectId(),
        name : req.body.name,
        price : req.body.price 
    })
    product.save().then(result =>{
        console.log(result);
        resp.status(200).json({
            message : 'Found Your Product',
            product_detail : product
        })
    })
    .catch(error => {
        resp.status(500).json({error : error });
      });

   
})
////////////////// TO DELET PRODUCT ////////////
router.delete('/:productId',(req,resp,next)=>{
    const id = req.params.productId;
    Product.remove({_id:id})
    .exec()
    .then(res=>{resp.status(200).json(res);})
    .catch(error=>{resp.status(500).json(error);})
})
module.exports = router;