interface Address {
    name: string;
    address: string;
}

interface Attachment {
    filename: string;
    encoding: string;
    contentType: string;
}

class MailForm {
  from: string | Address;
  to: Array<string | Address>;
  cc?: Array<string | Address>;
  subject: string;
  text?: string | Buffer;
  html?: string | Buffer;
  attachments: Attachment[];

  constructor(
    from: string | Address,
    to: Array<string | Address>,
    cc: Array<string | Address> = [],
    subject: string,
    text: string | Buffer,
    attachments: Attachment[] = [],
  ) {
    if (to.length === 0) {
      throw new Error("메일 수신자에 대한 정보가 없습니다.");
    }
    this.from = from;
    this.to = to;
    this.cc = cc;
    this.subject = subject;
    this.text = text;
    this.attachments = attachments;
  }

  static Builder = class {
    private from = "";
    private to: Array<string | Address> = [];
    private cc: Array<string | Address> = [];
    private subject = "";
    private text: string | Buffer = "";
    private attachments: Attachment[] = [];

    setFrom(from: string): this {
      this.from = from;
      return this;
    }

    addTo(...to: Array<string | Address>): this {
      this.to.push(...to);
      return this;
    }

    addCc(...cc: Array<string | Address>): this {
      this.cc.push(...cc);
      return this;
    }

    setSubject(subject: string): this {
      this.subject = subject;
      return this;
    }

    setText(text: string | Buffer): this {
      this.text = text;
      return this;
    }

    addAttachments(...attachments: Attachment[]): this {
      this.attachments.push(...attachments);
      return this;
    }

    build(): MailForm {
      return new MailForm(
        this.from,
        this.to,
        this.cc,
        this.subject,
        this.text,
        this.attachments,
      );
    }
  };
}

export default MailForm;
