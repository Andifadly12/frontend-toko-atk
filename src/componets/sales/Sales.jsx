import { useEffect, useState } from "react";

import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import Button from "../Button";
import Badge from "../badge";
import Text from "../Text";
import Input from "../input";
import Footer from "../footer";

import formatRupiah from "../../utils/formatRupiah";

import useCart from "../../hooks/useCart";
import usePagination from "../../hooks/usePagination";

import { getProducts } from "../../stores/productServices";
import { getCategories } from "../../stores/categoryServices";
import { getCustomers } from "../../stores/costumersServices";
import { createSale } from "../../stores/salesServices";

const Sales = () => {
  const [products, setProducts] = useState([]);
  const [, setCategories] = useState([]);
  const [customers, setCustomers] = useState([]);

  const [customerId, setCustomerId] = useState("");
  const [paidAmount, setPaidAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");

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

  const normalizeData = data => {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.data)) return data.data;
    if (Array.isArray(data?.rows)) return data.rows;
    return [];
  };

  const syncProductsWithCategories = (productList, categoryList) => {
    return productList.map(product => {
      const category = categoryList.find(
        item => Number(item.id) === Number(product.category_id),
      );

      return {
        ...product,
        category_name:
          product.category_name || product.category || category?.name || "-",
      };
    });
  };

  const changeAmount = Number(paidAmount || 0) - Number(totalPrice || 0);

  const fetchProducts = async () => {
    try {
      const [productResponse, categoryResponse] = await Promise.all([
        getProducts(),
        getCategories(),
      ]);

      const productList = normalizeData(productResponse);
      const categoryList = normalizeData(categoryResponse);

      const syncedProducts = syncProductsWithCategories(
        productList,
        categoryList,
      );

      setProducts(syncedProducts);
      setCategories(categoryList);
    } catch (error) {
      console.log("ERROR GET PRODUCTS:", error);
      alert(error.message || "Gagal mengambil data produk");
    }
  };

  const fetchCustomers = async () => {
    try {
      const customerResponse = await getCustomers();
      const customerList = normalizeData(customerResponse);

      setCustomers(customerList);
    } catch (error) {
      console.log("ERROR GET CUSTOMERS:", error);
      alert(error.message || "Gagal mengambil data customer");
    }
  };

  useEffect(() => {
    let isActive = true;

    const loadData = async () => {
      try {
        const [productResponse, categoryResponse, customerResponse] =
          await Promise.all([getProducts(), getCategories(), getCustomers()]);

        const productList = normalizeData(productResponse);
        const categoryList = normalizeData(categoryResponse);
        const customerList = normalizeData(customerResponse);

        const syncedProducts = syncProductsWithCategories(
          productList,
          categoryList,
        );

        if (isActive) {
          setProducts(syncedProducts);
          setCategories(categoryList);
          setCustomers(customerList);
        }
      } catch (error) {
        console.log("ERROR LOAD SALES DATA:", error);

        if (isActive) {
          alert(error.message || "Gagal mengambil data sales");
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      isActive = false;
    };
  }, []);

  const handleAddToCart = product => {
    const existingItem = cartItems.find(item => item.id === product.id);

    if (existingItem && existingItem.qty >= Number(product.stock || 0)) {
      alert("Jumlah barang sudah mencapai stok tersedia");
      return;
    }

    if (Number(product.stock || 0) <= 0) {
      alert("Stok produk habis");
      return;
    }

    addToCart(product);
  };

  const handleIncreaseQty = id => {
    const product = products.find(item => item.id === id);
    const cartItem = cartItems.find(item => item.id === id);

    if (!product || !cartItem) return;

    if (cartItem.qty >= Number(product.stock || 0)) {
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

    if (!paidAmount || Number(paidAmount) <= 0) {
      alert("Uang dibayar wajib diisi");
      return;
    }

    if (Number(paidAmount) < Number(totalPrice)) {
      alert("Uang dibayar kurang dari total belanja");
      return;
    }

    const salePayload = {
      customer_id: customerId ? Number(customerId) : null,
      paid_amount: Number(paidAmount),
      payment_method: paymentMethod,
      items: cartItems.map(item => ({
        product_id: item.id,
        quantity: item.qty,
      })),
    };

    try {
      setLoading(true);

      await createSale(salePayload);

      alert("Transaksi berhasil disimpan");

      clearCart();
      setCustomerId("");
      setPaidAmount("");
      setPaymentMethod("cash");

      await fetchProducts();
      await fetchCustomers();
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
                                  SKU: {product.sku || "-"}
                                </Text>
                              </td>

                              <td className="px-4 py-3">
                                <Text size="sm" color="muted">
                                  {product.category_name || "-"}
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
                                    Number(product.stock || 0) <= 0
                                      ? "danger"
                                      : Number(product.stock || 0) <= 10
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
                                  disabled={Number(product.stock || 0) <= 0}
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
                  <div className="mb-4">
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Customer
                    </label>

                    <select
                      value={customerId}
                      onChange={e => setCustomerId(e.target.value)}
                      className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    >
                      <option value="">Umum / Tanpa Customer</option>

                      {customers.map(customer => (
                        <option key={customer.id} value={customer.id}>
                          {customer.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Metode Pembayaran
                    </label>

                    <select
                      value={paymentMethod}
                      onChange={e => setPaymentMethod(e.target.value)}
                      className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    >
                      <option value="cash">Cash</option>
                      <option value="transfer">Transfer</option>
                      <option value="qris">QRIS</option>
                      <option value="debit">Debit</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <Input
                      label="Uang Dibayar"
                      name="paid_amount"
                      type="number"
                      value={paidAmount}
                      onChange={e => setPaidAmount(e.target.value)}
                      placeholder="Contoh: 50000"
                    />
                  </div>

                  <div className="mb-2 flex items-center justify-between">
                    <Text weight="bold">Total</Text>

                    <Text weight="bold" color="primary">
                      {formatRupiah(totalPrice)}
                    </Text>
                  </div>

                  <div className="mb-4 flex items-center justify-between">
                    <Text weight="bold">Kembalian</Text>

                    <Text
                      weight="bold"
                      color={changeAmount < 0 ? "danger" : "success"}
                    >
                      {formatRupiah(changeAmount)}
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
