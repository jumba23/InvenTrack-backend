// models/productModel.js
import Joi from "joi";

/**
 * Joi schema for product creation and full updates.
 * This schema defines the structure and validation rules for product data.
 * Fields specified as required are: name, wholesale_price_per_unit, retail_price_per_unit,
 * quantity_office_1, quantity_office_8, quantity_home, and reorder_point.
 */
const productSchema = Joi.object({
  name: Joi.string().required().max(255).trim().description("Product name"),
  wholesale_price_per_unit: Joi.number()
    .min(0)
    .required()
    .description("Wholesale price per unit"),
  retail_price_per_unit: Joi.number()
    .min(0)
    .required()
    .description("Retail price per unit"),
  quantity_office_1: Joi.number()
    .integer()
    .min(0)
    .required()
    .description("Current quantity in Office 1"),
  quantity_office_8: Joi.number()
    .integer()
    .min(0)
    .required()
    .description("Current quantity in Office 8"),
  quantity_home: Joi.number()
    .integer()
    .min(0)
    .required()
    .description("Current quantity at Home"),
  display_shelf: Joi.number()
    .integer()
    .min(0)
    .allow(null)
    .default(0)
    .description("Quantity on display shelf"),
  reorder_point: Joi.number()
    .integer()
    .min(0)
    .required()
    .description("Quantity at which to reorder"),
  // Additional fields that are optional or generated
  short_description: Joi.string()
    .allow(null, "")
    .max(500)
    .description("Short description of the product"),
  long_description: Joi.string()
    .allow(null, "")
    .max(2000)
    .description("Detailed description of the product"),
  sku: Joi.string().allow(null, "").max(50).description("Stock Keeping Unit"),
  supplier_id: Joi.number()
    .integer()
    .positive()
    .allow(null)
    .description("ID of the supplier"),
  category_id: Joi.number()
    .integer()
    .positive()
    .allow(null)
    .description("ID of the product category"),
  note: Joi.string()
    .allow(null, "")
    .max(1000)
    .description("Additional notes about the product"),
  image_url: Joi.string()
    .uri()
    .allow(null, "")
    .max(500)
    .description("URL of the product image"),
  measurement_unit: Joi.string()
    .allow(null, "")
    .max(50)
    .description("Unit of measurement"),
  status: Joi.string()
    .valid("out", "low", "normal")
    .default("normal")
    .description("Current status of the product"),
});

/**
 * Joi schema for partial updates of product data.
 * This schema makes all fields optional to allow for partial updates.
 */
const productUpdateSchema = productSchema.fork(
  Object.keys(productSchema.describe().keys),
  (schema) => schema.optional()
);

/**
 * Validates a product object against the full product schema.
 * @param {Object} product - The product object to validate.
 * @returns {Object} The validation result.
 */
export const validateProduct = (product) => {
  return productSchema.validate(product, { abortEarly: false });
};

/**
 * Validates a partial product object for updates.
 * @param {Object} productUpdate - The partial product object to validate.
 * @returns {Object} The validation result.
 */
export const validateProductUpdate = (productUpdate) => {
  return productUpdateSchema.validate(productUpdate, { abortEarly: false });
};

export { productSchema, productUpdateSchema };
