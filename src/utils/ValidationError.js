import AppError from "./AppError.js";

export class ValidationError extends AppError {
  constructor(error, statusCode) {
    let errorrs = JSON.parse(error);
    let messages = [];
    let stacks = [];
    errorrs.forEach((er) => {
      messages.push(er.message);
      stacks.push(er.path[0]);
    });
    super(messages, statusCode);
    this.path = stacks;
  }
}
