const mongoose=require('mongoose')
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken')

const userSchema=new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
    },
    phone:{
        type: String,
        required: true
    },
    age:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true,
        maxlength:1000 
    },
    cpassword:{
        type: String,
        required: true
    },
    role:{
        type: String,
        default:'user'
    },
    tokens:[{
        token:{
            type:String,
            required:true,
        }
    }],
    date:{
        type:Date,
        default:Date.now()
    },
    messages:[{
        name:{
            type: String,
            required: true
        },
        email:{
            type: String,
            required: true,
           
        },
        phone:{
            type: String,
            required: true
        },
        message:{
            type: String,
            required: true
        },
        
    }],
})

// ***************** HASHING CODE USING BCRYPT *****************

// userSchema.pre('save',async function(next){
//     // if(this.isModified('password')){
//         this.password=await bcrypt.hash('this.password',10);
//         this.cpassword=await bcrypt.hash('this.cpassword',10);
//     // }

//     next();
// });

// *************** END ****************



// **********************cookie code************************
userSchema.methods.generateAuthToken=async function(){
    try{
        const token = await jwt.sign({_id:this._id.toString()},process.env.SECRET_KEY)
        // console.log(token);

        this.tokens=this.tokens.concat({token:token});
        await this.save();

        return token;       //jisse jo function call kare wo use kar sake 
    }
    catch(err){
        console.log(err);
    }
}
// ************************end***********************




// ***********************start**********************
// message in contact form is store in the database code 
userSchema.methods.addmessage=async function(name,email,phone,message){
    try{
        this.messages=this.messages.concat({name:name,email:email,phone:phone,message:message});
        await this.save();
        return this.message;
    }
    catch(err){
        console.log(err);
    }
}
// *****************************end******************************



const User=new mongoose.model('users',userSchema);

module.exports=User;