// models/profileModel.js
import Joi from "joi";

const profileSchema = Joi.object({
  user_id: Joi.string().uuid().required(),
  full_name: Joi.string().required(),
  role: Joi.string().valid("admin", "manager", "staff").required(),
});

export const validateProfile = (profile) => {
  return profileSchema.validate(profile, { abortEarly: false });
};

export default profileSchema;
