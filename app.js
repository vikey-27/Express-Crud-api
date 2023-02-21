const express=require('express');
const User=require('./models/user');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const create_get_routes=require('./routes/create-get');

const app=express();

app.use(bodyParser.json());


app.use('/',create_get_routes);


app.use((error,req,res,next)=>{
    if(res.headerSent)
    {
        return next(error)
    }
    return res.status(error.code || 500).json(error.message||'An unknown error occured');

})


mongoose.connect('mongodb+srv://<name>:<password>@cluster0.zl7nk.mongodb.net/Crud?retryWrites=true&w=majority').then(()=>{
    app.listen(5000);
}).catch((err)=>{
    console.log(err);
})

