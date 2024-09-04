// models/supplierModel.js
import Joi from "joi";

const supplierSchema = Joi.object({
  name: Joi.string().required(),
  contact_person: Joi.string().allow(null, ""),
  email: Joi.string().email().allow(null, ""),
  phone: Joi.string().allow(null, ""),
  address: Joi.string().allow(null, ""),
});

export const validateSupplier = (supplier) => {
  return supplierSchema.validate(supplier, { abortEarly: false });
};

export default supplierSchema;
