import { useState } from "react";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import Button from "../Button";
import Input from "../Input";
import Text from "../Text";
import Badge from "../Badge";
import Modal from "../Modal";

const Products = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Pulpen Pilot",
      category: "Alat Tulis",
      supplier: "PT Sumber ATK",
      purchase_price: 2500,
      selling_price: 3000,
      stock: 100,
    },
    {
      id: 2,
      name: "Buku Tulis Sidu",
      category: "Buku",
      supplier: "CV Buku Jaya",
      purchase_price: 4000,
      selling_price: 5000,
      stock: 50,
    },
    {
      id: 3,
      name: "Spidol Hitam",
      category: "Alat Tulis",
      supplier: "PT Sumber ATK",
      purchase_price: 6000,
      selling_price: 8000,
      stock: 5,
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    category: "",
    supplier: "",
    purchase_price: "",
    selling_price: "",
    stock: "",
  });

  const formatRupiah = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(Number(value || 0));
  };

  const resetForm = () => {
    setForm({
      name: "",
      category: "",
      supplier: "",
      purchase_price: "",
      selling_price: "",
      stock: "",
    });
    setEditId(null);
  };

  const openAddModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    setEditId(product.id);
    setForm({
      name: product.name,
      category: product.category,
      supplier: product.supplier,
      purchase_price: product.purchase_price,
      selling_price: product.selling_price,
      stock: product.stock,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId) {
      const updatedProducts = products.map((product) =>
        product.id === editId
          ? {
              ...product,
              name: form.name,
              category: form.category,
              supplier: form.supplier,
              purchase_price: Number(form.purchase_price),
              selling_price: Number(form.selling_price),
              stock: Number(form.stock),
            }
          : product
      );

      setProducts(updatedProducts);
    } else {
      const newProduct = {
        id: Date.now(),
        name: form.name,
        category: form.category,
        supplier: form.supplier,
        purchase_price: Number(form.purchase_price),
        selling_price: Number(form.selling_price),
        stock: Number(form.stock),
      };

      setProducts([newProduct, ...products]);
    }

    closeModal();
  };

  const handleDelete = (id) => {
    const confirmDelete = confirm("Yakin ingin menghapus produk ini?");

    if (confirmDelete) {
      const filteredProducts = products.filter((product) => product.id !== id);
      setProducts(filteredProducts);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Navbar
          title="Products"
          subtitle="Kelola data produk Toko ATK"
          userName="Admin Toko"
          onLogout={() => alert("Logout nanti disambungkan")}
        />

        <main className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <Text as="h1" size="2xl" weight="bold">
                Data Produk
              </Text>

              <Text size="sm" color="muted" className="mt-1">
                Tambah, edit, dan hapus data produk.
              </Text>
            </div>

            <Button variant="success" onClick={openAddModal}>
              Tambah Produk
            </Button>
          </div>

          <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
            <table className="w-full border-collapse">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-5 py-4 text-left text-sm font-semibold text-slate-600">
                    Produk
                  </th>
                  <th className="px-5 py-4 text-left text-sm font-semibold text-slate-600">
                    Kategori
                  </th>
                  <th className="px-5 py-4 text-left text-sm font-semibold text-slate-600">
                    Supplier
                  </th>
                  <th className="px-5 py-4 text-left text-sm font-semibold text-slate-600">
                    Harga Beli
                  </th>
                  <th className="px-5 py-4 text-left text-sm font-semibold text-slate-600">
                    Harga Jual
                  </th>
                  <th className="px-5 py-4 text-left text-sm font-semibold text-slate-600">
                    Stok
                  </th>
                  <th className="px-5 py-4 text-right text-sm font-semibold text-slate-600">
                    Aksi
                  </th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className="border-t border-slate-100 hover:bg-slate-50"
                  >
                    <td className="px-5 py-4">
                      <Text weight="semibold">{product.name}</Text>
                    </td>

                    <td className="px-5 py-4">
                      <Text size="sm" color="muted">
                        {product.category}
                      </Text>
                    </td>

                    <td className="px-5 py-4">
                      <Text size="sm" color="muted">
                        {product.supplier}
                      </Text>
                    </td>

                    <td className="px-5 py-4">
                      <Text size="sm">
                        {formatRupiah(product.purchase_price)}
                      </Text>
                    </td>

                    <td className="px-5 py-4">
                      <Text size="sm" weight="semibold" color="primary">
                        {formatRupiah(product.selling_price)}
                      </Text>
                    </td>

                    <td className="px-5 py-4">
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

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="warning"
                          onClick={() => openEditModal(product)}
                        >
                          Edit
                        </Button>

                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => handleDelete(product.id)}
                        >
                          Hapus
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}

                {products.length === 0 && (
                  <tr>
                    <td colSpan="7" className="px-5 py-10 text-center">
                      <Text color="muted">Belum ada data produk.</Text>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editId ? "Edit Produk" : "Tambah Produk"}
        size="lg"
        footer={
          <>
            <Button variant="outline" onClick={closeModal}>
              Batal
            </Button>

            <Button variant="primary" onClick={handleSubmit}>
              {editId ? "Update" : "Simpan"}
            </Button>
          </>
        }
      >
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Input
            label="Nama Produk"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Contoh: Pulpen Pilot"
            required
          />

          <Input
            label="Kategori"
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Contoh: Alat Tulis"
            required
          />

          <Input
            label="Supplier"
            name="supplier"
            value={form.supplier}
            onChange={handleChange}
            placeholder="Contoh: PT Sumber ATK"
            required
          />

          <Input
            label="Harga Beli"
            type="number"
            name="purchase_price"
            value={form.purchase_price}
            onChange={handleChange}
            placeholder="Contoh: 2500"
            required
          />

          <Input
            label="Harga Jual"
            type="number"
            name="selling_price"
            value={form.selling_price}
            onChange={handleChange}
            placeholder="Contoh: 3000"
            required
          />

          <Input
            label="Stok"
            type="number"
            name="stock"
            value={form.stock}
            onChange={handleChange}
            placeholder="Contoh: 100"
            required
          />

          <button type="submit" className="hidden">
            Submit
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default Products;