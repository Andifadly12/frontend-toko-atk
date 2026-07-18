import { z } from "zod";

const registerSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi"),

  email: z
    .string()
    .min(1, "Email wajib diisi")
    .email("Format email tidak valid"),

  password: z
    .string()
    .min(1, "Password wajib diisi")
    .min(6, "Password minimal 6 karakter"),

  role: z.enum(["admin", "kasir"], {
    message: "Role wajib dipilih",
  }),
});

export default registerSchema;
