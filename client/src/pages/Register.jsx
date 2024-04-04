import React, { useEffect, useState } from "react";
import Image from "../assets/signup.png";
import Logo from "../assets/logo.png";
import GoogleSvg from "../assets/icons8-google.svg";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import "../styles/Register.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";



const Login = () => {
  const [loading, setLoading] = useState(false);
  const [ showPassword, setShowPassword ] = useState(false);
  const navigate = useNavigate();
  // const [otp, setOTP] = useState("");
  const [ token, setToken ] = useState(JSON.parse(localStorage.getItem("auth")) || "");

  // const generateOTP = () => {
  //   const digits = '0123456789';
  //   let OTP = '';
  //   for (let i = 0; i < 6; i++) {
  //     OTP += digits[Math.floor(Math.random() * 10)];
  //   }
  //   return OTP;
  // };

  // const generateRandomOTP =  async() => {
  //   // Generate a 6-digit OTP
  //   const newOTP = Math.floor(100000 + Math.random() * 900000);
  //   setOTP(newOTP.toString());
  //   // console.log(otp)
  // };


  // const [otp, setOTP] = useState("");

  // useEffect(() => {
  //   generateOTP()
  // },[])
  // const [isGeneratingOTP, setIsGeneratingOTP] = useState(false);

  // const generateOTP = async () => {
  //   setIsGeneratingOTP(true); // Start generating OTP
  //   // Simulate asynchronous operation
  //   await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay

  //   // Generate OTP (in this case, a 6-digit number)
  //   const digits = '0123456789';
  //   let OTP = '';
  //   for (let i = 0; i < 6; i++) {
  //     OTP += digits[Math.floor(Math.random() * 10)];
  //   }
  //   // const newOTP = Math.floor(100000 + Math.random() * 900000);
  //   setOTP(OTP);
  //   setIsGeneratingOTP(false); // Finish generating OTP
  // };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    // await generateOTP() // to start afterward
    setLoading(true);
    let name = e.target.name.value;
    let lastname = e.target.lastname.value;
    let email = e.target.email.value;
    let password = e.target.password.value;
    let confirmPassword = e.target.confirmPassword.value;

    if(name.length > 0 && lastname.length > 0 && email.length > 0 && password.length > 0 && confirmPassword.length > 0){

      if(password === confirmPassword){
        // const generatedOTP = generateOTP(); // Implement this function
        // setOtp(generatedOTP);
        
        
        
        // console.log(otp)
        const formData = {
          username: name + " " + lastname,
          email,
          password,
        };
        try{
          
        const response = await axios.post("http://localhost:3000/api/v1/register", formData);
         toast.success("Verify yourself");

         navigate('/verify', { state: { data: email } });
       }catch(err){
         toast.error(err.message);
       }
      }else{
        toast.error("Passwords don't match");
      }
    

    }else{
      toast.error("Please fill all inputs");
    }


  }

  useEffect(() => {
    if(token !== ""){
      toast.success("You already logged in");
      navigate("/dashboard");
    }
  }, []);

  
  return (
    <div className="register-main">
      <div className="register-left">
        <img className="h-full" src={Image} alt="" />
      </div>
      <div className="register-right">
        <div className="register-right-container">
          <div className="register-center">
            <h2 className="text-gp">Let us know !</h2>
            <p className="text-gr">Please enter your details</p>
            <form onSubmit={handleRegisterSubmit}>
            <input type="text" placeholder="Name" name="name" required={true} />
            <input type="text" placeholder="Lastname" name="lastname" required={true} />
              <input type="email" placeholder="Email" name="email" required={true} />
              <div className="pass-input-div">
                <input type={showPassword ? "text" : "password"} placeholder="Password" name="password" required={true} />
                {showPassword ? <FaEyeSlash onClick={() => {setShowPassword(!showPassword)}} /> : <FaEye onClick={() => {setShowPassword(!showPassword)}} />}
                
              </div>
              <div className="pass-input-div">
                <input type={showPassword ? "text" : "password"} placeholder="Confirm Password" name="confirmPassword" required={true} />
                {showPassword ? <FaEyeSlash onClick={() => {setShowPassword(!showPassword)}} /> : <FaEye onClick={() => {setShowPassword(!showPassword)}} />}
                
              </div>
              <div className="register-center-buttons text-gr">
              {loading ? (<div>Please wait for 10 seconds <br/> while we verify your credentials...</div>) : (<button type="submit">Sign Up</button>)}
                
              </div>
            </form>
          </div>

          <p className="login-bottom-p">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
