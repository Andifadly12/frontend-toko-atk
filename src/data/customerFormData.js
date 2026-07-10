const customerFormData = [
  {
    name: "name",
    label: "Nama Customer",
    type: "text",
    placeholder: "Contoh: Andi Fadly",
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
    placeholder: "Contoh: customer@gmail.com",
  },
  {
    name: "address",
    label: "Alamat",
    type: "textarea",
    placeholder: "Masukkan alamat customer",
    rows: 3,
  },
  {
    name: "customer_type",
    label: "Tipe Customer",
    type: "select",
    placeholder: "Pilih tipe customer",
    required: true,
    options: [
      {
        label: "Retail",
        value: "retail",
      },
      {
        label: "Reseller",
        value: "reseller",
      },
      {
        label: "Corporate",
        value: "corporate",
      },
    ],
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

export default customerFormData;
