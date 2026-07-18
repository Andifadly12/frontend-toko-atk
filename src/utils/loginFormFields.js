const loginFormFields = (showPassword = false) => [
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "admin@tokoatk.com",
    required: true,
  },
  {
    name: "password",
    label: "Password",
    type: showPassword ? "text" : "password",
    placeholder: "Masukkan password",
    required: true,
  },
];

export default loginFormFields;
