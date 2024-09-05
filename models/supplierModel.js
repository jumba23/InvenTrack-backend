// models/supplierModel.js
import Joi from "joi";

/**
 * Joi schema for supplier creation and full updates.
 * This schema defines the structure and validation rules for supplier data.
 */
const supplierSchema = Joi.object({
  name: Joi.string()
    .required()
    .max(255)
    .trim()
    .description("Supplier company name"),
  contact_person: Joi.string()
    .allow(null, "")
    .max(255)
    .trim()
    .description("Name of the primary contact person"),
  email: Joi.string()
    .email()
    .allow(null, "")
    .max(255)
    .trim()
    .description("Contact email address"),
  phone: Joi.string()
    .allow(null, "")
    .max(20)
    .trim()
    .description("Contact phone number"),
  address: Joi.string()
    .allow(null, "")
    .max(500)
    .trim()
    .description("Physical address of the supplier"),
});

/**
 * Joi schema for partial updates of supplier data.
 * This schema makes all fields optional to allow for partial updates.
 */
const supplierUpdateSchema = supplierSchema.fork(
  Object.keys(supplierSchema.describe().keys),
  (schema) => schema.optional()
);

/**
 * Validates a supplier object against the full supplier schema.
 * @param {Object} supplier - The supplier object to validate.
 * @returns {Object} The validation result.
 */
export const validateSupplier = (supplier) => {
  return supplierSchema.validate(supplier, { abortEarly: false });
};

/**
 * Validates a partial supplier object for updates.
 * @param {Object} supplierUpdate - The partial supplier object to validate.
 * @returns {Object} The validation result.
 */
export const validateSupplierUpdate = (supplierUpdate) => {
  return supplierUpdateSchema.validate(supplierUpdate, { abortEarly: false });
};

export { supplierSchema, supplierUpdateSchema };
