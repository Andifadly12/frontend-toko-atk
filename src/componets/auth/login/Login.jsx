import { useState } from "react";
import { Link } from "react-router";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
  };

  return (
    <div className="relative flex min-h-screen overflow-hidden bg-slate-950">
      {/* Background decoration */}
      <div className="absolute -left-24 -top-24 h-80 w-80 animate-pulse rounded-full bg-blue-500/20 blur-3xl" />
      <div className="absolute -bottom-32 right-0 h-96 w-96 animate-pulse rounded-full bg-indigo-500/20 blur-3xl" />

      <div className="relative z-10 flex min-h-screen w-full">
        {/* Left section */}
        <section className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-gradient-to-br from-blue-700 via-indigo-700 to-slate-950 p-12 text-white lg:flex">
          <div className="absolute -right-24 top-20 h-72 w-72 rounded-full border border-white/10" />
          <div className="absolute -right-8 top-36 h-72 w-72 rounded-full border border-white/10" />

          {/* Logo */}
          <div className="relative z-10 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-xl font-bold text-blue-700 shadow-xl">
              ATK
            </div>

            <div>
              <h1 className="text-lg font-bold">Toko ATK</h1>

              <p className="text-xs text-blue-100">Point of Sale System</p>
            </div>
          </div>

          {/* Description */}
          <div className="relative z-10 max-w-lg">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              Sistem siap digunakan
            </div>

            <h2 className="text-4xl font-bold leading-tight xl:text-5xl">
              Kelola toko menjadi lebih mudah dan efisien.
            </h2>

            <p className="mt-5 max-w-md text-base leading-7 text-blue-100">
              Kelola produk, supplier, pembelian, transaksi, dan laporan toko
              dalam satu sistem.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                <p className="text-2xl font-bold">100%</p>
                <p className="mt-1 text-xs text-blue-100">Mudah digunakan</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                <p className="text-2xl font-bold">24/7</p>
                <p className="mt-1 text-xs text-blue-100">Akses sistem</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                <p className="text-2xl font-bold">Aman</p>
                <p className="mt-1 text-xs text-blue-100">Data tersimpan</p>
              </div>
            </div>
          </div>

          <p className="relative z-10 text-sm text-blue-200">
            © 2026 Toko ATK. All rights reserved.
          </p>
        </section>

        {/* Right section */}
        <section className="flex w-full items-center justify-center bg-slate-50 px-5 py-10 lg:w-1/2">
          <div className="w-full max-w-md">
            {/* Mobile logo */}
            <div className="mb-10 flex items-center justify-center gap-3 lg:hidden">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 font-bold text-white shadow-lg shadow-blue-500/30">
                ATK
              </div>

              <div>
                <h1 className="font-bold text-slate-800">Toko ATK</h1>

                <p className="text-xs text-slate-500">Point of Sale System</p>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/60 sm:p-10">
              <div className="mb-8">
                <p className="mb-2 text-sm font-semibold text-blue-600">
                  Selamat datang kembali
                </p>

                <h2 className="text-3xl font-bold text-slate-900">
                  Login ke akun Anda
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Masukkan email dan password untuk melanjutkan.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Email
                  </label>

                  <div className="group relative">
                    <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 transition group-focus-within:text-blue-600">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        className="h-5 w-5"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <path d="M4 6h16v12H4z" />
                        <path d="m4 7 8 6 8-6" />
                      </svg>
                    </span>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="admin@tokoatk.com"
                      className="h-13 w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="text-sm font-semibold text-slate-700"
                    >
                      Password
                    </label>

                    <Link
                      to="/forgot-password"
                      className="text-xs font-semibold text-blue-600 transition hover:text-blue-700"
                    >
                      Lupa password?
                    </Link>
                  </div>

                  <div className="group relative">
                    <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 transition group-focus-within:text-blue-600">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        className="h-5 w-5"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <rect x="5" y="10" width="14" height="10" rx="2" />
                        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                      </svg>
                    </span>

                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Masukkan password"
                      className="h-13 w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-12 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(current => !current)}
                      className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 transition hover:text-blue-600"
                      aria-label={
                        showPassword
                          ? "Sembunyikan password"
                          : "Tampilkan password"
                      }
                    >
                      {showPassword ? (
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          className="h-5 w-5"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        >
                          <path d="M3 3l18 18" />
                          <path d="M10.6 10.7a2 2 0 0 0 2.7 2.7" />
                          <path d="M9.9 4.2A10.8 10.8 0 0 1 12 4c5.5 0 9 5 9 5a15.4 15.4 0 0 1-2.1 2.6" />
                          <path d="M6.2 6.2C4.2 7.5 3 9 3 9s3.5 5 9 5a10.8 10.8 0 0 0 3-.4" />
                        </svg>
                      ) : (
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          className="h-5 w-5"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        >
                          <path d="M3 12s3.5-5 9-5 9 5 9 5-3.5 5-9 5-9-5-9-5Z" />
                          <circle cx="12" cy="12" r="2.5" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember me */}
                <label className="flex cursor-pointer items-center gap-3 text-sm text-slate-600">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-slate-300 text-blue-600 accent-blue-600"
                  />
                  Ingat saya di perangkat ini
                </label>

                {/* Submit */}
                <button
                  type="submit"
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-500/30 active:translate-y-0"
                >
                  Login
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-5 w-5 transition-transform group-hover:translate-x-1"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14" />
                    <path d="m13 6 6 6-6 6" />
                  </svg>
                </button>
              </form>

              <div className="my-7 flex items-center gap-4">
                <div className="h-px flex-1 bg-slate-200" />
                <span className="text-xs text-slate-400">
                  Belum memiliki akun?
                </span>
                <div className="h-px flex-1 bg-slate-200" />
              </div>

              <Link
                to="/register"
                className="flex w-full items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
              >
                Buat akun baru
              </Link>
            </div>

            <p className="mt-6 text-center text-xs text-slate-400">
              Dengan login, Anda menyetujui kebijakan dan ketentuan sistem.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Login;
