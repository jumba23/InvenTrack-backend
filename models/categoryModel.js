// models/categoryModel.js
import Joi from "joi";

const categorySchema = Joi.object({
  type: Joi.string().valid("retail", "service").required(),
  name: Joi.string().allow(null, ""),
});

export const validateCategory = (category) => {
  return categorySchema.validate(category, { abortEarly: false });
};

export default categorySchema;
