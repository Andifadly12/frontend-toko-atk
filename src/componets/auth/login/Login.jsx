import { useState } from "react";
import { Link, useNavigate } from "react-router";

import Button from "../../Button";
import Card from "../../Card";
import Badge from "../../badge";
import Text from "../../Text";
import Form from "../../form";

import useForm from "../../../hooks/useForm";
import useAuthStore from "../../../hooks/authStore";

import loginSchema from "../../../utils/loginSchema";
import loginFormFields from "../../../utils/loginFormFields";

import { loginUser } from "../../../stores/authServices";

const initialLoginForm = {
  email: "",
  password: "",
};

const Login = () => {
  const navigate = useNavigate();

  const login = useAuthStore(state => state.login);

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const { form, errors, setErrors, handleChange } = useForm(initialLoginForm);

  const handleSubmit = async e => {
    e.preventDefault();

    const result = loginSchema.safeParse(form);

    if (!result.success) {
      const fieldErrors = {};

      result.error.issues.forEach(issue => {
        fieldErrors[issue.path[0]] = issue.message;
      });

      setErrors(fieldErrors);
      return;
    }

    try {
      setLoading(true);

      const response = await loginUser({
        email: result.data.email,
        password: result.data.password,
      });

      const token = response.token || response.data?.token;
      const user = response.user || response.data?.user;

      if (!token) {
        alert("Token tidak ditemukan dari backend");
        return;
      }

      login({
        token,
        user,
      });

      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.log("ERROR LOGIN:", error);
      alert(error.message || "Login gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen overflow-hidden bg-slate-950">
      <div className="absolute -left-24 -top-24 h-80 w-80 animate-pulse rounded-full bg-blue-500/20 blur-3xl" />
      <div className="absolute -bottom-32 right-0 h-96 w-96 animate-pulse rounded-full bg-indigo-500/20 blur-3xl" />

      <div className="relative z-10 flex min-h-screen w-full">
        <section className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-gradient-to-br from-blue-700 via-indigo-700 to-slate-950 p-12 text-white lg:flex">
          <div className="absolute -right-24 top-20 h-72 w-72 rounded-full border border-white/10" />
          <div className="absolute -right-8 top-36 h-72 w-72 rounded-full border border-white/10" />

          <div className="relative z-10 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-xl font-bold text-blue-700 shadow-xl">
              ATK
            </div>

            <div>
              <Text as="h1" weight="bold" className="text-white">
                Toko ATK
              </Text>

              <Text size="sm" className="text-blue-100">
                Point of Sale System
              </Text>
            </div>
          </div>

          <div className="relative z-10 max-w-lg">
            <Badge variant="success">Sistem siap digunakan</Badge>

            <Text
              as="h2"
              weight="bold"
              className="mt-6 text-4xl leading-tight text-white xl:text-5xl"
            >
              Kelola toko menjadi lebih mudah dan efisien.
            </Text>

            <Text className="mt-5 max-w-md text-base leading-7 text-blue-100">
              Kelola produk, supplier, pembelian, transaksi, dan laporan toko
              dalam satu sistem.
            </Text>

            <div className="mt-8 grid grid-cols-3 gap-4">
              <Card variant="default" className="border-white/10 bg-white/10">
                <Text weight="bold" className="text-2xl text-white">
                  100%
                </Text>

                <Text size="sm" className="mt-1 text-blue-100">
                  Mudah digunakan
                </Text>
              </Card>

              <Card variant="default" className="border-white/10 bg-white/10">
                <Text weight="bold" className="text-2xl text-white">
                  24/7
                </Text>

                <Text size="sm" className="mt-1 text-blue-100">
                  Akses sistem
                </Text>
              </Card>

              <Card variant="default" className="border-white/10 bg-white/10">
                <Text weight="bold" className="text-2xl text-white">
                  Aman
                </Text>

                <Text size="sm" className="mt-1 text-blue-100">
                  Data tersimpan
                </Text>
              </Card>
            </div>
          </div>

          <Text size="sm" className="relative z-10 text-blue-200">
            © 2026 Toko ATK. All rights reserved.
          </Text>
        </section>

        <section className="flex w-full items-center justify-center bg-slate-50 px-5 py-10 lg:w-1/2">
          <div className="w-full max-w-md">
            <div className="mb-10 flex items-center justify-center gap-3 lg:hidden">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 font-bold text-white shadow-lg shadow-blue-500/30">
                ATK
              </div>

              <div>
                <Text weight="bold">Toko ATK</Text>

                <Text size="sm" color="muted">
                  Point of Sale System
                </Text>
              </div>
            </div>

            <Card variant="default" className="rounded-3xl border-slate-200">
              <div className="mb-8">
                <Badge variant="primary">Selamat datang kembali</Badge>

                <Text as="h2" weight="bold" className="mt-4 text-3xl">
                  Login ke akun Anda
                </Text>

                <Text size="sm" color="muted" className="mt-2 leading-6">
                  Masukkan email dan password untuk melanjutkan.
                </Text>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <Form
                  fields={loginFormFields(showPassword)}
                  form={form}
                  errors={errors}
                  onChange={handleChange}
                  onSubmit={handleSubmit}
                />

                <div className="flex items-center justify-between">
                  <label className="flex cursor-pointer items-center gap-3">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={e => setRememberMe(e.target.checked)}
                      className="h-4 w-4 rounded border-slate-300 accent-blue-600"
                    />

                    <Text size="sm" color="muted">
                      Ingat saya
                    </Text>
                  </label>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowPassword(current => !current)}
                  >
                    {showPassword ? "Sembunyikan" : "Lihat"}
                  </Button>
                </div>

                <Link
                  to="/forgot-password"
                  className="block text-right text-xs font-semibold text-blue-600 transition hover:text-blue-700"
                >
                  Lupa password?
                </Link>

                <Button type="submit" variant="primary" full disabled={loading}>
                  {loading ? "Memproses..." : "Login"}
                </Button>
              </form>

              <div className="my-7 flex items-center gap-4">
                <div className="h-px flex-1 bg-slate-200" />

                <Text size="sm" color="muted">
                  Belum memiliki akun?
                </Text>

                <div className="h-px flex-1 bg-slate-200" />
              </div>

              <Link to="/register">
                <Button type="button" variant="outline" full>
                  Buat akun baru
                </Button>
              </Link>
            </Card>

            <Text size="sm" color="muted" className="mt-6 text-center">
              Dengan login, Anda menyetujui kebijakan dan ketentuan sistem.
            </Text>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Login;
