const supplierFormData = [
  {
    name: "name",
    label: "Nama Supplier",
    type: "text",
    placeholder: "Contoh: PT Sumber ATK",
    required: true,
  },
  {
    name: "contact_person",
    label: "Contact Person",
    type: "text",
    placeholder: "Contoh: Bapak Ahmad",
    required: true,
  },
  {
    name: "phone",
    label: "No. Telepon",
    type: "text",
    placeholder: "Contoh: 081234567890",
    required: true,
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Contoh: supplier@gmail.com",
  },
  {
    name: "address",
    label: "Alamat",
    type: "textarea",
    placeholder: "Masukkan alamat supplier",
    rows: 3,
  },
  {
    name: "status",
    label: "Status",
    type: "select",
    placeholder: "Pilih status",
    required: true,
    options: [
      {
        label: "Active",
        value: "active",
      },
      {
        label: "Inactive",
        value: "inactive",
      },
    ],
  },
];

export default supplierFormData;
