import { z } from "zod";

const productSchema = z
  .object({
    name: z.string().min(1, "Nama produk wajib diisi"),

    category: z.string().min(1, "Kategori wajib dipilih"),

    supplier: z.string().min(1, "Supplier wajib dipilih"),

    purchase_price: z.coerce
      .number({
        invalid_type_error: "Harga beli harus berupa angka",
      })
      .min(1, "Harga beli wajib diisi"),

    selling_price: z.coerce
      .number({
        invalid_type_error: "Harga jual harus berupa angka",
      })
      .min(1, "Harga jual wajib diisi"),

    stock: z.coerce
      .number({
        invalid_type_error: "Stok harus berupa angka",
      })
      .min(0, "Stok tidak boleh minus"),
  })
  .refine(data => data.selling_price >= data.purchase_price, {
    message: "Harga jual tidak boleh lebih kecil dari harga beli",
    path: ["selling_price"],
  });

export default productSchema;
