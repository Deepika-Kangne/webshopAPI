const mysql = require('mysql');
const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://deepika:deepika@cluster0-ribaj.mongodb.net/test?retryWrites=true&w=majority', {
  keepAlive: 1,
  useNewUrlParser: true,
  useUnifiedTopology: true
});
// const conn = mysql.createConnection({
//     host:"localhost",
//     user:"root",
//    password:'' ,
//    database: 'rrr'
// });

// conn.connect(function(err){
//     if(err) throw err;
//     console.log('Connected');

// });
// app.get('/',(req,resp)=>{
//     conn.query("SELECT * FROM empy ", function (err, result, fields) {
//         if (err) throw err;
//         // console.log(result);
//         resp.send(result);
//       });

// });

module.exports = app;
