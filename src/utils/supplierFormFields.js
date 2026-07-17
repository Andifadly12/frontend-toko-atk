export const supplierFormFields = [
  {
    name: "name",
    label: "Nama Supplier",
    type: "text",
    placeholder: "Contoh: PT Sinar ATK",
    required: true,
  },
  {
    name: "phone",
    label: "Telepon",
    type: "text",
    placeholder: "Contoh: 081234567890",
    required: true,
  },
  {
    name: "address",
    label: "Alamat",
    type: "textarea",
    placeholder: "Contoh: Bulukumba",
    required: true,
  },
];

export const initialSupplierForm = {
  name: "",
  phone: "",
  address: "",
};
