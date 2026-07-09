import { z } from "zod";

const categorySchema = z.object({
  name: z.string().min(1, "Nama kategori wajib diisi"),

  description: z.string().optional(),

  total_products: z.coerce.number().min(0, "Jumlah produk tidak boleh minus"),

  status: z.enum(["active", "inactive"], {
    message: "Status wajib dipilih",
  }),
});

export default categorySchema;
