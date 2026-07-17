import { z } from "zod";

export const purchaseSchema = z.object({
  supplier_id: z.preprocess(
    value => {
      if (value === "" || value === null || value === undefined) {
        return null;
      }

      return Number(value);
    },
    z
      .number({
        message: "Supplier tidak valid",
      })
      .int("Supplier tidak valid")
      .positive("Supplier tidak valid")
      .nullable(),
  ),

  product_id: z.coerce
    .number({
      message: "Produk wajib dipilih",
    })
    .int("Produk tidak valid")
    .positive("Produk wajib dipilih"),

  quantity: z.coerce
    .number({
      message: "Jumlah wajib diisi",
    })
    .int("Jumlah harus berupa bilangan bulat")
    .positive("Jumlah wajib lebih dari 0"),

  price: z.coerce
    .number({
      message: "Harga beli wajib diisi",
    })
    .positive("Harga beli wajib lebih dari 0"),
});
