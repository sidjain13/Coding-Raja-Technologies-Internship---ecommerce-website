// const express=require('express');
// const cors=require('cors')   
// const app=express();
// const mongoose=require('mongoose');
// const bodyParser=require('body-parser'); 

// require('./db/conn');  

// const cart=require('./models/cartModel');  

// app.use(cookieParser());
// app.use(bodyParser.json())
// app.use(express.json());                        //isse json me nahi dikta
// app.use(cors({
//     origin:"http://localhost:3000",          //this object is very important otherwise
//     credentials: true,                         //without these cookie not shown in browser
//   }));


// app.post('/cartDetails',async(req,res)=>{
//     // const a=req.body;
//     // console.log(a);
//     return res.status(200).json({msg:'successfull'})
// })


// app.listen(port,()=>{
//   console.log(`server is running on port ${port} : `)
// })