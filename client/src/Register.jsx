import React, { useState } from 'react'
import Footer from './Footer';
import {useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login_with_google from './Login_with_google';
// // for login with google functionality
// import { GoogleOAuthProvider } from '@react-oauth/google';
// import { GoogleLogin } from '@react-oauth/google';
// import jwt_decode from 'jwt-decode';


const Register = () => {

  const navigate=useNavigate();    //used to navigate the pages

  const [setdata,setFullData]=useState({})        //here we are using usestate hook for getting data after user filled data in registration page 

  function entered(event){  //onchange ka khud ka event hota hai 
    const value=event.target.value;     //e.target.value gives value of input tag
    const name1=event.target.name;      //e.target.value gives name of input tag

    setFullData({
      ...setdata,       //spread operator getting previous data
      [name1]:value     //value assign to name1 
    })
  }



   const logined=async()=>{  //already exist pe click karenge to login pe bhejo
      navigate('/login');
    }

  const submitted=async(e)=>{     //e ek event hai 

    
      e.preventDefault();     //form ko refresh hone se rokega

      // fetch method for accessing post method on app2.js 
      
      const res=await fetch('http://localhost:5000/register',{
        method:'POST',
        body:JSON.stringify({
          name:setdata.name,
          // age:setdata.age,
          age:20,
          phone:setdata.phone,
          email:setdata.email,
          password:setdata.password,
          cpassword:setdata.cpassword
  
        }),
        headers:{
          "Content-Type" : "application/json"
        },
      })
      

      const data=await res.json();
      // console.log(data);

      if(res.status === 400 ){
        alert(data.error);
        window.location.reload()
      }
      else{
        alert(data.msg)
        // toast(data.msg)
        // console.log('success registration');
        navigate('/login')
      }
  
      
    }

  

  return (
    
    <div className='login_page'>
    <p>.</p>
    <div className='contact_form' >
    {/* calling submitted  */}
      <form  onSubmit={submitted}>   
  <div className="mb-4 input_name"> 
  <h1 className='register_heading'>Register</h1>
    <input type="text" placeholder='Full Name' className="form-control input_tags" name='name' onChange={entered} id="exampleInputEmail1" aria-describedby="emailHelp" />
  </div>
  {/* <div className="mb-4">
    <input type="number" placeholder='Age' className="form-control input_tags" id="exampleInputPassword1" name='age' onChange={entered}/>
  </div> */}
  <div className="mb-4">

    <input type="number" placeholder='Mobile No.' className="form-control input_tags"  name='phone' onChange={entered}/>
  </div>
  <div className="mb-4">
    <input type="email" placeholder='Email ID' className="form-control input_tags"  name='email' onChange={entered}/>
  </div>
  <div className="mb-4">
    <input type="password" placeholder='Password' className="form-control input_tags"  name='password' onChange={entered}/>
  </div>
  <div className="mb-4">
    <input type="password" placeholder='Confirm Password' className="form-control input_tags"  name='cpassword' onChange={entered}/>
  </div>
  <button type="submit" className="btn mt-4 mb-5 btn-primary" >Register</button>
  <p onClick={logined} className='register_create'>Already register ?</p>
</form>


{/* {<Login_with_google/>} */}






    {/* <Footer/> */}
    {/* <div>
    <GoogleOAuthProvider clientId="1066048008781-r2krvf2v1etjtk6h4n0ohaljqae04k00.apps.googleusercontent.com">


<GoogleLogin
  onSuccess={credentialResponse => {
    const details=jwt_decode(credentialResponse.credential);
    console.log(details);
    console.log(credentialResponse);
  }}
  onError={() => {
    console.log('Login Failed');
  }}
/>

</GoogleOAuthProvider>

    </div> */}
    </div>
    <ToastContainer />
    </div>
    


    
  )
}

export default Register;
