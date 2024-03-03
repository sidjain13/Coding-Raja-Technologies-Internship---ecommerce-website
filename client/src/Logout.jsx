import React, { useEffect,useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from './App';

const Logout = () => {

  const {state,dispatch}=useContext(UserContext);
    const navigate=useNavigate();

  const userContact=async()=>{
    try{
      const res=await fetch("http://localhost:5000/logout",{
              method:"GET",
              headers:{
                Accept:"application/json", 
                "Content-Type":"application/json"
              },
              credentials:"include"
            });
            
    
            const data=await res.json(); 
            
            if(data.status===200  || data){
                dispatch({type:'USER',payload:false})
                navigate('/login');
                window.location.reload();
            }

      
      
    }
    catch(err){
        console.log("logout catch");
      console.log(err);
    }
  }

    useEffect(()=>{
        userContact();
    },[]);
    
  return (
    <div>
      logout ka page
    </div>
  )
}

export default Logout
