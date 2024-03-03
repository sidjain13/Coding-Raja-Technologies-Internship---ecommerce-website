import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const [userData,setUserData]=useState({name:"",email:"",phone:"",message:""});
  const navigate=useNavigate();
  
  useEffect(()=>{
    callAboutPage();  // can't use async function in useeffect hook
  },[])
  
  // authenticate using cookie for this use cookie parser

  const callAboutPage=async()=>{      //it go on app2.js get request /contact
    try{
 
      const res=await fetch("http://localhost:5000/contact",{
        method:"GET",
        headers:{
          Accept:"application/json", 
          "Content-Type":"application/json"
        },
        credentials:"include"
      });


      const data=await res.json(); 
      // console.log(data);
      // console.log(data.name);
      setUserData({...userData,name:data.name,email:data.email,phone:data.phone});
      //...userData here ... is a spread operator


    }
    catch(err){

      console.log(err);
      navigate("/login"); 

    }
  }  

  const handleInput=(e)=>{            //here we get data from the input tag
    const name=e.target.name;
    const value=e.target.value; 

    setUserData({...userData,[name]:value})
  }


  const contactForm=async(e)=>{         //after submitting this function is called
    e.preventDefault();       //form ko refresh hone se rokega

    const {name,email,phone,message}=userData;

    const res=await fetch('http://localhost:5000/contact',{
        method:'POST',
        body:JSON.stringify({
          name:userData.name,
          phone:userData.phone,
          email:userData.email,
          message:userData.message,
         
        }),
        headers:{
          "Content-Type" : "application/json"
        },
      })
  
      const data=await res.json();
      console.log(data);            //data contain message after we click on send
  
      if(data.status===422 || !data){
        console.log('no message send')
      }
      else{
        console.log('message successfully send');
        alert('message successfully send');
        setUserData({...userData,message:""});     //message ka data submit hone ke baad form ka data clean ho jayega
        // navigate('/login')
      }


  }
  return (
    <>
    <div className='login_page'>
    <p>.</p>
    <div className='contact_container'>
      {/* <h1>hello contact page : </h1> */}
      <div className='contact_container1'>
        <p>name</p>
        <p>SIDDHANT JAIN</p>
      </div>
      <div  className='contact_container1'>
        <p>phone</p>
        <p>7999160304</p>
      </div>
      <div className='contact_container1'>
        <p>email</p>
        <p>bjsiddhu2003@gmail.com</p>
      </div>
    </div>

    <div className='contact_container2'>
      {/* hello
       */}
       <h1>Get In Touch</h1>
       <input type="text" className='contact_get_in_touch' placeholder={userData.name} value={userData.name} onChange={handleInput} name='name' />
       <input type="text" className='contact_get_in_touch' placeholder={userData.email} value={userData.email} onChange={handleInput}name='email' />
       <input type="text" className='contact_get_in_touch' placeholder={userData.phone} value={userData.phone} onChange={handleInput} name='phone' />
       <br />
       {/* <input type="text" placeholder='Your Phone no. : ' name='fname1' /> */}
       <textarea name="message" className='contact_get_in_touch' id="hello" cols="70" rows="5" value={userData.message} onChange={handleInput}placeholder='Message : '></textarea>
       <br />
       <button className='contact_btn' onClick={contactForm}>Send Message</button>
    </div>
    <p>.</p>
    </div>
    </>
  )
}

export default Contact
