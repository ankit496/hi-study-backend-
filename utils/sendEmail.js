const nodemailer=require('nodemailer')
const sendEmail=async(recipientEmail,otp)=>{
    let transporter=nodemailer.createTransport({
        host:process.env.EMAIL_HOST,
        port:process.env.EMAIL_PORT,
        secure:false,
        auth:{
            user:process.env.EMAIL_USER,
            pass:process.env.EMAIL_PASS
        }
    })
    let mailOptions = {
        from: `"No Reply" <${process.env.EMAIL_USER}>`,
        to: recipientEmail,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}`,
        html: `<b>Your OTP code is ${otp}</b>`,
    };
    try{
        let info=await transporter.sendMail(mailOptions)
        return {success:true,info}
    }
    catch(error){
        console.log(error)
        throw error
    }
}
module.exports=sendEmail