import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Forgot_password = () => {

    const navigate=useNavigate();

  const [data,setdata]=useState({})             //here we are using usestate hook for storing data after person login

  function entered(event){
    const value=event.target.value;
    const name1=event.target.name;

    setdata({
      ...data,
      [name1]:value 
    })
  }
    
  

  const submitted=async(event)=>{
    // console.log(setdata.email);
    // event.preventDefault();       // form ko refersh hone se rokega
    const res=await fetch('http://localhost:5000/forgot_password',{
      method:'POST',
      credentials: 'include',
      body:JSON.stringify({
        email:data.email,
        mobile:data.mobile,
        new_password:data.new_password,
      }),
      headers:{
        "Content-Type" : "application/json"
      },
    })

    const data1=await res.json();
    console.log(data1);

    // console.log(res);

    if(res.status===400){
      // console.log('no login')
      alert(data1.error); 
    }
    else{
        alert(data1.msg)    
      navigate('/login')
      window.location.reload();
    }

  }

  return (
    <div className='login_page'>
    <p>.</p>
    <div className='contact_form'>
    <h1 className='forgot_password_heading'>Forgot Password</h1>
        <form  onSubmit={submitted}>
    <div className="mb-4 input_name"> 
      <input type="email" placeholder='Email ID' className="form-control input_tags" name='email' id="exampleInputEmail1" aria-describedby="emailHelp"  onChange={entered}/>
    </div>
    <div className="mb-4">    
      <input type="number" placeholder='Mobile' className="form-control input_tags" id="exampleInputPassword1" name='mobile' onChange={entered}/>
    </div>

    <div className="mb-4">    
      <input type="password" placeholder='New Password' className="form-control input_tags" id="exampleInputPassword1" name='new_password' onChange={entered}/>
    </div>
      
    <button type="submit" className="btn mt-4 mb-5 btn-primary">Submit</button>   
  </form>
      </div>
      </div>
  )
}

export default Forgot_password
