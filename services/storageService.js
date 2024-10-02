/**
 * Storage Service
 *
 * This service contains functions for interacting with Supabase storage,
 * specifically for handling user profile images.
 *
 * @module services/storageService
 */

import { logger } from "../server.js";
import ApiError from "../utils/apiError.js";

const BUCKET_NAME = "inventrack-profile-images";

/**
 * Upload Profile Image
 *
 * Uploads a profile image to Supabase storage.
 *
 * @async
 * @param {Object} supabase - Supabase client instance
 * @param {string} fileName - Name to be used for the file in storage
 * @param {Buffer} fileBuffer - File data as a Buffer
 * @returns {Promise<Object>} Object containing publicUrl
 * @throws {ApiError} If there's an error during the upload process
 */
export const uploadProfileImage = async (supabase, fileName, fileBuffer) => {
  try {
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(fileName, fileBuffer, {
        contentType: "image/jpeg",
        upsert: true,
      });

    if (error) {
      logger.error("Error uploading to Supabase Storage:", error);
      throw new ApiError(500, "Failed to upload image to storage");
    }

    const { data: urlData, error: urlError } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(fileName);

    if (urlError) {
      logger.error("Error getting public URL:", urlError);
      throw new ApiError(500, "Failed to get public URL for uploaded image");
    }

    return { publicUrl: urlData.publicUrl };
  } catch (error) {
    logger.error("Unexpected error in uploadProfileImage:", error);
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      500,
      "An unexpected error occurred while uploading the image"
    );
  }
};

/**
 * Get Profile Image URL
 *
 * Retrieves the public URL of a profile image from Supabase storage.
 *
 * @async
 * @param {Object} supabase - Supabase client instance
 * @param {string} fileName - Name of the file in storage
 * @returns {Promise<Object>} Object containing publicUrl
 * @throws {ApiError} If there's an error retrieving the public URL
 */
export const getProfileImageUrl = async (supabase, fileName) => {
  try {
    const { data, error } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(fileName);

    if (error) {
      logger.error("Error getting public URL:", error);
      throw new ApiError(500, "Failed to get public URL for the image");
    }

    return { publicUrl: data.publicUrl };
  } catch (error) {
    logger.error("Unexpected error in getProfileImageUrl:", error);
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      500,
      "An unexpected error occurred while getting the image URL"
    );
  }
};
