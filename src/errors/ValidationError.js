import BadRequest from "./BadRequest.js";

class ValidationError extends BadRequest {
  constructor(error) {
    const errorMessage = Object.values(error.errors)
      .map((erro) => erro.message)
      .join("; ");

    super(`Os seguintes erros foram encontrados: ${errorMessage}`);
  }
}

export default ValidationError;
