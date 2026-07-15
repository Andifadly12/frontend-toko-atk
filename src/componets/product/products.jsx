import { useEffect, useState } from "react";

import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import Button from "../Button";
import Modal from "../Modal";
import Table from "../Table";
import Form from "../form";
import columnsProducts from "../columnsProducts/columnsProducts";
import Footer from "../footer";

import useForm from "../../hooks/useForm";
import useModal from "../../hooks/useModal";
import usePagination from "../../hooks/usePagination";

import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../stores/productServices.js";

import { getCategories } from "../../stores/categoryServices.js";

const initialProductForm = {
  name: "",
  category_id: "",
  sku: "",
  unit: "pcs",
  purchase_price: "",
  selling_price: "",
  stock: "",
};

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null);

  const { isModalOpen, openModal, closeModal } = useModal();

  const { form, setForm, errors, setErrors, handleChange, resetForm } =
    useForm(initialProductForm);

  const { currentPage, totalPages, paginatedData, nextPage, prevPage } =
    usePagination(products, 10);

  const normalizeData = data => {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.data)) return data.data;
    if (Array.isArray(data?.rows)) return data.rows;
    return [];
  };

  const enrichProducts = (productList, categoryList) => {
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

  const productFormFields = [
    {
      name: "name",
      label: "Nama Produk",
      type: "text",
      placeholder: "Contoh: Pulpen Pilot",
      required: true,
    },
    {
      name: "category_id",
      label: "Kategori",
      type: "select",
      placeholder: "Pilih kategori",
      required: true,
      options: categories.map(category => ({
        label: category.name,
        value: category.id,
      })),
    },
    {
      name: "sku",
      label: "SKU",
      type: "text",
      placeholder: "Contoh: PLP-001",
      required: true,
    },
    {
      name: "unit",
      label: "Satuan",
      type: "select",
      placeholder: "Pilih satuan",
      required: true,
      options: [
        { label: "pcs", value: "pcs" },
        { label: "box", value: "box" },
        { label: "pack", value: "pack" },
        { label: "lusin", value: "lusin" },
        { label: "rim", value: "rim" },
      ],
    },
    {
      name: "purchase_price",
      label: "Harga Beli",
      type: "number",
      placeholder: "Contoh: 2500",
      required: true,
    },
    {
      name: "selling_price",
      label: "Harga Jual",
      type: "number",
      placeholder: "Contoh: 3000",
      required: true,
    },
    {
      name: "stock",
      label: "Stok",
      type: "number",
      placeholder: "Contoh: 100",
      required: true,
    },
  ];

  useEffect(() => {
    let isActive = true;

    const loadData = async () => {
      try {
        const [productResponse, categoryResponse] = await Promise.all([
          getProducts(),
          getCategories(),
        ]);

        const productList = normalizeData(productResponse);
        const categoryList = normalizeData(categoryResponse);

        const productWithCategory = enrichProducts(productList, categoryList);

        if (isActive) {
          setProducts(productWithCategory);
          setCategories(categoryList);
        }
      } catch (error) {
        console.log("ERROR LOAD PRODUCTS:", error);

        if (isActive) {
          alert(error.message || "Gagal mengambil data produk");
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

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const [productResponse, categoryResponse] = await Promise.all([
        getProducts(),
        getCategories(),
      ]);

      const productList = normalizeData(productResponse);
      const categoryList = normalizeData(categoryResponse);

      const productWithCategory = enrichProducts(productList, categoryList);

      setProducts(productWithCategory);
      setCategories(categoryList);
    } catch (error) {
      console.log("ERROR GET PRODUCTS:", error);
      alert(error.message || "Gagal mengambil data produk");
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    resetForm();
    setEditId(null);
    setErrors({});
    openModal();
  };

  const openEditModal = product => {
    setEditId(product.id);

    setForm({
      name: product.name || "",
      category_id: product.category_id || "",
      sku: product.sku || "",
      unit: product.unit || "pcs",
      purchase_price: product.purchase_price || "",
      selling_price: product.selling_price || "",
      stock: product.stock || "",
    });

    setErrors({});
    openModal();
  };

  const handleCloseModal = () => {
    closeModal();
    resetForm();
    setEditId(null);
    setErrors({});
  };

  const validateForm = () => {
    const fieldErrors = {};

    if (!form.name) {
      fieldErrors.name = "Nama produk wajib diisi";
    }

    if (!form.category_id) {
      fieldErrors.category_id = "Kategori wajib dipilih";
    }

    if (!form.sku) {
      fieldErrors.sku = "SKU wajib diisi";
    }

    if (!form.unit) {
      fieldErrors.unit = "Satuan wajib dipilih";
    }

    if (!form.purchase_price || Number(form.purchase_price) <= 0) {
      fieldErrors.purchase_price = "Harga beli wajib lebih dari 0";
    }

    if (!form.selling_price || Number(form.selling_price) <= 0) {
      fieldErrors.selling_price = "Harga jual wajib lebih dari 0";
    }

    if (Number(form.selling_price) < Number(form.purchase_price)) {
      fieldErrors.selling_price =
        "Harga jual tidak boleh lebih kecil dari harga beli";
    }

    if (form.stock === "" || Number(form.stock) < 0) {
      fieldErrors.stock = "Stok tidak boleh kosong atau minus";
    }

    setErrors(fieldErrors);

    return Object.keys(fieldErrors).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const isValid = validateForm();

    if (!isValid) return;

    const productPayload = {
      name: form.name,
      category_id: Number(form.category_id),
      sku: form.sku,
      unit: form.unit,
      purchase_price: Number(form.purchase_price),
      selling_price: Number(form.selling_price),
      stock: Number(form.stock),
    };

    try {
      setLoading(true);

      if (editId) {
        await updateProduct(editId, productPayload);
      } else {
        await createProduct(productPayload);
      }

      await fetchProducts();
      handleCloseModal();
    } catch (error) {
      console.log("ERROR SAVE PRODUCT:", error);
      alert(error.message || "Gagal menyimpan produk");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async id => {
    const confirmDelete = window.confirm("Yakin ingin menghapus produk ini?");

    if (!confirmDelete) return;

    try {
      setLoading(true);

      await deleteProduct(id);

      await fetchProducts();
    } catch (error) {
      console.log("ERROR DELETE PRODUCT:", error);
      alert(error.message || "Gagal menghapus produk");
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
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">
                Data Product
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Tambah, edit, dan hapus data product.
              </p>
            </div>

            <Button variant="success" onClick={openAddModal}>
              Tambah Produk
            </Button>
          </div>

          {loading ? (
            <div className="rounded-2xl bg-white p-6 text-center text-sm text-slate-500 shadow-sm">
              Loading data produk...
            </div>
          ) : (
            <Table
              columns={columnsProducts}
              data={paginatedData}
              emptyMessage="Belum ada data produk"
              actions={item => (
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
          )}
        </main>

        <Footer
          currentPage={currentPage}
          totalPages={totalPages}
          prevPage={prevPage}
          nextPage={nextPage}
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editId ? "Edit Produk" : "Tambah Produk"}
        size="lg"
        footer={
          <>
            <Button variant="outline" onClick={handleCloseModal}>
              Batal
            </Button>

            <Button variant="primary" onClick={handleSubmit}>
              {loading ? "Menyimpan..." : editId ? "Update" : "Simpan"}
            </Button>
          </>
        }
      >
        <Form
          fields={productFormFields}
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
