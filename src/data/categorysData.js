const categorysData = [
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
    placeholder: "Contoh: Pulpen, pensil, spidol",
  },
  {
    name: "total_products",
    label: "Jumlah Produk",
    type: "number",
    placeholder: "Contoh: 20",
  },
  {
    name: "status",
    label: "Status",
    type: "select",
    placeholder: "Pilih status",
    colorType: "primary",
    options: [
      {
        label: "Aktif",
        value: "active",
      },
      {
        label: "Tidak Aktif",
        value: "inactive",
      },
    ],
  },
];

export default categorysData;
