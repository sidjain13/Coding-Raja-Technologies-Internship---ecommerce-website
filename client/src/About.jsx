import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Alert,AlertTitle ,Button} from '@mui/material';


const About = () => {

  // const [userData,setUserData]=useState({});    //this usestate is used to store data of person after generation token and verify in auth middleware

  // const navigate=useNavigate();   //used to navigate pages
  
  // useEffect(()=>{     //when we open about page then callAboutPage is called once
  //   callAboutPage();  // can't use async function in useeffect hook
  // },[])
  
  // // authenticate using cookie for this use cookie parser

  // const callAboutPage=async()=>{    //callAboutPage is simply go to app2.js in /about get request
  //   try{
 
  //     const res=await fetch("http://localhost:5000/about",{
  //       method:"GET",
  //       headers:{
  //         Accept:"application/json", 
  //         "Content-Type":"application/json"
  //       },
  //       credentials:"include"
  //     });

      
  //     const data=await res.json();    //data store person details coming from app2.js in get /about
  //     // console.log(data);
  //     // console.log(data.name);
  //     setUserData(data);


  //   }
  //   catch(err){
  //     console.log(err);
  //     navigate("/login"); 
  //   }
  // }  
  
  // aboutpage ka main code 
  return (
    <>
    <div className='about_page'>
      {/* <h1 className='about_heading'>Hello about page : </h1> */}

      {/* userData contains data of person details        */}
      {/* <p>{userData.name}</p>
      <p>{userData.email}</p>
      <p>{userData.age}</p>
      <p>{userData.phone}</p> */}
      <div className='home_content'>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi cumque veniam et minima excepturi rem nam dolore provident possimus esse soluta dolores, tempore consectetur libero ea illo, exercitationem porro placeat!.</p>
        
      </div>
      {/* <img className='about_img' src="../images/about.jpeg" alt="error" /> */}
      <img className='image_home' src="../images/profile1.png" alt="error" />
      </div>
    </>
  )
}

export default About;
