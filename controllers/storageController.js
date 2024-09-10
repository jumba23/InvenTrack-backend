/**
 * Storage Controller
 *
 * This controller handles file upload operations to Supabase storage,
 * specifically for user profile images.
 *
 * @module controllers/storageController
 */

import { uploadProfileImage as uploadProfileImageService } from "../services/storageService.js";
import { logger } from "../server.js";

/**
 * Handle Profile Image Upload
 *
 * Handles the upload of a user's profile image to Supabase storage.
 *
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const handleProfileImageUpload = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { file } = req.files;

    if (!file) {
      const uploadError = new Error("No file uploaded");
      uploadError.name = "FileUploadError";
      throw uploadError;
    }

    const fileName = `profile_${userId}_${Date.now()}.${file.name
      .split(".")
      .pop()}`;
    const { publicUrl, error } = await uploadProfileImageService(
      req.supabase,
      fileName,
      file.data
    );

    if (error) {
      logger.error("Error uploading profile image:", error);
      return res.status(500).json({ error: "Failed to upload profile image" });
    }

    // Update user profile with new image URL
    const { error: profileError } = await req.supabase
      .from("profiles")
      .update({ profile_image_url: publicUrl })
      .eq("user_id", userId);

    if (profileError) {
      logger.error("Error updating profile with new image URL:", profileError);
      return res
        .status(500)
        .json({ error: "Failed to update profile with new image URL" });
    }

    res.status(200).json({
      message: "Profile image uploaded successfully",
      imageUrl: publicUrl,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get Profile Image
 *
 * Retrieves the URL of a user's profile image from the profiles table.
 *
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const getProfileImage = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const { data: profile, error: profileError } = await req.supabase
      .from("profiles")
      .select("profile_image_url")
      .eq("user_id", userId)
      .single();

    if (profileError) {
      logger.error("Error fetching profile data:", profileError);
      return res.status(500).json({ error: "Failed to fetch profile data" });
    }

    if (!profile || !profile.profile_image_url) {
      return res.status(404).json({ error: "Profile image not found" });
    }

    res.status(200).json({ imageUrl: profile.profile_image_url });
  } catch (error) {
    next(error);
  }
};
