import React from 'react'
import "../styles/Landing.css";
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className='landing-main'>
    <h1 className='mb-12 font-extrabold text-7xl text-gp'>Landing Page</h1>
    <p className='text-center mb-8 text-gr'>Hello and welcome to <br/>Athang's Highway Delite Assignment !</p>
    <Link to="/login" className="landing-login-button ">SignIn</Link>
    <Link to="/register" className="landing-register-button">SignUp</Link>
  </div>
  )
}

export default Landing