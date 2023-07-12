const { UnprocessableEntityError } = require("./errors");

const isNull = (value) =>
  value === null || typeof value === "undefined" || String(value).trim() === "";

const validateFields = ({ required, obj, location }) => {
  if (!obj)
    throw new UnprocessableEntityError(`Missing object for validation.`);
  required.forEach((item) => {
    if (obj[item]) {
      if (item === "email" && !obj[item].includes("@")) {
        throw new UnprocessableEntityError(`Email is not valid`);
      }
      if (item === "zipcode" && obj[item].length !== 5){
        throw new UnprocessableEntityError(`Zipcode is not valid`);
      }
      if (item === "parentPhone" && obj[item].length != 10){
        throw new UnprocessableEntityError(`Parent phone number is not valid`);
      }
    }

    if (isNull(obj[item])) {
      throw new UnprocessableEntityError(
        `Required field - ${item} missing${location ? ` at ${location}` : ""}`
      );
    }
  });
};

module.exports = { validateFields, isNull };
