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
      .from("products")
      .insert(product)
      .select();
    if (error) throw error;
    return data;
  } catch (error) {
    throw error;
  }
};

const fetchProductById = async (supabase, id) => {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw error;
    return data;
  } catch (error) {
    throw error;
  }
};

const updateProductById = async (supabase, id, product) => {
  try {
    const { data, error } = await supabase
      .from("products")
      .update(product)
      .eq("id", id)
      .single();
    if (error) throw error;
    return data;
  } catch (error) {
    throw error;
  }
};

const deleteProductById = async (supabase, id) => {
  try {
    const { data, error } = await supabase
      .from("products")
      .delete()
      .eq("id", id);
    if (error) throw error;
    return data;
  } catch (error) {
    throw error;
  }
};

export default {
  fetchAllProducts,
  addNewProduct,
  fetchProductById,
  updateProductById,
  deleteProductById,
};
