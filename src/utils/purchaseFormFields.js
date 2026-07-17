export const purchaseFormFields = (suppliers = [], products = []) => [
  {
    name: "supplier_id",
    label: "Supplier",
    type: "select",
    placeholder: "Pilih supplier",
    options: suppliers.map(supplier => ({
      label: supplier.name,
      value: supplier.id,
    })),
  },
  {
    name: "product_id",
    label: "Produk",
    type: "select",
    placeholder: "Pilih produk",
    required: true,
    options: products.map(product => ({
      label: `${product.name} - Stok: ${product.stock}`,
      value: product.id,
    })),
  },
  {
    name: "quantity",
    label: "Jumlah",
    type: "number",
    placeholder: "Contoh: 10",
    required: true,
  },
  {
    name: "price",
    label: "Harga Beli",
    type: "number",
    placeholder: "Contoh: 5000",
    required: true,
  },
];

export const initialPurchaseForm = {
  supplier_id: "",
  product_id: "",
  quantity: "",
  price: "",
};
