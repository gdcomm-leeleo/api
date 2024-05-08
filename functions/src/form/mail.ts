import {Attachment} from "nodemailer/lib/mailer";

class MailForm {
  from: string;
  sender?: string;
  to: Array<string>;
  cc?: Array<string>;
  subject?: string;
  text?: string;
  html?: string;
  attachments?: Attachment[];

  constructor(
    from: string,
    sender = "",
    to: Array<string>,
    cc: Array<string> = [],
    subject = "",
    text = "",
    html = "",
    attachments: Attachment[] = []
  ) {
    if (to.length === 0) {
      throw new Error("메일 수신자가 없습니다.");
    }
    this.from = from;
    this.sender = sender;
    this.to = to;
    this.cc = cc;
    this.subject = subject;
    this.text = text;
    this.html = html;
    this.attachments = attachments;
  }

  static Builder = class {
    private from = "";
    private sender = "";
    private to: Array<string> = [];
    private cc: Array<string> = [];
    private subject = "";
    private text = "";
    private html = "";
    private attachments: Attachment[] = [];

    setFrom(from: string): this {
      this.from = from;
      return this;
    }

    setSender(sender: string): this {
      this.sender = sender;
      return this;
    }

    addTo(...to: Array<string>): this {
      this.to.push(...to);
      return this;
    }

    addCc(...cc: Array<string>): this {
      this.cc.push(...cc);
      return this;
    }

    setSubject(subject: string): this {
      this.subject = subject;
      return this;
    }

    setText(text: string): this {
      this.text = text;
      return this;
    }

    setHtml(html: string): this {
      this.html = html;
      return this;
    }

    addAttachments(...attachments: Attachment[]): this {
      this.attachments.push(...attachments);
      return this;
    }

    build(): MailForm {
      return new MailForm(
        this.from,
        this.sender,
        this.to,
        this.cc,
        this.subject,
        this.text,
        this.html,
        this.attachments
      );
    }
  };
}

export default MailForm;
