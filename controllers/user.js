const jwt = require("jsonwebtoken");
const User = require("../models/User");
const nodemailer = require('nodemailer');

const delay = async (milliseconds) => {
  await new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
};

const verify = async (req, res) => {
  
    try {
      const { otp,email } = req.body;
      console.log(email,otp)
      // Fetch the user from the database using their email or any other identifier
      const foundUser = await User.findOne({ email: email }); // Assuming you have the user's email in the request body
  
      // Check if the user exists and if the entered OTP matches the stored OTP
      if (foundUser && foundUser.otp === otp) {
        console.log("found")
        console.log(foundUser.otp)
        console.log(otp)
        // console
        // Clear the OTP field in the database after successful verification
        // user.otp = null;
        // await user.save();
  
        // Return success response
        const token = jwt.sign(
          { id: foundUser._id, name: foundUser.name },
          process.env.JWT_SECRET,
          {
            expiresIn: "30d",
          }
        );
  
        return res.status(200).json({success: true , msg: "user logged in", token });
        // return res.status(200).json({ success: true });
      } else {
        // Return error response if OTP is invalid
        return res.status(400).json({ success: false, message: 'Invalid OTP' });
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      return res.status(500).json({ success: false, message: 'Failed to verify OTP' });
    }
  
}

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      msg: "Bad request. Please add email and password in the request body",
    });
  }

  let foundUser = await User.findOne({ email: req.body.email });
  if (foundUser) {
    const isMatch = await foundUser.comparePassword(password);

    if (isMatch) {
      const token = jwt.sign(
        { id: foundUser._id, name: foundUser.name },
        process.env.JWT_SECRET,
        {
          expiresIn: "30d",
        }
      );

      return res.status(200).json({ msg: "user logged in", token });
    } else {
      return res.status(400).json({ msg: "Bad password" });
    }
  } else {
    return res.status(400).json({ msg: "Bad credentails" });
  }
};

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);

  res.status(200).json({
    msg: `Hello, ${req.user.name}`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  });
};

const getAllUsers = async (req, res) => {
  let users = await User.find({});

  return res.status(200).json({ users });
};

const register = async (req, res) => {
  let foundUser = await User.findOne({ email: req.body.email });
  if (foundUser === null) {
    let { username, email, password} = req.body;
    if (username.length && email.length && password.length) {

      const generateOTP = () => {
        const digits = '0123456789';
        let OTP = '';
        for (let i = 0; i < 6; i++) {
          OTP += digits[Math.floor(Math.random() * 10)];
        }
        return OTP;
      };

      const otp = generateOTP();
      await delay(4000);
      console.log(otp)
      const person = new User({
        name: username,
        email: email,
        password: password,
        otp: otp,
      });
      await person.save();


      let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com', // Your SMTP host (e.g., Gmail SMTP)
        port: 587, // Your SMTP port (e.g., 587 for Gmail)
        secure: false, // true for 465, false for other ports
        auth: {
          user: 'highwaydeliteassignment@gmail.com', // Your email address
          pass: 'lduqtbhnpjqaddqb', // Your email password or app password for Gmail
        },
      });
  
      // Send email with defined transport object
      let info = await transporter.sendMail({
        from: `from highwaydeliteassignment@gmail.com`, // Sender address
        to: email, // List of recipients
        subject: 'OTP for Verification', // Subject line
        text: `OTP for Athang's Highway Delite Assignment \n Your OTP for verification is: ${otp}`, // Plain text body
        html: `<b>Your OTP for verification is:</b> ${otp}`, // HTML body
      });
  
      console.log('Message sent: %s', info.messageId);
      return res.status(201).json({ person });
    }else{
        return res.status(400).json({msg: "Please add all values in the request body"});
    }
  } else {
    return res.status(400).json({ msg: "Email already in use" });
  }
};

module.exports = {
  verify,
  login,
  register,
  dashboard,
  getAllUsers,
  
};
