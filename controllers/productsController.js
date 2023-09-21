const productsService = require("../services/productsService");
const { formatResponse } = require("../utils/index");

const getAllProducts = async (req, res) => {
  try {
    const products = await productsService.fetchAllProducts(req.supabase);
    const formattedResponse = formatResponse(products);
    res.json(formattedResponse);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching products");
  }
};

const addProduct = async (req, res) => {
  try {
    //test object to add to the database
    const newProduct = {
      product_id: 11,
      name: "SunShield Sunscreen SPF 80",
      levels: "In Stock",
      value: "$70",
      last_ordered: "2022-01-04",
    };
    await productsService.addNewProduct(req.supabase, newProduct);
    res.send("Product added");
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while adding the product");
  }
};

module.exports = {
  getAllProducts,
  addProduct,
};
