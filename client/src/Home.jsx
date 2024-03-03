import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {



  const [userData,setUserData]=useState({});      //getting data from the after getting auth middleware verify token and getting data of current login 
  const navigate=useNavigate();
  
  useEffect(()=>{
    callAboutPage();  // can't use async function in useeffect hook
  },[])

  const home_navigate=()=>{
    navigate('/login');
  }
  
  // authenticate using cookie

  const callAboutPage=async()=>{
    try{
 
      const res=await fetch("http://localhost:5000/home",{
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
      setUserData(data);          //data contain user details

      

    }
    catch(err){

      console.log(err);
      // navigate("/login"); 

    }
  }  











  

  return (
    <div className='home_page'>
      {/* <h1 className='home_heading'>hello home page : </h1>
      <p className='home_name' >{userData.name}</p> */}
      {/* <img className='image_home' src="../images/profile1.png" alt="error" /> */}

      <div className='home_content'>
        {/* {userData.length===0 ? <h1>E-Commerce</h1>:<h1>Hello {userData.name}</h1>} */}
        {Object.keys(userData).length===0 ? <h1>E-Commerce</h1>:<h1>Hello {userData.name}</h1>}
        <p>My vision is to build an e-commerce ecosystem that allows consumers and businesses to do all aspects of business online.</p>
        <button className='btn btn-primary' style={{backgroundColor:'darkgray'}} onClick={home_navigate}>Explore More</button>
      </div>
      
      {/* <img className='home_image'  src="../images/home_image.jpg" alt="error" /> */}
      
      {/* <h1 className='text-red-500 font-bold bg-black--'>hello</h1> */}
    </div>
  )
}

export default Home
