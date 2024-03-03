import React, { useEffect, useState } from 'react'
// import data from './Services_data';     //importing data from services_data.jsx 
import { useNavigate } from 'react-router-dom';
import { Alert } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// this is a card component used in skills page 
const Card = () => {

  // const [data1,setdata]=useState(data)  //simple array ka data lene ke liye 

  const navigate=useNavigate();   //used to navigate pages



  const [userData,setUserData]=useState({});   //jo particular login hoga uska data store karne ke liye 
  
  useEffect(()=>{
    getEmail();  
  },[])

  const getEmail=async()=>{    

      try{
        const res=await fetch("http://localhost:5000/card",{
        method:"GET",
        headers:{
          Accept:"application/json", 
          "Content-Type":"application/json"
        },
        credentials:"include"
      });

      
      const d=await res.json();    
      console.log(d.email);
      setUserData(d);
      }
      
      catch(err){
        console.log(err);
        navigate('/login')
      }
      
  }  



  // getting product from the product table
  const [data2,setdata2]=useState([]) 

  useEffect(()=>{
    product1();  
  },[])

  const product1=async(req,res)=>{
    try{
        const res=await fetch("http://localhost:5000/getProduct",{
        method:"GET",
        headers:{
          Accept:"application/json", 
          "Content-Type":"application/json"
        },
        credentials:"include"
      });

      
      const d=await res.json();  
      setdata2(d);
      }
      
      catch(err){
        console.log(err);      
       }  
  }


  
  
  return (


    // <div className='card_page'>
    <div className='card_page'>
    <p>.</p>
    <div className='dibba' >
    {
    
      data2.map((element,id)=>{
        return (
          <>
          <div  className='card_detail'>
  <img src={element.image} class="card-img-top" alt="error" />
  <div class="card-body">
    <h5 class="card-text">{element.name}</h5>
    <p class='card-text'> ₹ {element.price}</p>
    <p class="card-text">{element.messages}</p>   
    <a href="#" class="btn btn-primary"  onClick={async()=>{
      // alert('product added to cart');
      toast.success('Product added to cart', {
position: "top-center",
autoClose: 2000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "colored",
});

      // <div >
      //   <Alert variant="filled" className='pop_up1' >Product Added To Cart</Alert>
      // </div>

      const res=await fetch('http://localhost:5000/cartDetails',{
        method:'POST',
        body:JSON.stringify({
          user_id:userData.email,     //getting email of the person login
          // user_id:'004',
          // product_id:"200",
          product_name:element.name,
          product_price:element.price,  
          messages:element.messages,
          image:element.image
        }),
        headers:{
          "Content-Type" : "application/json"
        },
      })
    }}  >Add to cart</a>
  </div>
</div>
          </>
        )
      })
    }
    </div>
    <p>.</p>
    <ToastContainer/>
    </div>
  )
}

export default Card
