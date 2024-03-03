const mongoose=require('mongoose')

const cartSchema=new mongoose.Schema({
    user_id:{
        type: String,
        required: true
    },
    // product_id:{
    //     type: String,
    //     required: true,
    // },
    product_name:{
        type: String,
        required: true
    },
    product_price:{
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
    quantity:{
        type:Number,
        required:true
    }
})


const Cart=new mongoose.model('carts',cartSchema);

module.exports=Cart;