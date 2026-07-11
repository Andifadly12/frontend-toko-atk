import { useState } from "react";

import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import Button from "../Button";
import Modal from "../Modal";
import Table from "../Table";
import Form from "../form";

import customersData from "../../data/customersData";
import customerFormData from "../../data/customerFormData";

import columnsCustomers from "../columnsCustomers/columnsCustomers";

import useForm from "../../hooks/useForm";
import useModal from "../../hooks/useModal";
import usePagination from "../../hooks/usePagination";

import customerSchema from "../../utils/customerSchema";
import handleSubmitData from "../../utils/handlesubmit";
import Footer from "../footer";

const initialCustomerForm = {
  name: "",
  phone: "",
  email: "",
  address: "",
  customer_type: "retail",
  status: "active",
};

const Customers = () => {
  const [customers, setCustomers] = useState(customersData);
  const [editId, setEditId] = useState(null);

  const { isModalOpen, openModal, closeModal } = useModal();

  const { form, setForm, errors, setErrors, handleChange, resetForm } =
    useForm(initialCustomerForm);

  const { currentPage, totalPages, paginatedData, nextPage, prevPage } =
    usePagination(customers, 5);

  const openAddModal = () => {
    resetForm();
    setEditId(null);
    openModal();
  };

  const openEditModal = customer => {
    setEditId(customer.id);

    setForm({
      name: customer.name,
      phone: customer.phone,
      email: customer.email,
      address: customer.address,
      customer_type: customer.customer_type,
      status: customer.status,
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
      schema: customerSchema,
      form,
      editId,
      data: customers,
      setData: setCustomers,
      setErrors,
      closeModal: handleCloseModal,
    });
  };

  const handleDelete = id => {
    const confirmDelete = window.confirm("Yakin ingin menghapus customer ini?");

    if (confirmDelete) {
      const filteredCustomers = customers.filter(
        customer => customer.id !== id,
      );

      setCustomers(filteredCustomers);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <div className="flex min-h-screen flex-1 flex-col">
        <Navbar onLogout={() => alert("Logout nanti disambungkan")} />

        <main className="flex-1 p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">
                Data Customer
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Tambah, edit, dan hapus data customer.
              </p>
            </div>

            <Button variant="success" onClick={openAddModal}>
              Tambah Customer
            </Button>
          </div>

          <Table
            columns={columnsCustomers}
            data={paginatedData}
            emptyMessage="Belum ada data customer"
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
        title={editId ? "Edit Customer" : "Tambah Customer"}
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
          fields={customerFormData}
          form={form}
          errors={errors}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      </Modal>
    </div>
  );
};

export default Customers;
