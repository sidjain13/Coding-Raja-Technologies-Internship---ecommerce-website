import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from './App';
import Login_with_google from './Login_with_google';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.min.css';

const Login = () => {

  const {state,dispatch}=useContext(UserContext);   //using useContext hook for toggle login - logout

  const navigate=useNavigate();

  const [data,setdata]=useState({})             //here we are using usestate hook for storing data after person login

  function entered(event){

    // console.log(event.target);
    const value=event.target.value;
    const name1=event.target.name;

    setdata({
      ...data,
      [name1]:value 
    })

    // console.log(data);
  
  }
  const registered=async()=>{
    navigate('/register');
  }
  
  const forgot_passoword=async()=>{
    navigate('/forgot_password');
  }

  const submitted=async(event)=>{
    // console.log(setdata.email);
    event.preventDefault();       // form ko refersh hone se rokega
    const res=await fetch('http://localhost:5000/login',{
      method:'POST',
      credentials: 'include',
      body:JSON.stringify({
        email:data.email,
        password:data.password,
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
      // toast.error(data1.error, {
      //   position: "top-center",
      //   autoClose: 2000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "colored",
      //   });
        // window.location.reload();
           window.location.reload();
    }
    else{
      // console.log('success login');
      alert(data1.msg);
//               toast.success(data1.msg, {
// position: "top-center",
// autoClose: 2000,
// hideProgressBar: false,
// closeOnClick: true,
// pauseOnHover: true,
// draggable: true,
// progress: undefined,
// theme: "colored",

// });
      // dispatch({type:'USER',payload:true})    //this is used in toggling login - logout and used in reducer folder
      navigate('/home')
      window.location.reload();
    }


  }




  return (
    <>
    {/* D:\web development\e commerce website\client\public\images\star_image.jpeg */}
    {/* <img src="images/login_image.jpg" alt="error" /> */}
      <div className='login_page'>
      <p>.</p>
     
      <div className='contact_form'>
        <form  onSubmit={submitted}>
    <div className="mb-4 input_name"> 
    <h1 className='login_heading'>Login</h1>
      <input type="email" placeholder='Email ID' className="form-control input_tags" name='email' id="exampleInputEmail1" aria-describedby="emailHelp"  onChange={entered}/>
    </div>
    <div className="mb-4">
    
      <input type="password" placeholder='Password' className="form-control input_tags" id="exampleInputPassword1" name='password' onChange={entered}/>
    </div>
    <div>
    <input type="checkbox" id='s' className='check_box' style={{width:'15px',marginLeft:'4rem'}}/>
    <label for='s' className='remember' >Remember me </label>
    <span onClick={forgot_passoword}   className='forgot_password' >Forgot Password ?</span>
    </div>
    <button type="submit"  className="btn mt-4 mb-5 btn-primary">Login</button>
    

    <p onClick={registered} className='login_create'>Don't have an account ? <strong>Register</strong></p>
  </form>

      </div>
      </div>
      <ToastContainer/>
    </>
   
  )
}

export default Login
