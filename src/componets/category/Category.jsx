import { useEffect, useState } from "react";

import Navbar from "../navbar";
import Sidebar from "../sidebar";
import Button from "../button";
import Input from "../input";
import Modal from "../modal";
import Table from "../table";
import Form from "../form";
import Footer from "../footer";

import useForm from "../../hooks/useForm";
import useModal from "../../hooks/useModal";
import useSearch from "../../hooks/useSearch";
import usePagination from "../../hooks/usePagination";

import columnCategory from "../ColumnsCategory";
import categorySchema from "../../utils/categorySchema";
import categorysData from "../../data/categorysData";

import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../stores/categoryServices.js";

const initialCategoryForm = {
  name: "",
  description: "",
  total_products: "",
  status: "active",
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
  ]);

  const { currentPage, totalPages, paginatedData, nextPage, prevPage } =
    usePagination(filteredData, 10);

  const normalizeCategories = data => {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.data)) return data.data;
    if (Array.isArray(data?.rows)) return data.rows;
    return [];
  };

  useEffect(() => {
    let isActive = true;

    const loadCategories = async () => {
      try {
        const data = await getCategories();

        console.log("DATA CATEGORY DARI API:", data);

        const categoryList = normalizeCategories(data);

        if (isActive) {
          setCategories(categoryList);
        }
      } catch (error) {
        console.log("ERROR GET CATEGORIES:", error);

        if (isActive) {
          alert(error.message || "Gagal mengambil data kategori");
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    loadCategories();

    return () => {
      isActive = false;
    };
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);

      const data = await getCategories();

      const categoryList = normalizeCategories(data);

      setCategories(categoryList);
    } catch (error) {
      console.log("ERROR GET CATEGORIES:", error);
      alert(error.message || "Gagal mengambil data kategori");
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

  const openEditModal = category => {
    setEditId(category.id);

    setForm({
      name: category.name || "",
      description: category.description || "",
      total_products: category.total_products || "",
      status: category.status || "active",
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

    const result = categorySchema.safeParse(form);

    if (!result.success) {
      const fieldErrors = {};

      result.error.issues.forEach(issue => {
        fieldErrors[issue.path[0]] = issue.message;
      });

      setErrors(fieldErrors);
      return;
    }

    const categoryPayload = {
      name: form.name,
      description: form.description,
      total_products: Number(form.total_products),
      status: form.status,
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
          fields={categorysData}
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
