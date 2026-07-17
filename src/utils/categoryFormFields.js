export const categoryFormFields = [
  {
    name: "name",
    label: "Nama Kategori",
    type: "text",
    placeholder: "Contoh: Alat Tulis",
    required: true,
  },
  {
    name: "description",
    label: "Deskripsi",
    type: "textarea",
    placeholder: "Contoh: Kategori untuk alat tulis kantor",
  },
  {
    name: "status",
    label: "Status",
    type: "select",
    placeholder: "Pilih status",
    required: true,
    options: [
      { label: "Aktif", value: "active" },
      { label: "Tidak Aktif", value: "inactive" },
    ],
  },
  {
    name: "total_products",
    label: "Jumlah Produk",
    type: "number",
    placeholder: "Contoh: 10",
    required: true,
  },
];
