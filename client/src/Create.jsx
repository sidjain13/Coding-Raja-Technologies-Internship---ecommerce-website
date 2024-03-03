import React, { useState } from 'react'

const Create = () => {    //used to navigate the pages

  const [setdata,setFullData]=useState({})        //here we are using usestate hook for getting data after user filled data in registration page 

  function entered(event){  //onchange ka khud ka event hota hai 
    const value=event.target.value;     //e.target.value gives value of input tag
    const name1=event.target.name;      //e.target.value gives name of input tag

    setFullData({
      ...setdata,       //spread operator getting previous data
      [name1]:value     //value assign to name1 
    })
  }

//    const logined=async()=>{  //already exist pe click karenge to login pe bhejo
//       navigate('/login');
//     }

  const submitted=async(e)=>{     //e ek event hai 

      // fetch method for accessing post method on app2.js 
      
      const res=await fetch('http://localhost:5000/product',{
        method:'POST',
        body:JSON.stringify({
          name:setdata.name,
          price:setdata.price,
          messages:setdata.messages,
          image:setdata.image
        }),
        headers:{
          "Content-Type" : "application/json"
        },
      })
      

      const data=await res.json();
      alert('product addeded successfully')
      // console.log(data);

    //   if(res.status === 400 ){
    //     alert(data.error);
    //   }
    //   else{
    //     alert(data.msg)
    //     // console.log('success registration');
    //     navigate('/login')
    //   }
  
      
    }

  

  return (
    <div className='login_page'>
    <p>.</p>
    <div className='contact_form'>
    <h1 className='product_heading'>Product Insert</h1>
    {/* calling submitted  */}
      <form  onSubmit={submitted}>   
  <div className="mb-4 input_name"> 
    <input type="text" placeholder=' Name of product ' className="form-control input_tags" name='name' onChange={entered} id="exampleInputEmail1" aria-describedby="emailHelp" />
  </div>
  <div className="mb-4">
   {/* entered call  */}
    <input type="number" placeholder=' Price of product ' className="form-control input_tags" id="exampleInputPassword1" name='price' onChange={entered}/>
  </div>
  <div className="mb-4">

    <input type="text" placeholder=' Any message ' className="form-control input_tags"  name='messages' onChange={entered}/>
  </div>
  <div className="mb-4">
    <input type="text" placeholder=' Image link ' className="form-control input_tags"  name='image' onChange={entered}/>
  </div>
  
  <button type="submit" className="btn mt-4 mb-5 btn-primary" >Submit</button>
</form>
    
    </div>
    </div>
  )
}

export default Create;
