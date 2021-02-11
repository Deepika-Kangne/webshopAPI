var app = require('./index.js');
var morgan = require('morgan');
var bodyparser = require('body-parser');
var productRoutes = require('./api/routes/products');
var orderRoutes = require('./api/routes/order');

app.use(morgan('combined'));
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

app.use((req,resp,next)=>{
    resp.header('Access-Control-Allow-Origin','*');
    resp.header('Access-Control-Allow-Headers','Origin,Content-Type,Authourization,Accept');

    if(req.method ==='OPTIONS')
    {
        resp.header('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELTE');
    }
    next();
})

//handle routes 
app.use('/products',productRoutes);
app.use('/orders',orderRoutes);

app.use((req,resp,next)=>{
    const error = new Error();
    resp.status(404);
        next(error);
})

app.use((error,req,resp,next)=>{
    resp.status(error.status || 500);
    resp.json({
        error:{
            message :error.message+'Worng url'
        }
    })
})

app.listen(3000,()=>console.log('Server started at port localhost:3000'));

