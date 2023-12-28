import mongoose from "mongoose";
import BaseError from "../errors/BaseError.js";
import BadRequest from "../errors/BadRequest.js";
import ValidationError from "../errors/ValidationError.js";

// eslint-disable-next-line no-unused-vars
function errorManipulate(error, req, res, next) {
  if (error instanceof mongoose.Error.CastError) {
    new BadRequest().sendResponse(res);
    // res.status(400).send({ message: "Erro nos dados fornecidos" });
  } else if (error instanceof mongoose.Error.ValidationError) {
    new ValidationError(error).sendResponse(res);
    // const errorMessage = Object.values(error.errors)
    //   .map((erro) => erro.message)
    //   .join("; ");

    // res.status(400).send({
    //   message: `Os seguintes erros foram encontrados: ${errorMessage}`,
    // });
  } else new BaseError().sendResponse(res);
}

export default errorManipulate;
