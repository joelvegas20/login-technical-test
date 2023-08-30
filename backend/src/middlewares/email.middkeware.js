// Third Party Imports.
const nodemailer = require("nodemailer");
require("dotenv").config();

// Email Middleware.
const sendEmailToUser = async (data) => {
  // Get the email and profilePicture from the datos.
  const { email } = data;

  // Create the transport for the email.
  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Send the email.
  await transport.sendMail({
    from: '"Login-Techincal-Test " <info@login.techincal.test.com>',
    to: email,
    subject: "Bienvenido a Login-Techincal-Test",
    text: "Comprueba tu cuenta en Login-Techincal-Test",
    html: `<P>Hola: ${email.split("@")[0]} Te acabas de Registrar.</P>
      <p>Tu cuenta ya esta casi lista para ingresar a la plataforma.</p>
      <p>Si tu no te registraste, ignora este mensaje.</p>
      `,
  });
};

// Export.
module.exports = { sendEmailToUser };