import { useEffect, useState } from "react";

import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import Button from "../Button";
import productFormData from "../../data/productFromData";
import Modal from "../Modal";
import Table from "../Table";
import Form from "../form";
import columnsProducts from "../columnsProducts/columnsProducts";
import Footer from "../footer";

import useForm from "../../hooks/useForm";
import useModal from "../../hooks/useModal";
import usePagination from "../../hooks/usePagination";

import productSchema from "../../utils/productSchema";

import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../stores/productServices.js";

const initialProductForm = {
  name: "",
  category: "",
  supplier: "",
  purchase_price: "",
  selling_price: "",
  stock: "",
};

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null);

  const { isModalOpen, openModal, closeModal } = useModal();

  const { form, setForm, errors, setErrors, handleChange, resetForm } =
    useForm(initialProductForm);

  const { currentPage, totalPages, paginatedData, nextPage, prevPage } =
    usePagination(products, 5);

  const normalizeProducts = data => {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.data)) return data.data;
    if (Array.isArray(data?.rows)) return data.rows;
    return [];
  };

  const fetchProducts = async () => {
    try {
      const data = await getProducts();

      console.log("DATA DARI API:", data);

      const productList = normalizeProducts(data);

      setProducts(productList);
    } catch (error) {
      console.log("ERROR GET PRODUCTS:", error);
      alert(error.message || "Gagal mengambil data produk");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isActive = true;

    const loadProducts = async () => {
      try {
        const data = await getProducts();

        console.log("DATA DARI API:", data);

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
      category: product.category || "",
      supplier: product.supplier || "",
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

  const handleSubmit = async e => {
    e.preventDefault();

    const result = productSchema.safeParse(form);

    if (!result.success) {
      const fieldErrors = {};

      result.error.issues.forEach(issue => {
        fieldErrors[issue.path[0]] = issue.message;
      });

      setErrors(fieldErrors);
      return;
    }

    const productPayload = {
      name: form.name,
      category: form.category,
      supplier: form.supplier,
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
