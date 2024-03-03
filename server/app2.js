// requiring modules 

const express=require('express');
const cors=require('cors')              //jab localhost database ka react ka alag ho tab
const app=express();
const mongoose=require('mongoose');
const dotenv=require('dotenv')             // password secure ke liye 
const path=require('path')                  //getting path
const bcrypt=require('bcryptjs')            //for hashing 
const jwt=require('jsonwebtoken')
const cookieParser=require('cookie-parser');
const bodyParser=require('body-parser');    //json wagehra ke liye 
const auth=require('./middleware/auth')   

const {body,validationResult}=require('express-validator')  //for validating the field in register.jsx


const stripe=require("stripe")("sk_test_51NkQDHSG1F80rKm2fP8yagCTcTuxoCcfNy4jgp6xLmCJh5XvTZ36UpKysdGUvIp6YplsLh3pmg2D90wRuNFwDKMw00BeobftDj")

// this is scret key of stripe 


dotenv.config({path:'./conn.env'});         //requiring conn.env file 

const port=process.env.PORT;            //getting port value from conn.env file 

require('./db/conn');                   //requiing database file from db folder

const cart=require('./models/cartModel');    //requiring cartModel.js from models folder
const user=require('./models/userRegister');    //requiring userRegister from models folder
const product=require('./models/productModel');    //requiring productModel.js from models folder
const { promiseHooks } = require('v8');


app.use(cookieParser());
app.use(bodyParser.json())
app.use(express.json());                        //isse json me nahi dikta
app.use(cors({
    origin:"http://localhost:3000",          //this object is very important otherwise
    credentials: true,                         //without these cookie not shown in browser
  }));

  
// app.use(express.urlencoded({extended:false}));          //isse undefined nahi aata


// defining routes 

app.post('/register',[body('email').isEmail()],async(req,res)=>{

    const {name,email,age,phone,password,cpassword}=req.body;      //object destructring

    if(!name ||!email ||!age ||!phone ||!password ||!cpassword){
        return res.status(400).json({error:'plz fill correctly'})
    }   

    // using express-validator here 
    const result=validationResult(req);
    if(!result.isEmpty()){
        return res.status(400).json({error:'please enter valid email'});
    }
    // similarly we can validate all the field in the form 



    try{
        const login_detail=await user.findOne({email:email})
        if(login_detail){
            return res.status(400).json({error:'email already exists'})
        }

        if(password!=cpassword){
            return res.status(400).json({error:'password not match'})
        }
        else{

            const result=new user({
                // {name,email,age,phone,password,cpassword}=req.body;      //object destructring
                name:req.body.name,
                age:req.body.age,
                email:req.body.email,
                phone:req.body.phone,
                password:req.body.password,
                cpassword:req.body.cpassword,
            })
            
                    const result1=await result.save();
                    // console.log(result1);
                    return res.status(200).json({msg:'user registerd successfully'});
        }
    }

    catch(err){
        console.log(err);
    }
})





app.post('/contact',async(req,res)=>{
    const {name,email,message,phone}=req.body;      //object destructring

    if(!name ||!email ||!phone ||!message){
        return res.json({error:'plz fill correctly'})   
    }

    try{
        
        const message_detail=await user.findOne({email:email})
        if(message_detail){
                const userMessage=await message_detail.addmessage(name,email,phone,message);

                await message_detail.save();

                res.status(201).json({message:"msg success"})
        }
    }

    catch(err){
        console.log(err);
    }
})




// for login 

app.post('/login',async(req,res)=>{
    try{
        const {email,password}=req.body;

        if(!email || !password){
            return res.status(400).json({error:'plz fill correctly'});
        }

        const login_detail1=await user.findOne({email:email})


        // bcrypt starting from here 
        

    //     if(!login_detail1){
    //         return res.status(400).json({error:'login fail'});
    //     }
    //     if(login_detail1){
    //         const result=await bcrypt.compare(password,login_detail1.password);
    //             console.log(password);
    //             console.log(login_detail1.password);
    //             console.log(result);
    //                     if(result===true){
    //                     const token=await login_detail1.generateAuthToken();   
            
    //                     // cookie created here whose name is jwt1 
    //                     res.cookie('jwttoken1',token,{ 
    //                         expires:new Date(Date.now() + 3000000 ),   //cookie expiring time
    //                         httpOnly:true,
    //                         secure:true,    
    //                     });
    //                     return res.status(200).json({msg:'login success'})
    //                 }

    //                 // else block 
    //             }                    
    //     else{
    //         console.log('user login fail');
    //         return res.status(400).json({error:'login fail'});
    //     }
      
   
    // }

    // catch(err){
    //     console.log(err);
    // }

    
                
                
                
                


        // without bcrypt code 
        if(!login_detail1){
            return res.status(400).json({error:'login fail'});
        }
        if(password===login_detail1.password){
            // console.log('user login success');
            const token=await login_detail1.generateAuthToken();
            // console.log('token is : ',token);   

            // cookie created here whose name is jwt1 
            res.cookie('jwttoken1',token,{ 
                expires:new Date(Date.now() + 3000000000 ),   //cookie expiring time
                httpOnly:true,
                secure:true,    
            });

            const verifyUser=jwt.verify(token,process.env.SECRET_KEY);   //secret_key from conn.env file 

        // console.log(tokens.token);

        const user1=await user.findOne({_id:verifyUser._id , "tokens.token":token} );
        console.log(user1.email)

        res.cookie('user_role',user1.role,{ 
            expires:new Date(Date.now() + 3000000000 ),   //cookie expiring time
            httpOnly:true,
            secure:true,    
        });
        res.cookie('name',user1.name,{ 
            expires:new Date(Date.now() + 3000000000 ),   //cookie expiring time
            httpOnly:true,
            secure:true,    
        });

            // console.log(req.cookies);
            // console.log(req.cookies.jwttoken1);
            return res.status(200).json({msg:'login success'})
        }
        else{
            console.log('user login fail');
            return res.status(400).json({error:'login fail'});
        }
        
    }
    catch(err){
        console.log(err);
    }
})

// for forgot_password 

// app.post('/forgot_password',async(req,res)=>{
//     try{
//         const {email,old_password,new_password}=req.body;

//         if(!email || !old_password || !new_password){
//             return res.status(400).json({error:'plz fill correctly'});
//         }

//         const login_detail1=await user.findOne({email:email,password:old_password})

//         // without bcrypt code 
//         if(login_detail1){
//             await user.updateOne({email:email},{$set:{password:new_password}})
//             return res.status(200).json({msg:'password changed successfully'});
//         }
       
//         else{
//             console.log('user login fail');
//             return res.status(400).json({error:'invalid credential'});
//         }
      
   
//     }
//     catch(err){
//         console.log(err);
//     }
// })





app.post('/forgot_password',async(req,res)=>{
    try{
        const {email,mobile,new_password}=req.body;

        if(!email || !mobile || !new_password){
            return res.status(400).json({error:'plz fill correctly'});
        }

        const login_detail1=await user.findOne({email:email,phone:mobile})

        // without bcrypt code 
        if(login_detail1){
            await user.updateOne({email:email},{$set:{password:new_password}})
            return res.status(200).json({msg:'password changed successfully'});
        }
       
        else{
            console.log('user login fail');
            return res.status(400).json({error:'invalid credential'});
        }
      
   
    }
    catch(err){
        console.log(err);
    }
})









// for payment gateway 
app.post('/payment',async(req,res)=>{
    const {products}=req.body;    //the array from Payment.jsx come here
    // console.log(products);
    // console.log(products[0].product_name);
    

//     // map is used b/c this is an array 
// //     // in lineItems LHS or key is used in the page of stripe and RHS or value is used to give value from the array 
    const lineItems=products.map((p)=>({
                    price_data:{
                        currency:"inr",
                        product_data:{
                            name:p.product_name
                        },
                        unit_amount:p.product_price*100,
            
                    },
                    quantity:p.quantity
    }));


  const session = await stripe.checkout.sessions.create({
   
    payment_method_types:['card'],
    line_items:lineItems,
    mode: 'payment',
    success_url: `http://localhost:3000/home`,   //Success.jsx
    cancel_url: `http://localhost:3000/product`,      //cancel.jsx
  });


  res.json({id:session.id})

  const data=await cart.deleteMany({user_id:products[0].user_id})

});


    


// // for payment gateway 
// app.post('/payment',async(req,res)=>{
//     const {products}=req.body;    //the array from Payment.jsx come here
//     console.log(products);
    

//     // map is used b/c this is an array 
//     // in lineItems LHS or key is used in the page of stripe and RHS or value is used to give value from the array 
//     const lineItems=products.map((product)=>({
//                     price_data:{
//                         currency:"inr",
//                         product_data:{
//                             name:product.name
//                         },
//                         unit_amount:product.price*100,
            
//                     },
//                     quantity:product.quantity
//     }));


//   const session = await stripe.checkout.sessions.create({
   
//     payment_method_types:['card'],
//     line_items:lineItems,
//     mode: 'payment',
//     success_url: `http://localhost:3000/success`,   //Success.jsx
//     cancel_url: `http://localhost:3000/cancel`,      //cancel.jsx
//   });


//   res.json({id:session.id})
// });


    
      



// app.get("/about",auth,(req,res)=>{  //auth middleware is calling 
//     res.send(req.user1);            //req.user1 getting data from auth middleware
//     // return res.status(200).json('about page');
// })


app.get("/contact",auth,(req,res)=>{//auth middleware is calling 
    res.send(req.user1);            //req.user1 getting data from auth middleware
    // return res.status(200).json('about page');
})

app.get("/home",auth,(req,res)=>{   //auth middleware is calling 
    res.send(req.user1);            //req.user1 getting data from auth middleware

    // console.log(req.cookies.name)
    // res.send(req.cookies.name)
    // return res.status(200).json('about page');
})


app.get("/logout",(req,res)=>{
    console.log('logout success');
    res.clearCookie('jwttoken1');     //clearing cookie named jwttoken1
    return res.status(200).json('logout success');
})






// after clicking the add to cart the details of the product is saved in the cart table this is used in card.js
app.post('/cartDetails',async(req,res)=>{
    const data=req.body;
    // console.log(data);

    const data1=await cart.findOne({user_id:req.body.user_id,product_name:req.body.product_name}) 

    if(!data1){
        try{
            const result=new cart({
                   // {user_id,prod,age,phone,password,cpassword}=req.body    //object destructring
                   user_id:req.body.user_id,
                   // product_id:req.body.product_id,
                   product_name:req.body.product_name,
                   product_price:req.body.product_price,
                   messages:req.body.messages,
                   image:req.body.image,
                   quantity:1
   
               })
               
                       const result1=await result.save(); //saving in the cart table 
                       // console.log(result1);
                       // return res.status(200).json({msg:'user registerd successfully'});
           
       }
   
       catch(err){
           console.log(err);
           // return res.status(400).json({msg:"error aa gaye re beta"})
       }
    }

    

})







// it is used to display the product present in cart for particular login person and display the result from cart table 
app.get('/carts',auth,async(req,res)=>{
    const data=await cart.find({user_id:req.user1.email})      //database me find karega uss particular email wale data ko 
    // console.log(data);
    res.send(data)      //ye send karega carts.js wale page me 
})




// this is used in card.js so that after clicking add to cart the email of login person is set in the database 
app.get('/card',auth,async(req,res)=>{
    res.send(req.user1);
})


// used to delete the product from the cart 
app.post('/delete_product',auth,async(req,res)=>{
    const data=await cart.deleteOne({product_name:req.body.product_name,user_id:req.user1.email})
    console.log(data);
    console.log('product deleted from cart');
})

// used to increment the product from the cart 
app.post('/increment_product',auth,async(req,res)=>{
    const d=await cart.findOne({product_name:req.body.product_name,user_id:req.user1.email})

    const data=await cart.updateOne({product_name:req.body.product_name,user_id:req.user1.email},{$set:{quantity:d.quantity+1}})
    console.log(data);
    console.log('product incremented ');
})

// used to decrement the product from the cart 
app.post('/decrement_product',auth,async(req,res)=>{
    const d=await cart.findOne({product_name:req.body.product_name,user_id:req.user1.email})

    if(d.quantity==1){
        const data=await cart.deleteOne({product_name:req.body.product_name,user_id:req.user1.email})
        console.log('product deleted');
    }
    else{

        const data=await cart.updateOne({product_name:req.body.product_name,user_id:req.user1.email},{$set:{quantity:d.quantity-1}})
        console.log(data);
        console.log('product decremented ');
    }
})







// inserting data into product model 
app.post('/product',async(req,res)=>{
    const data=req.body;
    // console.log(data);

    try{
         const result=new product({
                name:req.body.name,
                price:req.body.price,
                messages:req.body.messages,
                image:req.body.image,
            })
            
                    const result1=await result.save(); //saving in the product table 
                    console.log('product successfully added');
                    // console.log(result1);
                    // return res.status(200).json({msg:'user registerd successfully'});
        
    }

    catch(err){
        console.log(err);
    
        // return res.status(400).json({msg:"error aa gaye re beta"})
    }

})


// getting product from product table 
app.get('/getProduct',async(req,res)=>{
    const data=await product.find()
    // console.log(data);
    res.send(data)
})




// getting token for toggling navbar 
app.get('/navbarData',async(req,res)=>{
    const data=req.cookies.jwttoken1;
    const role=req.cookies.user_role;
    // console.log(data);
    if(data && role=='user'){
        return res.status(200).json({msg:'loginhaibeta'})
    }
    else if(data && role=='admin'){
        return res.status(200).json({msg:'adminaayare'})

    }
    else{
        return res.status(400).json({msg:'loginnahihaibeta'})
    }
})

// app is listening on the 5000 port coming from conn.env 
app.listen(port,()=>{
    console.log(`server is running on port ${port} : `)
})