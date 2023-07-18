class ConnectionError extends Error {
  public code: string;
  public response: any;

  constructor(message: string, code: string, response: any) {
    super(message);

    this.code = code;
    this.response = response;
  }
}

export default ConnectionError;
