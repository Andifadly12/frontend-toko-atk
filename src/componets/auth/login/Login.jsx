import { Link } from "react-router";

import Button from "../../Button";
import Input from "../../input";

const Login = () => {
  const handleSubmit = e => {
    e.preventDefault();
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
            placeholder="Masukkan email"
          />

          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="Masukkan password"
          />

          <Button type="submit" variant="primary" full>
            Login
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Belum punya akun?{" "}
          <Link
            to="/register"
            className="font-semibold text-blue-600 hover:text-blue-700"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
