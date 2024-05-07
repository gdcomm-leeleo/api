import MailForm from "./form/mail";
import nodemailer from 'nodemailer';
import {onRequest} from "firebase-functions/v2/https";

const service = onRequest({cors: true}, (req, res) => {
  try {
    const {from, to, cc, subject, text, attachments} = req.body;
    const builder = new MailForm.Builder();
    const form = builder.setFrom(from)
      .addTo(to)
      .addCc(cc)
      .setSubject(subject)
      .setText(text)
      .addAttachments(attachments)
      .build();

    const transporter = nodemailer.createTransport({
      host: "smtp.daum.net",
      port: 465,
      secure: true,
      auth: {
        user: "gdcomm",
        pass: "gdcomm18!",
      },
    });

    transporter.sendMail(form, (err, info) => {
      if (err) {
        console.error("Sending Mail: ", err);
        res.status(500).send("Failed to send mail");
      } else {
        console.log("Sent: ", info.response);
        res.status(200).send("Mail sent successfully");
      }
    });
  } catch (e) {
    console.error("Mail Send : ", e);
    res.status(500).send("Failed to send mail");
  }
});

export const mailService = onRequest(service);
