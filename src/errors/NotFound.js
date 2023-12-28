import BaseError from "./BaseError.js";

class NotFound extends BaseError {
  constructor(message = "Página não encontada") {
    super(message, 404);
  }
}

export default NotFound;
