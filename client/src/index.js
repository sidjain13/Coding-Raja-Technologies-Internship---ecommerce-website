import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import {BrowserRouter} from 'react-router-dom';  // BrowserRouter is important for routing 
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';    //for css
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';       //for js
// import '../public/images'



//used for using redux
import store from './store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
// here we simply calling app component 
root.render(
  // provider is used for redux 
  <Provider store={store}>   
  {/* // BrowserRouter is important for routing  */}
  <BrowserRouter>     
    <App />         
  </BrowserRouter>
  </Provider>
);

