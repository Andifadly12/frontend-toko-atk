export const customerFormFields = [
  {
    name: "name",
    label: "Nama Customer",
    type: "text",
    placeholder: "Contoh: Sekolah SMA 1",
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

export const initialCustomerForm = {
  name: "",
  phone: "",
  address: "",
};
