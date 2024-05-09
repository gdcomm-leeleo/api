/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {onRequest} from "firebase-functions/v2/https";
import * as nodemailer from 'nodemailer';
import MailForm from "./form/mail";

export const getApiKey1 = onRequest({cors: true}, (request, response) => {
  response.json({key: "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"});
});

export const getApiKey2 = onRequest({cors: true}, (request, response) => {
  response.json({key: "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"});
});

export const sendMail = onRequest({cors: true}, (request, response) => {
  try {
    const {to, cc, subject, text, html, attachments} =
        request.body;

    const builder = new MailForm.Builder;
    const form = builder
      .addTo(Array.isArray(to) ? to : [to])
      .addCc(Array.isArray(cc) ? cc : [cc])
      .setSubject(subject)
      .setText(text)
      .setHtml(html)
      .addAttachments(Array.isArray(attachments) ? attachments : [attachments])
      .build();

    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.APP_USER,
        pass: process.env.APP_PASS,
      },
    });

    const options: nodemailer.SendMailOptions = {
      to: form.to,
      cc: form.cc,
      subject: form.subject,
      text: form.text,
      html: form.html,
      attachments: form.attachments,
    };

    transporter.sendMail(options, (err, info) => {
      if (err) {
        console.error("Sending Mail Error: ", err);
        response.status(500);
      } else {
        console.log("Sent: ", info.response, form.to);
        response.status(200);
      }
    });
  } catch (e) {
    console.error('Send Mail Error : ', e);
    response.status(500);
  }
});

