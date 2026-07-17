const productFormFields = (categories = []) => [
  {
    name: "name",
    label: "Nama Produk",
    type: "text",
    placeholder: "Contoh: Pulpen Pilot",
    required: true,
  },
  {
    name: "category_id",
    label: "Kategori",
    type: "select",
    placeholder: "Pilih kategori",
    required: true,
    options: categories.map(category => ({
      label: category.name,
      value: category.id,
    })),
  },
  {
    name: "sku",
    label: "SKU",
    type: "text",
    placeholder: "Contoh: PLP-001",
    required: true,
  },
  {
    name: "unit",
    label: "Satuan",
    type: "select",
    placeholder: "Pilih satuan",
    required: true,
    options: [
      { label: "pcs", value: "pcs" },
      { label: "box", value: "box" },
      { label: "pack", value: "pack" },
      { label: "lusin", value: "lusin" },
      { label: "rim", value: "rim" },
    ],
  },
  {
    name: "purchase_price",
    label: "Harga Beli",
    type: "number",
    placeholder: "Contoh: 2500",
    required: true,
  },
  {
    name: "selling_price",
    label: "Harga Jual",
    type: "number",
    placeholder: "Contoh: 3000",
    required: true,
  },
  {
    name: "stock",
    label: "Stok",
    type: "number",
    placeholder: "Contoh: 100",
    required: true,
  },
];

export default productFormFields;
