// models/productModel.js
import Joi from "joi";

const productSchema = Joi.object({
  name: Joi.string().required(),
  short_description: Joi.string().allow(null, ""),
  long_description: Joi.string().allow(null, ""),
  sku: Joi.string().required(),
  retail_price_p: Joi.number().min(0).required(),
  selling_price_: Joi.number().min(0).required(),
  quantity: Joi.number().integer().min(0).default(0),
  reorder_point: Joi.number().integer().min(0).default(5),
  supplier_id: Joi.number().integer().positive().allow(null),
  category_id: Joi.number().integer().positive().required(),
  note: Joi.string().allow(null, ""),
  image_url: Joi.string().uri().allow(null, ""),
  measurement_: Joi.string().allow(null, ""),
  storage_location: Joi.string().allow(null, ""),
});

export const validateProduct = (product) => {
  return productSchema.validate(product, { abortEarly: false });
};

export default productSchema;
