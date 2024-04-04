import React, { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation } from 'react-router-dom';

const Verify = () => {
    const [ token, setToken ] = useState(JSON.parse(localStorage.getItem("auth")) || "");
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const location = useLocation();
  const { state } = location;

  // Access the data sent from the previous route
  console.log(state.data);
  const email = state.data;

//   const { search } = useLocation();
//   const params = new URLSearchParams(search);
//   const email = params.get('data');
//   console.log(email)

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      // Make a request to your backend to verify the OTP
      const response = await axios.post("http://localhost:3000/api/v1/verify", {otp,email});

      // Assuming the backend responds with a success message upon successful verification
      if (response.data.success) {
        localStorage.setItem('auth', JSON.stringify(response.data.token));
        toast.success("OTP verified successfully");
        navigate("/dashboard");
        // navigate("/dashboard");
      } else {
        toast.error("Invalid OTP");
      }
    } catch (error) {
      toast.error("Failed to verify OTP. Please try again later.");
      console.error("Error verifying OTP:", error);
    }
  };

  useEffect(() => {
    if(token !== ""){
      toast.success("You already logged in");
      navigate("/dashboard");
    }
  }, []);

  return (
    <div className="text-center">
      <h2 className='mt-12 mb-12 font-extrabold text-7xl text-gp'>OTP Verification</h2>
      <form onSubmit={handleVerify} className="flex justify-center items-center">
      <div>
        <input
        className="w-44"
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
        </div>
        <div>
        <button type="submit">Verify OTP</button>
        </div>
      </form>
    </div>
  );
};

export default Verify;
