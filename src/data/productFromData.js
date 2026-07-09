const productFormData = [
  {
    name: "name",
    label: "Nama Produk",
    type: "text",
    placeholder: "Contoh: Pulpen Pilot",
    required: true,
  },
  {
    name: "category",
    label: "Kategori",
    type: "select",
    placeholder: "Pilih kategori",
    required: true,
    options: [
      { label: "Alat Tulis", value: "Alat Tulis" },
      { label: "Buku", value: "Buku" },
      { label: "Perlengkapan Kantor", value: "Perlengkapan Kantor" },
    ],
  },
  {
    name: "supplier",
    label: "Supplier",
    type: "select",
    placeholder: "Pilih supplier",
    required: true,
    options: [
      { label: "PT Sumber ATK", value: "PT Sumber ATK" },
      { label: "CV Buku Jaya", value: "CV Buku Jaya" },
      { label: "PT Kantor Mandiri", value: "PT Kantor Mandiri" },
    ],
  },
  {
    name: "purchase_price",
    label: "Harga Beli",
    type: "number",
    placeholder: "Contoh: 2500",
  },
  {
    name: "selling_price",
    label: "Harga Jual",
    type: "number",
    placeholder: "Contoh: 3000",
  },
  {
    name: "stock",
    label: "Stok",
    type: "number",
    placeholder: "Contoh: 100",
  },
];

export default productFormData