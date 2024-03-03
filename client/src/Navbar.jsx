import React,{useContext, useEffect, useState} from 'react'
import { NavLink } from 'react-router-dom'  //by the use of Navlink react page do not refresh
import { UserContext } from './App';
// import {useSelector} from 'react-redux'
// const cookieParser = require('cookie-parser')
import LogoutIcon from '@mui/icons-material/Logout';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { colors } from '@mui/material';


const Navbar = () => {

  const [session,setsession]=useState({})
  // const s=null
  useEffect(()=>{
    getdata();  // can't use async function in useeffect hook
  },[])

  const getdata=async()=>{
    const res=await fetch('http://localhost:5000/navbarData',{
              method:'GET',
              credentials: 'include',
              headers:{
                "Content-Type" : "application/json"
              },
            })
          
          // here we get object in this we get id 
          const s=await res.json();
          // console.log(s);
          setsession(s)
          // console.log(session);
      
   
  }

  

  const {state,dispatch}=useContext(UserContext);   //here we using useContext for toggle login - logout
  const RenderMenu=()=>{
      // if(state){
      if(session.msg=='loginhaibeta'){
        // if state is true that means user is login 
        //and do not show login and registration 
        return(
          <>
             {/* {getdata} */}

             {/* because of Navlink react app do not refresh */}
             {/* but anchor tag refresh the app that's why we use Navlink  */}
          
          
          
             <li className="nav-item">
          <NavLink className="nav-link active navbar_text"  style={{color:'white'}}  to='/'>Home</NavLink>
        </li>
      
        <li className="nav-item">
          <NavLink className="nav-link active "  style={{color:'white'}} to='/contact'>Contact</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link active "  style={{color:'white'}} to='/card'>Product</NavLink>
        </li>

        <li className="nav-item">
          <NavLink className="nav-link active" style={{color:'white'}}  to='/carts'><ShoppingCartOutlinedIcon/></NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link active"  style={{color:'white'}} to='/logout'><LogoutIcon/></NavLink>
        </li>
          </>
        )
      }

      

      else if(session.msg=='adminaayare'){
        // if state is true that means user is login 
        //and do not show login and registration 
        return(
          <>
             {/* {getdata} */}

             {/* because of Navlink react app do not refresh */}
             {/* but anchor tag refresh the app that's why we use Navlink  */}

        <li className="nav-item">
          <NavLink className="nav-link active"  style={{color:'white'}}  to='/'>Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link active"  style={{color:'white'}} to='/card'>Product</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link active "  style={{color:'white'}} to='/create'>Create</NavLink>
        </li>

        
        <li className="nav-item">
          <NavLink className="nav-link active " style={{color:'white'}}  to='/carts'><ShoppingCartOutlinedIcon/></NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link active"  style={{color:'white'}} to='/logout'><LogoutIcon/></NavLink>
        </li>
          </>
        )
      }




     else{
      // if state is false that means user is not login
        //and do not show logout 
        return(
          <>
        <li className="nav-item">
          <NavLink className="nav-link active"  style={{color:'white'}}  to='/'>Home</NavLink>
        </li>
        {/* <li className="nav-item">
          <NavLink className="nav-link active" to='/contact'>Contact</NavLink>
        </li> */}
  
        <li className="nav-item">
          <NavLink className="nav-link active "  style={{color:'white'}}  to='/card'>Product</NavLink>
        </li>
               <li className="nav-item">
          <NavLink className="nav-link active nav_text"  style={{color:'white'}}  to='/register'>Register</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link  "  style={{color:'white'}} to='/login'>Login</NavLink>
        </li>      
        
          </>
        )
      }
  }
  


  return (
    <>
    
    {/* use className instead of class  */}
    {/* <nav className="navbar navbar-expand-lg bg-body-tertiary" > */}
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark "  >
    {/* <nav className="navbar navbar-expand-lg navbar-dark"  > */}
    
  <div className="container-fluid">
    <a className="navbar-brand"  href='/'>E-Commerce</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
    
       
      <RenderMenu/>  
      {/* calling RenderMenu function in this page itself */}
       
      </ul>
    </div>
  </div>
</nav>
</>
   
  )
}

export default Navbar;
   