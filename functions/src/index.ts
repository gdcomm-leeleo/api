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

export const getApiKey1 = onRequest({cors: true}, (request, response) => {
  response.json({key: "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"});
});

export const getApiKey2 = onRequest({cors: true}, (request, response) => {
  response.json({key: "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"});
});

export const sendMail = onRequest({cors: true}, (request, response) => {
  try {
    sendAndForget({
      to: 'cslee@gdcomm.io',
      subject: 'test',
      text: 'text from api',
    });
  } catch (e) {
    console.error('Send Mail Error : ', e);
  }
});

const sendAndForget = (param: nodemailer.SendMailOptions): boolean => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "develop@gdcomm.io",
        pass: "mknc rjcx spqk crhq",
      },
    });

    const mailOptions: nodemailer.SendMailOptions = {
      from: 'develop@gdcomm.io',
      to: param.to,
      subject: param.subject,
      text: param.text,
    };
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("Sending Mail Error: ", err);
      } else {
        console.log("Sent: ", info.response);
      }
    });

    return true;
  } catch (e) {
    console.error('Send And Forget Error : ', e);
    return false;
  }
};
