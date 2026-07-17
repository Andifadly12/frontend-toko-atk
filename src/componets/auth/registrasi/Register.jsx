import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import Button from "../../Button";
import Input from "../../input";

import { registerUser } from "../../stores/authServices";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "kasir",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const validateForm = () => {
    const fieldErrors = {};

    if (!form.name.trim()) {
      fieldErrors.name = "Nama wajib diisi";
    }

    if (!form.email.trim()) {
      fieldErrors.email = "Email wajib diisi";
    }

    if (!form.password.trim()) {
      fieldErrors.password = "Password wajib diisi";
    }

    if (form.password.length < 6) {
      fieldErrors.password = "Password minimal 6 karakter";
    }

    if (!form.role) {
      fieldErrors.role = "Role wajib dipilih";
    }

    setErrors(fieldErrors);

    return Object.keys(fieldErrors).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const isValid = validateForm();
    if (!isValid) return;

    try {
      setLoading(true);

      await registerUser({
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
      });

      alert("Register berhasil, silakan login");
      navigate("/login");
    } catch (error) {
      console.log("ERROR REGISTER:", error);
      alert(error.message || "Register gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-slate-800">Register</h1>
          <p className="mt-2 text-sm text-slate-500">Buat akun baru Toko ATK</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Nama"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            placeholder="Masukkan nama"
            error={errors.name}
          />

          <Input
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Masukkan email"
            error={errors.email}
          />

          <Input
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Masukkan password"
            error={errors.password}
          />

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Role
            </label>

            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            >
              <option value="kasir">Kasir</option>
              <option value="admin">Admin</option>
            </select>

            {errors.role && (
              <p className="mt-1 text-sm text-red-600">{errors.role}</p>
            )}
          </div>

          <Button type="submit" variant="primary" full disabled={loading}>
            {loading ? "Memproses..." : "Register"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Sudah punya akun?{" "}
          <Link to="/login" className="font-semibold text-blue-600">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
