const nodemailer = require('nodemailer');

// Function to generate a random OTP
// const generateOTP = () => {
//   return Math.floor(100000 + Math.random() * 900000);
// };

const delay = async (milliseconds) => {
  await new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
};

// Function to send OTP email
const sendOTPEmail = async (email) => {
  try {
    // Generate OTP
    const generateOTP = () => {
      const digits = '0123456789';
      let OTP = '';
      for (let i = 0; i < 6; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
      }
      return OTP;
    };

    const otp = generateOTP();
    await delay(10000);
    console.log(otp)

    // Create Nodemailer transporter
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
      to: 'athangyende459@gmail.com', // List of recipients
      subject: 'OTP for Verification', // Subject line
      text: `Your OTP for verification is: ${otp}`, // Plain text body
      html: `<b>Your OTP for verification is:</b> ${otp}`, // HTML body
    });

    console.log('Message sent: %s', info.messageId);
    return otp; // Return OTP for further processing
  } catch (error) {
    console.error('Error occurred:', error);
    throw error; // Throw error for error handling
  }
};

// Usage:
const email = 'recipient@example.com'; // Email address where OTP will be sent
sendOTPEmail(email)
  .then((otp) => {
    console.log('OTP sent successfully:', otp);
  })
  .catch((error) => {
    console.error('Failed to send OTP:', error);
  });
