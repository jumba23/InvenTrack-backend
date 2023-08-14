const formatResponse = (inventory) => {
  return inventory.map((item) => ({
    product_id: item.product_id, // You may need to provide the appropriate ID
    name: item.name,
    supplier: item.supplier,
    levels: thresholdLevels(item),
    value: `$${item.price}`,
    last_ordered: item.last_order_date,

    // quantity: item.quantity,
    // price_per_unit: item.price_per_unit,
  }));
};

const thresholdLevels = (item) => {
  if (item.quantity == 0) {
    return "Out of Stock";
  } else if (item.quantity <= item.threshold_quantity) {
    return "Low Stock";
  } else {
    return "In Stock";
  }
};

module.exports = {
  formatResponse,
};
