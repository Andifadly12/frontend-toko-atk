import { useState } from "react";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import Button from "../Button";
import productFormData from "../../data/productFromData";
import Text from "../Text";
import Badge from "../Badge";
import Modal from "../Modal";
import Table from "../Table";
import productsData from "../../data/productsData";
import Form from "../form";
const Products = () => {
  const [products, setProducts] = useState([
    productsData
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [errors, setErrors] = useState({});
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

  const columns = [
    {
      key: "name",
      label: "Produk",
      render: (item) => <Text weight="semibold">{item.name}</Text>,
    },
    {
      key: "category",
      label: "Kategori",
      render: (item) => (
        <Text size="sm" color="muted">
          {item.category}
        </Text>
      ),
    },
    {
      key: "supplier",
      label: "Supplier",
      render: (item) => (
        <Text size="sm" color="muted">
          {item.supplier}
        </Text>
      ),
    },
    {
      key: "purchase_price",
      label: "Harga Beli",
      render: (item) => (
        <Text size="sm">{formatRupiah(item.purchase_price)}</Text>
      ),
    },
    {
      key: "selling_price",
      label: "Harga Jual",
      render: (item) => (
        <Text size="sm" weight="semibold" color="primary">
          {formatRupiah(item.selling_price)}
        </Text>
      ),
    },
    {
      key: "stock",
      label: "Stok",
      render: (item) => (
        <Badge
          variant={
            item.stock <= 0
              ? "danger"
              : item.stock <= 10
              ? "warning"
              : "success"
          }
        >
          {item.stock}
        </Badge>
      ),
    },
  ];

  const resetForm = () => {
    setForm({
      name: "",
      category: "",
      supplier: "",
      purchase_price: "",
      selling_price: "",
      stock: "",
    });
    setErrors();
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
    setErrors()
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
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.category || !form.supplier) {
      alert("Nama produk, kategori, dan supplier wajib diisi");
      return;
    }

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
    const confirmDelete = window.confirm("Yakin ingin menghapus produk ini?");

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
            <Button variant="success" onClick={openAddModal}>
              Tambah Produk
            </Button>
          </div>

          <Table
            columns={columns}
            data={products}
            emptyMessage="Belum ada data produk"
            actions={(item) => (
              <>
                <Button
                  size="sm"
                  variant="warning"
                  onClick={() => openEditModal(item)}
                >
                  Edit
                </Button>

                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => handleDelete(item.id)}
                >
                  Hapus
                </Button>
              </>
            )}
          />
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
         <Form
          fields={productFormData}
          form={form}
          errors={errors}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      </Modal>
    </div>
  );
};

export default Products;