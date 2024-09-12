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

/**
 * Get all profiles
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getAllProfiles = async (req, res) => {
  try {
    const { data, error } = await req.supabase.from("profiles").select("*");

    if (error) throw error;

    res.json(data);
  } catch (error) {
    logger.error("Error in getAllProfiles:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching profiles" });
  }
};

/**
 * Get a profile by user ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getProfileById = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await req.supabase
      .from("profiles")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    if (!data) return res.status(404).json({ error: "Profile not found" });

    res.json(data);
  } catch (error) {
    logger.error("Error in getProfileById:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the profile" });
  }
};

/**
 * Create a new profile
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const createProfile = async (req, res) => {
  try {
    const { error } = validateProfile(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { data, error: insertError } = await req.supabase
      .from("profiles")
      .insert([req.body])
      .select();

    if (insertError) throw insertError;

    res.status(201).json(data[0]);
  } catch (error) {
    logger.error("Error in createProfile:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the profile" });
  }
};

/**
 * Update a profile
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = validateProfileUpdate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { data, error: updateError } = await req.supabase
      .from("profiles")
      .update(req.body)
      .eq("id", id)
      .select();

    if (updateError) throw updateError;
    if (data.length === 0)
      return res.status(404).json({ error: "Profile not found" });

    res.json(data[0]);
  } catch (error) {
    logger.error("Error in updateProfile:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the profile" });
  }
};

/**
 * Delete a profile
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const deleteProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = await req.supabase.from("profiles").delete().eq("id", id);

    if (error) throw error;

    res.json({ message: "Profile deleted successfully" });
  } catch (error) {
    logger.error("Error in deleteProfile:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the profile" });
  }
};
