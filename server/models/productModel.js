const mongoose=require('mongoose')

const productSchema=new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    price:{
        type: String,
        required: true
    },
    date:{
        type:Date,
        default:Date.now()
    },
    messages:{
        type:String,
        required:true 
    },
    image:{
        type:String,
        required:true 
    },
})


const Product=new mongoose.model('products',productSchema);

module.exports=Product;