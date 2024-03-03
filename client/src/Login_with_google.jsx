import React from 'react'

// // for login with google functionality
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';


const Login_with_google = () => {
  return (
    <div>
      <GoogleOAuthProvider clientId="1066048008781-r2krvf2v1etjtk6h4n0ohaljqae04k00.apps.googleusercontent.com">


<GoogleLogin
  onSuccess={credentialResponse => {
    const details=jwt_decode(credentialResponse.credential);
    console.log(details);
    console.log(credentialResponse);
  }}
  onError={() => {
    console.log('Login Failed');
  }}
/>

</GoogleOAuthProvider>
    </div>
  )
}

export default Login_with_google
