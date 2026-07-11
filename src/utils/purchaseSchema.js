import { z } from "zod";

const purchaseSchema = z.object({
  invoice_number: z.string().min(1, "Nomor invoice wajib diisi"),

  product_name: z.string().min(1, "Nama produk wajib diisi"),

  supplier: z.string().min(1, "Supplier wajib dipilih"),

  quantity: z.coerce
    .number({
      invalid_type_error: "Jumlah pembelian harus berupa angka",
    })
    .min(1, "Jumlah pembelian minimal 1"),

  purchase_price: z.coerce
    .number({
      invalid_type_error: "Harga beli harus berupa angka",
    })
    .min(1, "Harga beli wajib diisi"),

  total_price: z.coerce.number().min(0),

  purchase_date: z.string().min(1, "Tanggal pembelian wajib diisi"),

  status: z.string().min(1, "Status wajib dipilih"),
});

export default purchaseSchema;
