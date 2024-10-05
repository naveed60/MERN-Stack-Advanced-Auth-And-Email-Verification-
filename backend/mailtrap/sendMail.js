// backend/mailtrap/emails.js
import nodemailer from "nodemailer";
import {VERIFICATION_EMAIL_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE
} from "./emailTemplates.js";

export function sendMail(from, to, smtp, { subject, body, inReplyTo }) {
    const transport = nodemailer.createTransport({
        host: smtp.host,
        port: smtp.port,
        auth: {
            user: smtp.username,
            pass: smtp.password,
        },
    });

    const isHtml = /<\/?[a-z][\s\S]*>/i.test(body); // Check if the body is HTML
    return transport.sendMail({
        from,
        to,
        subject,
        [isHtml ? 'html' : 'text']: body,
        inReplyTo,
        headers: {
            'Content-Type': `${isHtml ? 'text/html' : 'text/plain'}; charset=UTF-8`,
        },
    });
}

// Function to send a verification email
export const sendVerificationEmail = async (smtp, email, verificationToken) => {
    const verificationUrl = `http://localhost:5173/verify-email?code=${verificationToken}`;
    const mailOptions = {
        from: 'MNA', // sender address (update your email)
        to: email, // receiver's email address
        subject: "Verify your email", // Subject line
        html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
    };

    try {
        await sendMail(mailOptions.from, mailOptions.to, smtp, {
            subject: mailOptions.subject,
            body: mailOptions.html, // HTML content
        });
        console.log("Verification email sent successfully");
    } catch (error) {
        console.error("Error sending verification email:", error);
        throw new Error(`Error sending verification email: ${error.message}`);
    }
};

// Function to send a welcome email
export const sendWelcomeEmail = async (smtp, email, name) => {
  console.log("email",email)
  console.log("WELCOME_EMAIL_TEMPLATE",WELCOME_EMAIL_TEMPLATE)
  const mailOptions = {
    from: `"Your Name" <imnaveed60@gmail.com>`, // sender address
    to: email, // list of receivers
    subject: "Welcome to our service", // Subject line
    html: WELCOME_EMAIL_TEMPLATE, // html body
    template_uuid: "e65925d1-a9d1-4a40-ae7c-d92b37d593df",
			template_variables: {
				company_info_name: "Auth Company",
				name: name,
			},
    };
    console.log("mailOptions",mailOptions)

  try {
    await sendMail(mailOptions.from, mailOptions.to, smtp, {
      subject: mailOptions.subject,
      body: mailOptions.html, // HTML content
  });    console.log("Welcome email sent successfully");
  } catch (error) {
    console.error("Error sending welcome email:", error);
    throw new Error(`Error sending welcome email: ${error.message}`);
  }
};

// Function to send a password reset email
export const sendPasswordResetEmail = async (smtp, email, resetLink) => {
  const mailOptions = {
    from: '"Your App Name" <imnaveed60@gmail.com>', // Sender address
    to: email, // Receiver email
    subject: 'Password Reset Request', // Subject line
    html: `<p>You requested a password reset. Click the link below to reset your password:</p><p><a href="${resetLink}">Reset Password</a></p>`,
  };

  try {
    await sendMail(mailOptions.from, mailOptions.to, smtp, mailOptions);
    console.log("Password reset email sent successfully");
  } catch (error) {
    console.error("Error sending password reset email:", error);
  }
};

// Function to send a password reset success email
export const sendResetSuccessEmail = async (smtp, email) => {
  const mailOptions = {
    from: '"Your App Name" <imnaveed60@gmail.com>', // Sender address
    to: email, // Receiver email
    subject: 'Password Reset Successful', // Subject line
    html: `<p>Your password has been reset successfully. If you did not request this change, please contact support.</p>`,
  };

  try {
    await sendMail(mailOptions.from, mailOptions.to, smtp, mailOptions);
    console.log("Password reset success email sent successfully");
  } catch (error) {
    console.error("Error sending reset success email:", error);
  }
};
