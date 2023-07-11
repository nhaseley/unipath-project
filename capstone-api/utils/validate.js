const { UnprocessableEntityError } = require("./errors");

const isNull = (value) =>
  value === null || typeof value === "undefined" || String(value).trim() === "";

const validateFields = ({ required, obj, location }) => {
  if (!obj)
    throw new UnprocessableEntityError(`Missing object for validation.`);
  required.forEach((item) => {
    if (obj[item]) {
      if (item === "emailInput" && !obj[item].includes("@")) {
        throw new UnprocessableEntityError(`Email is not valid`);
      }
      if (item === "zipcodeInput" && obj[item].length !== 5){
        throw new UnprocessableEntityError(`Zipcode is not valid`);
      }
      if (item === "parentPhoneInput" && obj[item].length != 10){
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
