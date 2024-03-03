import React from 'react'
import {loadStripe} from '@stripe/stripe-js';    //for payment 




const make_payment=async()=>{

   
  
  
  const stripe = await loadStripe('pk_test_51NkQDHSG1F80rKm2dNFFXW0WIc7Vu6UEH9cfyeDKdBmNV27UyBPjn2pBP5CNvUJuK4pCQRh0ikJS4ZrdXovdUpOd00WSe7sL1E');

// this is publisher key of stripe you get it from the stripe website 

    // this is passed to the backend , this is a array
    const obj = [{name: "John",price:55,quantity:2},{name:"hii",price:60,quantity:3}];


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

    if(result.error){
        console.log(result.error);
    }
}

const Payment = () => {
  return (
    <div>
        <button onClick={make_payment}>Make Payment</button>    
    </div>
  )
}

export default Payment
