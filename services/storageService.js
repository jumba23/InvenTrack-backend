/**
 * Storage Service
 *
 * This service contains functions for interacting with Supabase storage,
 * specifically for handling user profile images.
 *
 * @module services/storageService
 */

import { logger } from "../server.js";

const BUCKET_NAME = "profile-images";

/**
 * Upload Profile Image
 *
 * Uploads a profile image to Supabase storage.
 *
 * @async
 * @param {Object} supabase - Supabase client instance
 * @param {string} fileName - Name to be used for the file in storage
 * @param {Buffer} fileBuffer - File data as a Buffer
 * @returns {Promise<Object>} Object containing publicUrl or error
 */
export const uploadProfileImage = async (supabase, fileName, fileBuffer) => {
  try {
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(fileName, fileBuffer, {
        contentType: "image/jpeg", // Adjust based on actual file type
        upsert: true,
      });

    if (error) {
      logger.error("Error uploading to Supabase Storage:", error);
      return { error };
    }

    const { data: urlData, error: urlError } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(fileName);

    if (urlError) {
      logger.error("Error getting public URL:", urlError);
      return { error: urlError };
    }

    return { publicUrl: urlData.publicUrl };
  } catch (error) {
    logger.error("Unexpected error in uploadProfileImage:", error);
    const storageError = new Error("Failed to upload image to storage");
    storageError.name = "StorageError";
    throw storageError;
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
 * @returns {Promise<Object>} Object containing publicUrl or error
 */
export const getProfileImageUrl = async (supabase, fileName) => {
  try {
    const { data, error } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(fileName);

    if (error) {
      logger.error("Error getting public URL:", error);
      return { error };
    }

    return { publicUrl: data.publicUrl };
  } catch (error) {
    logger.error("Unexpected error in getProfileImageUrl:", error);
    return { error };
  }
};
