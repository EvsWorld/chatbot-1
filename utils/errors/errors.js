import ExtendableError from 'es6-error';
export class ClientError extends ExtendableError {
  constructor(
    type = 'client_error',
    message = 'You made a mistake',
    error = {}
  ) {
    super(message);
    this.type = type;
    this.message = message;
    this.statusCode = 400;
    this.error = error;
  }
  logAndSend(res) {
    const jsonError = this.serialize();
    log.warn({ error: jsonError });
    delete jsonError.stack;
    delete jsonError.error;
    res.status(this.statusCode).send({ error: jsonError }); // send generic
  }
  serialize() {
    return serializeError(this);
  }
}

export class NotFoundError extends ClientError {
  constructor(
    type = 'not_found_error',
    message = 'Not found error',
    error = {}
  ) {
    super(message);
    this.type = type;
    this.message = message;
    this.statusCode = 404;
    this.error = error;
  }
}

export class BadRequestError extends ClientError {
  constructor(
    type = 'bad_request_error',
    message = 'Bad request error',
    error = {}
  ) {
    super(message);
    this.type = type;
    this.message = message;
    this.statusCode = 400;
    this.error = error;
  }
}
