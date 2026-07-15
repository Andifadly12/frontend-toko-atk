import { useEffect, useState } from "react";

import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import Button from "../Button";
import Badge from "../badge";
import Text from "../Text";
import Footer from "../footer";

import formatRupiah from "../../utils/formatRupiah";

import useCart from "../../hooks/useCart";
import usePagination from "../../hooks/usePagination";

import { getProducts } from "../../stores/productServices";
import { createSale } from "../../stores/salesServices";

const Sales = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const {
    cartItems,
    addToCart,
    increaseQty,
    decreaseQty,
    removeFromCart,
    clearCart,
    totalItems,
    totalPrice,
  } = useCart();

  const { currentPage, totalPages, paginatedData, nextPage, prevPage } =
    usePagination(products, 5);

  const normalizeProducts = data => {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.data)) return data.data;
    if (Array.isArray(data?.rows)) return data.rows;
    return [];
  };

  useEffect(() => {
    let isActive = true;

    const loadProducts = async () => {
      try {
        const data = await getProducts();

        console.log("DATA PRODUK DARI API:", data);

        const productList = normalizeProducts(data);

        if (isActive) {
          setProducts(productList);
        }
      } catch (error) {
        console.log("ERROR GET PRODUCTS:", error);

        if (isActive) {
          alert(error.message || "Gagal mengambil data produk");
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    loadProducts();

    return () => {
      isActive = false;
    };
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const data = await getProducts();

      const productList = normalizeProducts(data);

      setProducts(productList);
    } catch (error) {
      console.log("ERROR GET PRODUCTS:", error);
      alert(error.message || "Gagal mengambil data produk");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = product => {
    const existingItem = cartItems.find(item => item.id === product.id);

    if (existingItem && existingItem.qty >= product.stock) {
      alert("Jumlah barang sudah mencapai stok tersedia");
      return;
    }

    addToCart(product);
  };

  const handleIncreaseQty = id => {
    const product = products.find(item => item.id === id);
    const cartItem = cartItems.find(item => item.id === id);

    if (!product || !cartItem) return;

    if (cartItem.qty >= product.stock) {
      alert("Jumlah barang sudah mencapai stok tersedia");
      return;
    }

    increaseQty(id);
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      alert("Keranjang masih kosong");
      return;
    }

    const salePayload = {
      customer_id: null,
      paid_amount: totalPrice,
      payment_method: "cash",
      items: cartItems.map(item => ({
        product_id: item.id,
        quantity: item.qty,
      })),
    };

    try {
      setLoading(true);

      console.log("DATA CHECKOUT:", salePayload);

      await createSale(salePayload);

      alert("Transaksi berhasil disimpan");

      clearCart();

      await fetchProducts();
    } catch (error) {
      console.log("ERROR CHECKOUT:", error);
      alert(error.message || "Gagal menyimpan transaksi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <div className="flex min-h-screen flex-1 flex-col">
        <Navbar
          userName="Admin Toko"
          onLogout={() => alert("Logout nanti disambungkan")}
        />

        <main className="flex-1 p-6">
          <div className="mb-6">
            <Text as="h1" size="2xl" weight="bold">
              Sales / Penjualan
            </Text>

            <Text size="sm" color="muted" className="mt-1">
              Pilih produk, masukkan ke keranjang, lalu checkout.
            </Text>
          </div>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            <div className="xl:col-span-2">
              <div className="rounded-2xl bg-white p-5 shadow-sm">
                <div className="mb-5 flex items-center justify-between">
                  <Text as="h2" size="lg" weight="bold">
                    Daftar Produk
                  </Text>

                  <Badge variant="primary">Produk</Badge>
                </div>

                {loading ? (
                  <div className="rounded-xl border border-slate-200 p-5 text-center text-sm text-slate-500">
                    Loading data produk...
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-left">
                      <thead>
                        <tr className="border-b border-slate-200">
                          <th className="px-4 py-3 text-sm font-semibold text-slate-600">
                            Produk
                          </th>
                          <th className="px-4 py-3 text-sm font-semibold text-slate-600">
                            Kategori
                          </th>
                          <th className="px-4 py-3 text-sm font-semibold text-slate-600">
                            Harga
                          </th>
                          <th className="px-4 py-3 text-sm font-semibold text-slate-600">
                            Stok
                          </th>
                          <th className="px-4 py-3 text-sm font-semibold text-slate-600">
                            Aksi
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {paginatedData.length > 0 ? (
                          paginatedData.map(product => (
                            <tr
                              key={product.id}
                              className="border-b border-slate-100 hover:bg-slate-50"
                            >
                              <td className="px-4 py-3">
                                <Text weight="semibold">{product.name}</Text>
                                <Text size="sm" color="muted">
                                  Supplier: {product.supplier || "-"}
                                </Text>
                              </td>

                              <td className="px-4 py-3">
                                <Text size="sm" color="muted">
                                  {product.category || "-"}
                                </Text>
                              </td>

                              <td className="px-4 py-3">
                                <Text
                                  size="sm"
                                  weight="semibold"
                                  color="primary"
                                >
                                  {formatRupiah(product.selling_price)}
                                </Text>
                              </td>

                              <td className="px-4 py-3">
                                <Badge
                                  variant={
                                    product.stock <= 0
                                      ? "danger"
                                      : product.stock <= 10
                                        ? "warning"
                                        : "success"
                                  }
                                >
                                  {product.stock}
                                </Badge>
                              </td>

                              <td className="px-4 py-3">
                                <Button
                                  size="sm"
                                  variant="success"
                                  onClick={() => handleAddToCart(product)}
                                  disabled={product.stock <= 0}
                                >
                                  Tambah
                                </Button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td
                              colSpan="5"
                              className="px-4 py-6 text-center text-sm text-slate-500"
                            >
                              Belum ada data produk
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>

            <div>
              <div className="rounded-2xl bg-white p-5 shadow-sm">
                <div className="mb-5 flex items-center justify-between">
                  <Text as="h2" size="lg" weight="bold">
                    Keranjang
                  </Text>

                  <Badge variant="warning">{totalItems} Item</Badge>
                </div>

                <div className="space-y-4">
                  {cartItems.length > 0 ? (
                    cartItems.map(item => (
                      <div
                        key={item.id}
                        className="rounded-xl border border-slate-200 p-4"
                      >
                        <div className="mb-3 flex items-start justify-between gap-3">
                          <div>
                            <Text weight="semibold">{item.name}</Text>
                            <Text size="sm" color="muted">
                              {formatRupiah(item.selling_price)}
                            </Text>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            className="text-sm font-semibold text-red-600 hover:text-red-700"
                          >
                            Hapus
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => decreaseQty(item.id)}
                            >
                              -
                            </Button>

                            <span className="min-w-8 text-center text-sm font-semibold">
                              {item.qty}
                            </span>

                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleIncreaseQty(item.id)}
                            >
                              +
                            </Button>
                          </div>

                          <Text weight="bold" color="primary">
                            {formatRupiah(item.subtotal)}
                          </Text>
                        </div>
                      </div>
                    ))
                  ) : (
                    <Text size="sm" color="muted">
                      Keranjang masih kosong.
                    </Text>
                  )}
                </div>

                <div className="mt-6 border-t border-slate-200 pt-4">
                  <div className="mb-4 flex items-center justify-between">
                    <Text weight="bold">Total</Text>

                    <Text weight="bold" color="primary">
                      {formatRupiah(totalPrice)}
                    </Text>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      full
                      onClick={clearCart}
                      disabled={cartItems.length === 0}
                    >
                      Reset
                    </Button>

                    <Button
                      variant="primary"
                      full
                      onClick={handleCheckout}
                      disabled={cartItems.length === 0 || loading}
                    >
                      {loading ? "Memproses..." : "Checkout"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer
          currentPage={currentPage}
          totalPages={totalPages}
          prevPage={prevPage}
          nextPage={nextPage}
        />
      </div>
    </div>
  );
};

export default Sales;
