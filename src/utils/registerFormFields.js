const registerFormFields = (showPassword = false) => [
  {
    name: "name",
    label: "Nama lengkap",
    type: "text",
    placeholder: "Masukkan nama lengkap",
    required: true,
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "contoh@email.com",
    required: true,
  },
  {
    name: "password",
    label: "Password",
    type: showPassword ? "text" : "password",
    placeholder: "Minimal 6 karakter",
    required: true,
  },
  {
    name: "role",
    label: "Role",
    type: "select",
    placeholder: "Pilih role",
    required: true,
    options: [
      {
        label: "Admin",
        value: "admin",
      },
      {
        label: "Kasir",
        value: "kasir",
      },
    ],
  },
];

export default registerFormFields;
