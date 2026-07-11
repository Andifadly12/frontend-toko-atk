import { useState } from "react";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import Button from "../Button";
import productFormData from "../../data/productFromData";
import Modal from "../Modal";
import Table from "../Table";
import productsData from "../../data/productsData";
import Form from "../form";
import columnsProducts from "../columnsProducts/columnsProducts";
import useForm from "../../hooks/useForm";
import useModal from "../../hooks/useModal";
import productSchema from "../../utils/productSchema";
import handleSubmitData from "../../utils/handlesubmit";
import Footer from "../footer";
import usePagination from "../../hooks/usePagination";

const initialProductForm = {
  name: "",
  category: "",
  supplier: "",
  purchase_price: "",
  selling_price: "",
  stock: "",
};
const Products = () => {
  const [products, setProducts] = useState(productsData);

  const { isModalOpen, openModal, closeModal } = useModal();
  const [editId, setEditId] = useState(null);

  const { form, setForm, errors, setErrors, handleChange, resetForm } =
    useForm(initialProductForm);

  const openAddModal = () => {
    resetForm();
    setEditId();
    openModal();
  };
  const { currentPage, totalPages, paginatedData, nextPage, prevPage } =
    usePagination(products, 5);

  const openEditModal = product => {
    setEditId(product.id);

    setForm({
      name: product.name,
      category: product.category,
      supplier: product.supplier,
      purchase_price: product.purchase_price,
      selling_price: product.selling_price,
      stock: product.stock,
    });
    setErrors();
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
      schema: productSchema,
      form,
      editId,
      data: products,
      setData: setProducts,
      setErrors,
      closeModal: handleCloseModal,
    });
  };

  const handleDelete = id => {
    const confirmDelete = window.confirm("Yakin ingin menghapus produk ini?");

    if (confirmDelete) {
      const filteredProducts = products.filter(product => product.id !== id);
      setProducts(filteredProducts);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Navbar
          userName="Admin Toko"
          onLogout={() => alert("Logout nanti disambungkan")}
        />

        <main className="p-6">
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
