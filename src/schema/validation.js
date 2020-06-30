import * as yup from "yup";

async function validation(user) {
  let validateMessage;

  const schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    createdOn: yup.date().default(function () {
      return new Date();
    }),
  });

  try {
    await schema.validate(user);
  } catch (err) {
    validateMessage = err.message;
  }

  return validateMessage;
}

export default validation;
