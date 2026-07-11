import { z } from "zod";

const supplierSchema = z.object({
  name: z.string().min(1, "Nama supplier wajib diisi"),

  contact_person: z.string().min(1, "Contact person wajib diisi"),

  phone: z.string().min(1, "No. telepon wajib diisi"),

  email: z
    .string()
    .email("Format email tidak valid")
    .optional()
    .or(z.literal("")),

  address: z.string().optional(),

  status: z.string().min(1, "Status wajib dipilih"),
});

export default supplierSchema;
