const fetchAllProducts = async (supabase) => {
  try {
    const { data, error } = await supabase.from("products").select("*");
    if (error) throw error;
    return data;
  } catch (error) {
    throw error;
  }
};

const addNewProduct = async (supabase, product) => {
  try {
    const { data, error } = await supabase
      .from("Products")
      .insert(product)
      .select();
    if (error) throw error;
    return data;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  fetchAllProducts,
  addNewProduct,
};
