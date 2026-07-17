import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import Button from "../../Button";
import Input from "../../input";

import { loginUser } from "../../stores/authServices";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
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

    if (!form.email.trim()) {
      fieldErrors.email = "Email wajib diisi";
    }

    if (!form.password.trim()) {
      fieldErrors.password = "Password wajib diisi";
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

      const response = await loginUser({
        email: form.email,
        password: form.password,
      });

      const token = response.token || response.data?.token;
      const user = response.user || response.data?.user;

      if (!token) {
        alert("Token tidak ditemukan dari backend");
        return;
      }

      localStorage.setItem("token", token);

      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      }

      alert("Login berhasil");
      navigate("/dashboard");
    } catch (error) {
      console.log("ERROR LOGIN:", error);
      alert(error.message || "Login gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-slate-800">Login</h1>
          <p className="mt-2 text-sm text-slate-500">
            Masuk ke sistem Toko ATK
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
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

          <Button type="submit" variant="primary" full disabled={loading}>
            {loading ? "Memproses..." : "Login"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Belum punya akun?{" "}
          <Link to="/register" className="font-semibold text-blue-600">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
