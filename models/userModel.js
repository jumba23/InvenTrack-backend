// models/userModel.js
import Joi from "joi";

const userSchema = Joi.object({
  firstName: Joi.string().min(2).max(50).required(),
  lastName: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  cellNumber: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required(),
});

export const validateUser = (user) => {
  return userSchema.validate(user, { abortEarly: false });
};

export default userSchema;
