// models/profileModel.js
import Joi from "joi";

/**
 * Joi schema for profile creation and full updates.
 * This schema defines the structure and validation rules for profile data.
 * Fields specified as required are: user_id, full_name, and role.
 */
const profileSchema = Joi.object({
  id: Joi.string()
    .uuid()
    .required()
    .description("Unique identifier for the user"),
  full_name: Joi.string()
    .required()
    .max(255)
    .trim()
    .description("Full name of the user"),
  role: Joi.string()
    .valid("admin", "manager", "staff")
    .required()
    .description("Role of the user"),
  cell_number: Joi.string()
    .allow(null, "")
    .max(20)
    .description("Cell number of the user"),
  profile_image_url: Joi.string()
    .uri()
    .allow(null, "")
    .max(500)
    .description("URL of the profile image"),
});

/**
 * Joi schema for partial updates of profile data.
 * This schema makes all fields optional to allow for partial updates.
 */
const profileUpdateSchema = profileSchema.fork(
  Object.keys(profileSchema.describe().keys),
  (schema) => schema.optional()
);

/**
 * Validates a profile object against the full profile schema.
 * @param {Object} profile - The profile object to validate.
 * @returns {Object} The validation result.
 */
export const validateProfile = (profile) => {
  return profileSchema.validate(profile, { abortEarly: false });
};

/**
 * Validates a partial profile object for updates.
 * @param {Object} profileUpdate - The partial profile object to validate.
 * @returns {Object} The validation result.
 */
export const validateProfileUpdate = (profileUpdate) => {
  return profileUpdateSchema.validate(profileUpdate, { abortEarly: false });
};

export { profileSchema, profileUpdateSchema };
