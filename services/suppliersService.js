export const fetchAllSuppliers = async (supabase) => {
  try {
    const { data, error } = await supabase.from("suppliers").select("*");
    if (error) throw error;
    return data;
  } catch (error) {
    throw error;
  }
};

export const addNewSupplier = async (supabase, supplier) => {
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

export const fetchSupplierById = async (supabase, id) => {
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

export const updateSupplierById = async (supabase, id, supplier) => {
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

export const deleteSupplierById = async (supabase, id) => {
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
