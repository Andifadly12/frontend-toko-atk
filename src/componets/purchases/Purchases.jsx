import { useState } from "react";

import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import Button from "../Button";
import Modal from "../Modal";
import Table from "../Table";
import Form from "../form";
import Footer from "../footer";

import purchasesData from "../../data/purchasesData";
import purchaseFormData from "../../data/purchaseFormData";

import columnsPurchases from "../columnsPurchases/columnsPurchases";

import useForm from "../../hooks/useForm";
import useModal from "../../hooks/useModal";
import usePagination from "../../hooks/usePagination";

import purchaseSchema from "../../utils/purchaseSchema";
import handleSubmitData from "../../utils/handlesubmit";

const initialPurchaseForm = {
  invoice_number: "",
  product_name: "",
  supplier: "",
  quantity: "",
  purchase_price: "",
  purchase_date: "",
  status: "paid",
};

const Purchases = () => {
  const [purchases, setPurchases] = useState(purchasesData);
  const [editId, setEditId] = useState(null);

  const { isModalOpen, openModal, closeModal } = useModal();

  const { form, setForm, errors, setErrors, handleChange, resetForm } =
    useForm(initialPurchaseForm);

  const { currentPage, totalPages, paginatedData, nextPage, prevPage } =
    usePagination(purchases, 5);

  const openAddModal = () => {
    resetForm();
    setEditId(null);
    openModal();
  };

  const openEditModal = purchase => {
    setEditId(purchase.id);

    setForm({
      invoice_number: purchase.invoice_number,
      product_name: purchase.product_name,
      supplier: purchase.supplier,
      quantity: purchase.quantity,
      purchase_price: purchase.purchase_price,
      purchase_date: purchase.purchase_date,
      status: purchase.status,
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
    const totalPrice =
      Number(form.quantity || 0) * Number(form.purchase_price || 0);

    handleSubmitData({
      e,
      schema: purchaseSchema,
      form: {
        ...form,
        total_price: totalPrice,
      },
      editId,
      data: purchases,
      setData: setPurchases,
      setErrors,
      closeModal: handleCloseModal,
    });
  };

  const handleDelete = id => {
    const confirmDelete = window.confirm(
      "Yakin ingin menghapus data pembelian ini?",
    );

    if (confirmDelete) {
      const filteredPurchases = purchases.filter(
        purchase => purchase.id !== id,
      );

      setPurchases(filteredPurchases);
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
                Data Pembelian
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Catat pembelian barang dari supplier.
              </p>
            </div>

            <Button variant="success" onClick={openAddModal}>
              Tambah Pembelian
            </Button>
          </div>

          <Table
            columns={columnsPurchases}
            data={paginatedData}
            emptyMessage="Belum ada data pembelian"
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
        title={editId ? "Edit Pembelian" : "Tambah Pembelian"}
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
          fields={purchaseFormData}
          form={form}
          errors={errors}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      </Modal>
    </div>
  );
};

export default Purchases;
