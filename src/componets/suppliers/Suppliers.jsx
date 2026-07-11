import { useState } from "react";

import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import Button from "../Button";
import Modal from "../Modal";
import Table from "../Table";
import Form from "../form";

import suppliersData from "../../data/suppliersData";
import supplierFormData from "../../data/supplierFormData";

import columnsSuppliers from "../columnsSuppliers/columnsSuppliers";

import useForm from "../../hooks/useForm";
import useModal from "../../hooks/useModal";
import usePagination from "../../hooks/usePagination";

import supplierSchema from "../../utils/supplierSchema";
import handleSubmitData from "../../utils/handlesubmit";
import Footer from "../footer";

const initialSupplierForm = {
  name: "",
  contact_person: "",
  phone: "",
  email: "",
  address: "",
  status: "active",
};

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState(suppliersData);
  const [editId, setEditId] = useState(null);

  const { isModalOpen, openModal, closeModal } = useModal();

  const { form, setForm, errors, setErrors, handleChange, resetForm } =
    useForm(initialSupplierForm);

  const { currentPage, totalPages, paginatedData, nextPage, prevPage } =
    usePagination(suppliers, 5);

  const openAddModal = () => {
    resetForm();
    setEditId(null);
    openModal();
  };

  const openEditModal = supplier => {
    setEditId(supplier.id);

    setForm({
      name: supplier.name,
      contact_person: supplier.contact_person,
      phone: supplier.phone,
      email: supplier.email,
      address: supplier.address,
      status: supplier.status,
    });

    setErrors({});
    openModal();
  };

  const handleCloseModal = () => {
    closeModal();
    resetForm();
    setEditId(null);
  };

  const handleSubmit = e => {
    handleSubmitData({
      e,
      schema: supplierSchema,
      form,
      editId,
      data: suppliers,
      setData: setSuppliers,
      setErrors,
      closeModal: handleCloseModal,
    });
  };

  const handleDelete = id => {
    const confirmDelete = window.confirm("Yakin ingin menghapus supplier ini?");

    if (confirmDelete) {
      const filteredSuppliers = suppliers.filter(
        supplier => supplier.id !== id,
      );

      setSuppliers(filteredSuppliers);
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
                Data Supplier
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Tambah, edit, dan hapus data supplier.
              </p>
            </div>

            <Button variant="success" onClick={openAddModal}>
              Tambah Supplier
            </Button>
          </div>

          <Table
            columns={columnsSuppliers}
            data={paginatedData}
            emptyMessage="Belum ada data supplier"
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
        title={editId ? "Edit Supplier" : "Tambah Supplier"}
        size="lg"
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
          fields={supplierFormData}
          form={form}
          errors={errors}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      </Modal>
    </div>
  );
};

export default Suppliers;
