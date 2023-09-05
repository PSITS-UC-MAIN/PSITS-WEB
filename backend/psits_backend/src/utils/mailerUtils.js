import { createTransport } from "nodemailer";

const transporter = createTransport({
  service: "gmail",
  secure: true,
  auth: {
    // replace `user` and `pass` values with the gmail you're going to use
    user: process.env.PSITS_GMAIL_USER,
    pass: process.env.PSITS_GMAIL_PASS,
  },
});

export async function sendMail({ email, userId, token, firstname, lastname }) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: process.env.PSITS_GMAIL_USER, // sender address
    to: email, // list of receivers separated by comma
    subject: "Password Reset", // Subject line
    html: `<html>
            <body style="background-color: #074873;padding: 25px;">
              <div style="position: absolute;width: 250px;left: 50%;top: 50%;transform: translate(-50%,-50%);text-align: center;border: 1px solid white;background-color: white;padding: 20px;border-radius: 15px;">
                <div style="width: 100%;">
                  <img style="width: 64px;height: 64px;" src="http://103.44.234.157:5000/static/images/uc.png">
                  <img style="width: 64px;height: 64px;" src="http://103.44.234.157:5000/static/images/PSITS_LOGO.png">
                  <img style="width: 64px;height: 64px;" src="http://103.44.234.157:5000/static/images/CCS_LOGO.png">
                </div>
                <h3>
                  Password Reset
                </h3>
                <p>
                  Hello ${firstname} ${lastname}, you have requested a password reset, click this link: <a href=${`http://localhost:5173/reset-password/${userId}/${token}`}>PASSWORD-RESET<a/>
                  <br/>
                  <br/>        
                  If you have not requested this. Just ignore this email. Contact the developers for any concerns.
                </p>
              </div>
            </body>
          </html>`,
  });

  console.log("Message sent: %s", info.messageId);
}
