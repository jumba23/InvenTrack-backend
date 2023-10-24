// Inside webhookController.js

exports.yourWebhookHandler = async (req, res) => {
  // marked as async
  // Extract data from the incoming request body
  const {
    product_id,
    product_name,
    unit_amount,
    date_processed,
    client_name,
    total_price,
  } = req.body;

  // Perform basic validation to check if all the fields are available
  if (
    product_id &&
    product_name &&
    unit_amount &&
    date_processed &&
    client_name &&
    total_price
  ) {
    // Store incoming data in your database - supabase
    const { data, error } = await supabase // used await
      .from("Product")
      .insert([
        {
          product_id: product_id,
          product_name: product_name,
          unit_amount: unit_amount,
          date_processed: date_processed,
          client_name: client_name,
          total_price: total_price,
        },
      ]);

    if (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "An error occurred while adding the product",
      }); // added return
    }

    console.log("Webhook received with the following details:");
    console.log(`Product ID: ${product_id}`);
    console.log(`Product Name: ${product_name}`);
    console.log(`Unit Amount: ${unit_amount}`);
    console.log(`Date Processed: ${date_processed}`);
    console.log(`Client Name: ${client_name}`);
    console.log(`Total Price: ${total_price}`);

    return res
      .status(200)
      .json({ success: true, message: "Webhook processed successfully" }); // added return
  } else {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" }); // added return
  }
};
