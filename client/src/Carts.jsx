import React, { useEffect, useState } from 'react'
import {loadStripe} from '@stripe/stripe-js';    //for payment 
import DeleteIcon from '@mui/icons-material/Delete';
import ControlPointOutlinedIcon from '@mui/icons-material/ControlPointOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Carts =() => {

    const [userData,setUserData]=useState([]);    //in this we store the items to display in cart

    useEffect(()=>{     //when we open about page then callAboutPage is called once
      callCartItem();  // can't use async function in useeffect hook
      // window.location.reload();
    },[])

    const callCartItem=async()=>{
      const res=await fetch('http://localhost:5000/carts',{
      method:'GET',
      headers:{
        "Content-Type" : "application/json"
      },
      
      credentials:"include"
    })

    const data=await res.json()
    console.log(data);

    setUserData(data)
    }


      // for payment 
    const make_payment=async()=>{

   
  
      const stripe = await loadStripe('pk_test_51NkQDHSG1F80rKm2dNFFXW0WIc7Vu6UEH9cfyeDKdBmNV27UyBPjn2pBP5CNvUJuK4pCQRh0ikJS4ZrdXovdUpOd00WSe7sL1E');
    
    // this is publisher key of stripe you get it from the stripe website 
    
        // this is passed to the backend ,this is a array
        // const obj = [{name: "John",price:55,quantity:2},{name:"hii",price:60,quantity:3}];
        const obj = userData
    
    
        const body={
          products:obj
        }
    
        // fetch request backend pe jayegi 
    
    
       
          const response=await fetch('http://localhost:5000/payment',{
            method:'POST',
            credentials: 'include',
            body:JSON.stringify(body),
            headers:{
              "Content-Type" : "application/json"
            },
          })
        
        // here we get object in this we get id 
        const session=await response.json();
    
        // after getting the id from the backend then we go on the checkout page 
        const result=stripe.redirectToCheckout({
            sessionId:session.id
    
        })

        if(result.success){
          alert('payment successful')
        }
    
        if(result.error){
            console.log(result.error);
            alert('payment unsuccessful')
        }
        
        
    }


    

    return (
      <>
      {/* <div> */}
        {/* {userData.length===0 ?<h1 style={{border:'2px solid black' , width:'25rem'}}>cart is empty 😲</h1>:null} */}
       
        {userData.length===0 ? <img src="images/cart_empty.jpeg" alt="error" className='cart_empty' /> :null}
      
      <div className='cart_page'>
      {/* <div > */}
      <p>.</p>
        <div className='dibba' >
        {
          /* getdata.map((element,id)=>{ */
          userData.map((element,id)=>{
            return (
              <>
              <div  className='card_detail' style={{width: '18rem'}}>
      <img src={element.image} class="card-img-top"  alt="error" />
      <div class="card-body">
        <h5 class="card-text" style={{fontWeight:'bolder'}}>{element.product_name}</h5>
        <p class="card-text" style={{fontWeight:'bolder'}}>₹ {element.product_price}</p>
        <p class="card-text" style={{marginBottom:'2rem'}}>{element.messages}</p>

        {/* for deletion  */}
        <span onClick={async()=>{
          alert('product deleted from cart')
//           toast.success('Product Deleted', {
// position: "top-center",
// autoClose: 2000,
// hideProgressBar: false,
// closeOnClick: true,
// pauseOnHover: true,
// draggable: true,
// progress: undefined,
// theme: "colored",
// });
          window.location.reload(false);
          const res=await fetch('http://localhost:5000/delete_product',{
      method:'POST',
      headers:{
        "Content-Type" : "application/json"
      },
      body:JSON.stringify({
          product_name:element.product_name
      }),
      
      credentials:"include"
    })
        }} className='cart_delete_icon'><DeleteIcon fontSize='large'/></span>
        
        
       

        {/* for increment  */}
        <span onClick={async()=>{
          
          alert('product incremented from the cart');
          // window.location.reload(false);
  
          const res=await fetch('http://localhost:5000/increment_product',{
      method:'POST',
      headers:{
        "Content-Type" : "application/json"
      },
      body:JSON.stringify({
          product_name:element.product_name
      }),
      
      credentials:"include"
    })
    // .then(() => {
    //   console.log("bc")
    //   window.location.reload()
    // });
    // window.location.reload(false)
   
          // window.location.reload(false);
          // window.location.reload(false);
        }
        
        } className='cart_plus_icon'><ControlPointOutlinedIcon fontSize='large'/>
         <strong style={{fontSize:'1.5rem',marginLeft:'1rem'}} >{element.quantity}</strong></span>

        {/* for decrement  */}
        <span onClick={async()=>{
          alert('product decremented from the cart');
          window.location.reload(true);
          window.location.reload(true);
          const res=await fetch('http://localhost:5000/decrement_product',{
      method:'POST',
      headers:{
        "Content-Type" : "application/json"
      },
      body:JSON.stringify({
          product_name:element.product_name
      }),
      
      credentials:"include"
    })
    // window.location.reload();
        }}
        className='cart_minus_icon'> <RemoveCircleOutlineOutlinedIcon fontSize='large'/> </span>
       

      
      </div>
    </div>


    
              </>
            )
          })
        }
          
    
    
        </div>
      
        {/* {userData.length===0 ?<h1>cart is empty</h1>:null} */}
        






        
        
        {userData.length===0 ?null:<div>
        {/* for payment  */}
            <button onClick={make_payment} class='btn btn-primary' style={{margin:'3rem',marginLeft:'40vw',backgroundColor:'green' }}>Make Payment</button>    
        </div>}

        </div>
        <ToastContainer/>
        <p>.</p>
        {/* </div> */}
     </> )

   
}

export default Carts
