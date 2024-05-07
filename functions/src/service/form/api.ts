class Api {
  code: number;
  message: string;
  data: any;

  constructor(code: number, message: string, data: any) {
    this.code = code;
    this.message = message;
    this.data = data;
  }

  success(data: any) {
    return new Api(2000, "Request has Succeed", data);
  }

  failed(message: string) {
    return new Api(2001, message, {});
  }

  denied(data: any) {
    return new Api( 2002, "Request has Denied", data);
  }

  pending(data: string) {
    return new Api(2003, "Internal Server Error", data);
  }
}
export default Api;
