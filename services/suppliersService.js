const fetchAllSuppliers = async (supabase) => {
  try {
    const { data, error } = await supabase.from("suppliers").select("*");
    if (error) throw error;
    return data;
  } catch (error) {
    throw error;
  }
};

const addNewSupplier = async (supabase, supplier) => {
  try {
    const { data, error } = await supabase
      .from("suppliers")
      .insert(supplier)
      .select();
    if (error) throw error;
    return data;
  } catch (error) {
    throw error;
  }
};

const fetchSupplierById = async (supabase, id) => {
  try {
    const { data, error } = await supabase
      .from("suppliers")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw error;
    return data;
  } catch (error) {
    throw error;
  }
};

const updateSupplierById = async (supabase, id, supplier) => {
  try {
    const { data, error } = await supabase
      .from("suppliers")
      .update(supplier)
      .eq("id", id)
      .single();
    if (error) throw error;
    return data;
  } catch (error) {
    throw error;
  }
};

const deleteSupplierById = async (supabase, id) => {
  try {
    const { data, error } = await supabase
      .from("suppliers")
      .delete()
      .eq("id", id);
    if (error) throw error;
    return data;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  fetchAllSuppliers,
  addNewSupplier,
  fetchSupplierById,
  updateSupplierById,
  deleteSupplierById,
};
