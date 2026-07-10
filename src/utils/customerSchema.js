import { z } from "zod";

const customerSchema = z.object({
  name: z.string().min(1, "Nama customer wajib diisi"),

  phone: z.string().min(1, "No. telepon wajib diisi"),

  email: z
    .string()
    .email("Format email tidak valid")
    .optional()
    .or(z.literal("")),

  address: z.string().optional(),

  customer_type: z.string().min(1, "Tipe customer wajib dipilih"),

  status: z.string().min(1, "Status wajib dipilih"),
});

export default customerSchema;
