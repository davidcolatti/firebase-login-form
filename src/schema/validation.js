import * as yup from "yup";

async function validation(user) {
  let validateInfo = {};

  const schema = yup.object().shape({
    name: yup.string().required(),
    age: yup
      .number()
      .required()
      .positive()
      .integer()
      .default(0)
      .typeError("age must be a number"),
    email: yup.string().email().required(),
    password: yup.string().required(),
    createdOn: yup.date().default(function () {
      return new Date();
    }),
  });

  try {
    validateInfo.valid = await schema.validate(user);
  } catch (err) {
    validateInfo.message = err.message;
  }

  return validateInfo;
}

export default validation;
