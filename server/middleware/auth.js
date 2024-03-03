const jwt=require('jsonwebtoken')
const User=require('../models/userRegister')      //requiring UserDetail present in models >register.js me 


// defining middleware auth function
const auth=async(req,res,next)=>{         //next is neccessary for calling next function in middleware function 
    try {
        const token=req.cookies.jwttoken1;   //get token whose named is jwttoken1
        const verifyUser=jwt.verify(token,process.env.SECRET_KEY);   //secret_key from conn.env file 

        // console.log(tokens.token);

        const user1=await User.findOne({_id:verifyUser._id , "tokens.token":token} );
        // console.log(user1);
        if(!user1){throw new Error('user not found')};

        req.token=token;            
        req.user1=user1;          //used in app2.js 

        next();        //if this is not called then we can't escape from auth middleware
                    

    } catch (error) {
        res.status(401).send('unauthorized token');
        console.log(error);
    }    
}

module.exports=auth;        //exporting auth function 