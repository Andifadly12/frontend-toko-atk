import { useState } from "react";
import { Link, useNavigate } from "react-router";

import Button from "../../Button";
import Card from "../../Card";
import Badge from "../../badge";
import Text from "../../Text";
import Form from "../../form";

import useForm from "../../../hooks/useForm";

import registerSchema from "../../../utils/registerSchema";
import registerFormFields from "../../../utils/registerFormFields";

import { registerUser } from "../../../stores/authServices";

const initialRegisterForm = {
  name: "",
  email: "",
  password: "",
  role: "kasir",
};

const Register = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { form, errors, setErrors, handleChange, resetForm } =
    useForm(initialRegisterForm);

  const handleSubmit = async e => {
    e.preventDefault();

    const result = registerSchema.safeParse(form);

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

      await registerUser({
        name: result.data.name,
        email: result.data.email,
        password: result.data.password,
        role: result.data.role,
      });

      alert("Register berhasil. Silakan login.");

      resetForm();
      navigate("/login", { replace: true });
    } catch (error) {
      console.log("ERROR REGISTER:", error);
      alert(error.message || "Register gagal");
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
            <Badge variant="success">Pendaftaran akun baru</Badge>

            <Text
              as="h2"
              weight="bold"
              className="mt-6 text-4xl leading-tight text-white xl:text-5xl"
            >
              Mulai kelola toko dengan lebih mudah.
            </Text>

            <Text className="mt-5 max-w-md leading-7 text-blue-100">
              Kelola produk, supplier, pembelian, penjualan, dan laporan dalam
              satu sistem.
            </Text>

            <div className="mt-8 space-y-4">
              <Card variant="default" className="border-white/10 bg-white/10">
                <Text weight="semibold" className="text-white">
                  Kelola stok
                </Text>

                <Text size="sm" className="mt-1 text-blue-100">
                  Pantau stok barang dengan mudah.
                </Text>
              </Card>

              <Card variant="default" className="border-white/10 bg-white/10">
                <Text weight="semibold" className="text-white">
                  Laporan transaksi
                </Text>

                <Text size="sm" className="mt-1 text-blue-100">
                  Pantau perkembangan penjualan.
                </Text>
              </Card>

              <Card variant="default" className="border-white/10 bg-white/10">
                <Text weight="semibold" className="text-white">
                  Data lebih aman
                </Text>

                <Text size="sm" className="mt-1 text-blue-100">
                  Akses sesuai role pengguna.
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
            <div className="mb-8 flex items-center justify-center gap-3 lg:hidden">
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
              <div className="mb-7">
                <Badge variant="primary">Bergabung dengan kami</Badge>

                <Text as="h2" weight="bold" className="mt-4 text-3xl">
                  Buat akun baru
                </Text>

                <Text size="sm" color="muted" className="mt-2 leading-6">
                  Lengkapi data berikut untuk membuat akun Toko ATK.
                </Text>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <Form
                  fields={registerFormFields(showPassword)}
                  form={form}
                  errors={errors}
                  onChange={handleChange}
                  onSubmit={handleSubmit}
                />

                <div className="flex justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowPassword(current => !current)}
                  >
                    {showPassword ? "Sembunyikan Password" : "Lihat Password"}
                  </Button>
                </div>

                <Button type="submit" variant="primary" full disabled={loading}>
                  {loading ? "Memproses..." : "Buat akun"}
                </Button>
              </form>

              <div className="my-6 flex items-center gap-4">
                <div className="h-px flex-1 bg-slate-200" />

                <Text size="sm" color="muted">
                  Sudah memiliki akun?
                </Text>

                <div className="h-px flex-1 bg-slate-200" />
              </div>

              <Link to="/login">
                <Button type="button" variant="outline" full>
                  Login ke akun
                </Button>
              </Link>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Register;
