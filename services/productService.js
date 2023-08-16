const updateProduct = async (product, db) => {
  console.log(product);
  const { data, error } = await db.from("products").insert(product);
  console.log({ data, error });
};

module.exports = {
  updateProduct,
};
