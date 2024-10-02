// controllers/profileController.js

/**
 * Profile Controller
 * This controller handles profile operations including fetching, creating, updating, and deleting profiles.
 * It interacts with Supabase for database operations and uses Joi for validation.
 * The controller functions correspond to specific API endpoints and handle the request and response.
 * The controller functions are used as the request handlers in the profile routes.
 */

import {
  validateProfile,
  validateProfileUpdate,
} from "../models/profileModel.js";
import { logger } from "../server.js";
import ApiError from "../utils/apiError.js";

/**
 * Get all profiles
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const getAllProfiles = async (req, res, next) => {
  try {
    const { data, error } = await req.supabase.from("profiles").select("*");

    if (error) throw new ApiError(500, "Failed to fetch profiles");

    res.json(data);
  } catch (error) {
    logger.error("Error in getAllProfiles:", error);
    next(error);
  }
};

/**
 * Get a profile by user ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const getProfileById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { data, error } = await req.supabase
      .from("profiles")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw new ApiError(500, "Failed to fetch the profile");
    if (!data) throw new ApiError(404, "Profile not found");

    res.json(data);
  } catch (error) {
    logger.error("Error in getProfileById:", error);
    next(error);
  }
};

/**
 * Create a new profile
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const createProfile = async (req, res, next) => {
  try {
    const { error } = validateProfile(req.body);
    if (error) throw new ApiError(400, error.details[0].message);

    const { data, error: insertError } = await req.supabase
      .from("profiles")
      .insert([req.body])
      .select();

    if (insertError) throw new ApiError(500, "Failed to create the profile");

    res.status(201).json(data[0]);
  } catch (error) {
    logger.error("Error in createProfile:", error);
    next(error);
  }
};

/**
 * Update a profile
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const updateProfile = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { error } = validateProfileUpdate(req.body);
    if (error) throw new ApiError(400, error.details[0].message);

    const { data, error: updateError } = await req.supabase
      .from("profiles")
      .update(req.body)
      .eq("id", id)
      .select();

    if (updateError) throw new ApiError(500, "Failed to update the profile");
    if (data.length === 0) throw new ApiError(404, "Profile not found");

    res.json(data[0]);
  } catch (error) {
    logger.error("Error in updateProfile:", error);
    next(error);
  }
};

/**
 * Delete a profile
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const deleteProfile = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { error } = await req.supabase.from("profiles").delete().eq("id", id);

    if (error) throw new ApiError(500, "Failed to delete the profile");

    res.json({ message: "Profile deleted successfully" });
  } catch (error) {
    logger.error("Error in deleteProfile:", error);
    next(error);
  }
};
