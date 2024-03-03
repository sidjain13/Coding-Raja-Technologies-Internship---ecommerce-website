import React,{createContext, useReducer} from 'react'
import Navbar from './Navbar';
import Home from './Home';
import Skills from './Skills';
import Card from './Card';
import About from './About';
import Contact from './Contact';
import Register from './Register';
import Login from './Login';
import { Navigate, Route, Routes } from 'react-router-dom';
import Footer from './Footer';
import Logout from './Logout';
import { initialState,reducer } from './reducer/useReducer'; // getting file from reducer folder
import Payment from './Payment';
import Success from './Success';
import Cancel from './Cancel';
import Carts from './Carts';
import Create from './Create';
import Forgot_password from './Forgot_password';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Routing =()=>{
  return (
    <Routes>
          <Route path='/' exact Component={Home} />
          <Route path='/card' exact Component={Card} />
          <Route path='/contact' exact Component={Contact} />
          <Route path='/about' exact Component={About} />
          <Route path='/login' exact Component={Login} />
          <Route path='/register' exact Component={Register} />
          <Route path='/payment' exact Component={Payment} />
          <Route path='/carts' exact Component={Carts} />
          <Route path='/success' exact Component={Success} />
          <Route path='/cancel' exact Component={Cancel} />
          <Route path='/logout' exact Component={Logout} />
          <Route path='/create' exact Component={Create} />
          <Route path='/forgot_password' exact Component={Forgot_password} />
          <Route path='/*' exact Component={Home} />
      </Routes>
  )
}

export const UserContext=createContext();  //useContext used to get data from one page to other

const App = () => {
  
  const [state,dispatch]=useReducer(reducer,initialState);   //useReducer is used for toggle login and logout 
  return (
    <>

    <UserContext.Provider value={{state,dispatch}} >
    {/* <div className='all_page'> */}
    <div>
        <Navbar/>
        <Routing/>
        {/* <Footer/> */}
        <ToastContainer/>
    </div>
     </UserContext.Provider>
     
    </>
  )
}

export default App;





