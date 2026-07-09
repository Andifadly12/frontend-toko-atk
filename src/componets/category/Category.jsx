import { useState } from "react";

import Navbar from "../navbar";
import Sidebar from "../sidebar";
import Button from "../button";
import Input from "../input";
import Modal from "../modal";
import Table from "../table";
import Form from "../form";

import useForm from "../../hooks/useForm";
import useModal from "../../hooks/useModal";
import useSearch from "../../hooks/useSearch";
import usePagination from "../../hooks/usePagination";

import columnCategory from "../ColumnsCategory";
import categorySchema from "../../utils/categorySchema";
import handleSubmitData from "../../utils/handlesubmit";

import categorysData from "../../data/categorysData";
import initialCategories from "../../data/initialCategories";

const initialCategoryForm = {
  name: "",
  description: "",
  total_products: "",
  status: "active",
};

const Category = () => {
  const [categories, setCategories] = useState(initialCategories);
  const [editId, setEditId] = useState(null);

  const { isModalOpen, openModal, closeModal } = useModal();

  const {
    form,
    setForm,
    errors,
    setErrors,
    handleChange,
    resetForm,

  } = useForm(initialCategoryForm);

  const { search, setSearch, filteredData } = useSearch(categories, [
    "name",
    "description",
    "status",
  ]);

  const {
    currentPage,
    totalPages,
    paginatedData,
    nextPage,
    prevPage,
  } = usePagination(filteredData, 5);

  const openAddModal = () => {
    resetForm();
    setEditId(null);
    openModal();
  };

  const openEditModal = (category) => {
    setEditId(category.id);

    setForm({
      name: category.name,
      description: category.description,
      total_products: category.total_products,
      status: category.status,
    });

    setErrors({});
    openModal();
  };

  const handleCloseModal = () => {
    closeModal();
    resetForm();
    setEditId(null);
  };

  const handleSubmit = (e) => {
    handleSubmitData({
      e,
      schema: categorySchema,
      form,
      editId,
      data: categories,
      setData: setCategories,
      setErrors,
      closeModal: handleCloseModal,
    });
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Yakin ingin menghapus kategori ini?"
    );

    if (confirmDelete) {
      const filteredCategories = categories.filter(
        (category) => category.id !== id
      );

      setCategories(filteredCategories);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Navbar
          title="Categories"
          subtitle="Kelola data kategori produk"
          userName="Admin Toko"
          onLogout={() => alert("Logout nanti disambungkan")}
        />

        <main className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <Button variant="success" onClick={openAddModal}>
              Tambah Kategori
            </Button>
          </div>

          <div className="mb-5 rounded-2xl bg-white p-4 shadow-sm">
            <Input
              label="Cari Kategori"
              name="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari nama kategori..."
            />
          </div>

          <Table
            columns={columnCategory}
            data={paginatedData}
            emptyMessage="Belum ada data kategori"
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
        <footer className="mt-auto py-4">
          <div className="mt-4 flex items-center justify-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={prevPage}
              disabled={currentPage === 1}
            >
              Prev
            </Button>

            <span className="text-sm text-slate-600">
              Page {currentPage} dari {totalPages || 1}
            </span>

            <Button
              variant="outline"
              size="sm"
              onClick={nextPage}
              disabled={currentPage === totalPages || totalPages === 0}
            >
              Next
            </Button>
        </div>
</footer>
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
              {editId ? "Update" : "Simpan"}
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