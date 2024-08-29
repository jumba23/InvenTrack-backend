/**
 * webhookController.js
 *
 * This module contains the controller function for handling incoming webhooks.
 * It processes webhook data, performs validation, and stores the data in a Supabase database.
 *
 * The controller handles product information received via webhooks, including:
 * - Product ID
 * - Product Name
 * - Unit Amount
 * - Date Processed
 * - Client Name
 * - Total Price
 *
 * This file uses ES6 module syntax. Ensure your package.json has "type": "module".
 */

import supabase from "../config/supabaseClient.js";

/**
 * Handles incoming webhook requests
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON response indicating success or failure
 */
export const yourWebhookHandler = async (req, res) => {
  // Extract data from the incoming request body
  const {
    product_id,
    product_name,
    unit_amount,
    date_processed,
    client_name,
    total_price,
  } = req.body;

  // Perform basic validation to check if all the required fields are available
  if (
    product_id &&
    product_name &&
    unit_amount &&
    date_processed &&
    client_name &&
    total_price
  ) {
    try {
      // Store incoming data in your database - supabase
      const { data, error } = await supabase.from("Product").insert([
        {
          product_id,
          product_name,
          unit_amount,
          date_processed,
          client_name,
          total_price,
        },
      ]);

      if (error) {
        console.error("Error inserting product data:", error);
        return res.status(500).json({
          success: false,
          message: "An error occurred while adding the product",
        });
      }

      // Uncomment for debugging purposes
      // console.log("Webhook received with the following details:");
      // console.log(`Product ID: ${product_id}`);
      // console.log(`Product Name: ${product_name}`);
      // console.log(`Unit Amount: ${unit_amount}`);
      // console.log(`Date Processed: ${date_processed}`);
      // console.log(`Client Name: ${client_name}`);
      // console.log(`Total Price: ${total_price}`);

      return res.status(200).json({
        success: true,
        message: "Webhook processed successfully",
      });
    } catch (error) {
      console.error("Unexpected error in webhook handler:", error);
      return res.status(500).json({
        success: false,
        message: "An unexpected error occurred",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Missing required fields",
    });
  }
};
