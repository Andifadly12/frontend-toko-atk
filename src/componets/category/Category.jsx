import { useEffect, useState } from "react";

import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import Button from "../Button";
import Input from "../input";
import Modal from "../Modal";
import Table from "../Table";
import Form from "../form";
import Footer from "../footer";

import useForm from "../../hooks/useForm";
import useModal from "../../hooks/useModal";
import useSearch from "../../hooks/useSearch";
import usePagination from "../../hooks/usePagination";
import useLogout from "../../hooks/useLogout";
import useAuthStore from "../../hooks/authStore";
import columnCategory from "../ColumnsCategory";
import { categoryFormFields } from "../../utils/categoryFormFields.js";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../stores/categoryServices.js";

const initialCategoryForm = {
  name: "",
  description: "",
  status: "active",
  total_products: "",
};

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null);

  const { isModalOpen, openModal, closeModal } = useModal();

  const { form, setForm, errors, setErrors, handleChange, resetForm } =
    useForm(initialCategoryForm);

  const { search, setSearch, filteredData } = useSearch(categories, [
    "name",
    "description",
    "status",
    "total_products",
  ]);

  const { currentPage, totalPages, paginatedData, nextPage, prevPage } =
    usePagination(filteredData, 10);

  const normalizeData = data => {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.data)) return data.data;
    if (Array.isArray(data?.rows)) return data.rows;
    return [];
  };

  const syncCategoryData = categoryList => {
    return categoryList.map(category => {
      return {
        ...category,
        description: category.description || "",
        status: category.status || "active",
        total_products: Number(category.total_products || 0),
      };
    });
  };

  const fetchCategories = async () => {
    try {
      setLoading(true);

      const categoryResponse = await getCategories();
      const categoryList = normalizeData(categoryResponse);
      const syncedCategories = syncCategoryData(categoryList);

      setCategories(syncedCategories);
    } catch (error) {
      console.log("ERROR GET CATEGORIES:", error);
      alert(error.message || "Gagal mengambil data kategori");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isActive = true;

    const loadData = async () => {
      try {
        const categoryResponse = await getCategories();
        const categoryList = normalizeData(categoryResponse);
        const syncedCategories = syncCategoryData(categoryList);

        if (isActive) {
          setCategories(syncedCategories);
        }
      } catch (error) {
        console.log("ERROR LOAD CATEGORIES:", error);

        if (isActive) {
          alert(error.message || "Gagal mengambil data kategori");
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

  const openAddModal = () => {
    resetForm({
      name: "",
      description: "",
      status: "active",
      total_products: "",
    });

    setEditId(null);
    setErrors({});
    openModal();
  };

  const openEditModal = category => {
    setEditId(category.id);

    setForm({
      name: category.name || "",
      description: category.description || "",
      status: category.status || "active",
      total_products: category.total_products || 0,
    });

    setErrors({});
    openModal();
  };

  const handleCloseModal = () => {
    closeModal();

    resetForm({
      name: "",
      description: "",
      status: "active",
      total_products: "",
    });

    setEditId(null);
    setErrors({});
  };

  const validateForm = () => {
    const fieldErrors = {};

    if (!form.name.trim()) {
      fieldErrors.name = "Nama kategori wajib diisi";
    }

    if (!form.status) {
      fieldErrors.status = "Status wajib dipilih";
    }

    if (form.total_products === "" || Number(form.total_products) < 0) {
      fieldErrors.total_products = "Jumlah produk tidak boleh kosong/minus";
    }

    setErrors(fieldErrors);

    return Object.keys(fieldErrors).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const isValid = validateForm();

    if (!isValid) return;

    const categoryPayload = {
      name: form.name.trim(),
      description: form.description.trim(),
      status: form.status,
      total_products: Number(form.total_products),
    };

    try {
      setLoading(true);

      if (editId) {
        await updateCategory(editId, categoryPayload);
      } else {
        await createCategory(categoryPayload);
      }

      await fetchCategories();
      handleCloseModal();
    } catch (error) {
      console.log("ERROR SAVE CATEGORY:", error);
      alert(error.message || "Gagal menyimpan kategori");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async id => {
    const confirmDelete = window.confirm("Yakin ingin menghapus kategori ini?");

    if (!confirmDelete) return;

    try {
      setLoading(true);

      await deleteCategory(id);

      await fetchCategories();
    } catch (error) {
      console.log("ERROR DELETE CATEGORY:", error);
      alert(error.message || "Gagal menghapus kategori");
    } finally {
      setLoading(false);
    }
  };
  const handleLogout = useLogout();
  const user = useAuthStore(state => state.user);

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <div className="flex min-h-screen flex-1 flex-col">
        <Navbar
          title="Dashboard"
          subtitle="Ringkasan data Toko ATK"
          userName={user?.name || "Admin Toko"}
          onLogout={handleLogout}
        />

        <main className="flex-1 p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">
                Data Category
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Tambah, edit, dan hapus data category.
              </p>
            </div>

            <Button variant="success" onClick={openAddModal}>
              Tambah Kategori
            </Button>
          </div>

          <div className="mb-5 rounded-2xl bg-white p-4 shadow-sm">
            <Input
              label="Cari Kategori"
              name="search"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Cari nama kategori..."
            />
          </div>

          {loading ? (
            <div className="rounded-2xl bg-white p-6 text-center text-sm text-slate-500 shadow-sm">
              Loading data kategori...
            </div>
          ) : (
            <Table
              columns={columnCategory}
              data={paginatedData}
              emptyMessage="Belum ada data kategori"
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
        title={editId ? "Edit Kategori" : "Tambah Kategori"}
        size="md"
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
          fields={categoryFormFields}
          form={form}
          errors={errors}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      </Modal>
    </div>
  );
};

export default Category;
