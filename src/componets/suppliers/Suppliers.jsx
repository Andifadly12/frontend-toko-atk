import { useEffect, useState } from "react";

import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import Button from "../Button";
import Input from "../input";
import Modal from "../Modal";
import Table from "../Table";
import Form from "../form";
import Footer from "../footer";

import columnsSuppliers from "../columnsSuppliers/columnsSuppliers";

import useForm from "../../hooks/useForm";
import useModal from "../../hooks/useModal";
import useSearch from "../../hooks/useSearch";
import usePagination from "../../hooks/usePagination";

import {
  supplierFormFields,
  initialSupplierForm,
} from "../../utils/supplierFormFields.js";

import { supplierSchema } from "../../utils/supplierSchema.js";

import {
  getSuppliers,
  createSupplier,
  updateSupplier,
  deleteSupplier,
} from "../../stores/supplierServices";

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null);

  const { isModalOpen, openModal, closeModal } = useModal();

  const { form, setForm, errors, setErrors, handleChange, resetForm } =
    useForm(initialSupplierForm);

  const { search, setSearch, filteredData } = useSearch(suppliers, [
    "name",
    "phone",
    "address",
  ]);

  const { currentPage, totalPages, paginatedData, nextPage, prevPage } =
    usePagination(filteredData, 5);

  const normalizeSuppliers = data => {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.data)) return data.data;
    if (Array.isArray(data?.rows)) return data.rows;

    return [];
  };

  const fetchSuppliers = async () => {
    try {
      setLoading(true);

      const data = await getSuppliers();
      const supplierList = normalizeSuppliers(data);

      setSuppliers(supplierList);
    } catch (error) {
      console.log("ERROR GET SUPPLIERS:", error);
      alert(error.message || "Gagal mengambil data supplier");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isActive = true;

    const loadSuppliers = async () => {
      try {
        const data = await getSuppliers();
        const supplierList = normalizeSuppliers(data);

        if (isActive) {
          setSuppliers(supplierList);
        }
      } catch (error) {
        console.log("ERROR LOAD SUPPLIERS:", error);

        if (isActive) {
          alert(error.message || "Gagal mengambil data supplier");
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    loadSuppliers();

    return () => {
      isActive = false;
    };
  }, []);

  const openAddModal = () => {
    resetForm(initialSupplierForm);
    setEditId(null);
    setErrors({});
    openModal();
  };

  const openEditModal = supplier => {
    setEditId(supplier.id);

    setForm({
      name: supplier.name || "",
      phone: supplier.phone || "",
      address: supplier.address || "",
    });

    setErrors({});
    openModal();
  };

  const handleCloseModal = () => {
    closeModal();
    resetForm(initialSupplierForm);
    setEditId(null);
    setErrors({});
  };

  const handleSubmit = async e => {
    e.preventDefault();

    // Validasi hanya menggunakan supplierSchema
    const validationResult = supplierSchema.safeParse(form);

    if (!validationResult.success) {
      const fieldErrors = {};

      validationResult.error.issues.forEach(issue => {
        const fieldName = issue.path[0];

        if (fieldName) {
          fieldErrors[fieldName] = issue.message;
        }
      });

      setErrors(fieldErrors);
      return;
    }

    setErrors({});

    // Data dari Zod sudah divalidasi dan di-trim
    const supplierPayload = validationResult.data;

    try {
      setLoading(true);

      if (editId) {
        await updateSupplier(editId, supplierPayload);
      } else {
        await createSupplier(supplierPayload);
      }

      await fetchSuppliers();
      handleCloseModal();
    } catch (error) {
      console.log("ERROR SAVE SUPPLIER:", error);
      alert(error.message || "Gagal menyimpan supplier");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async id => {
    const confirmDelete = window.confirm("Yakin ingin menghapus supplier ini?");

    if (!confirmDelete) return;

    try {
      setLoading(true);

      await deleteSupplier(id);
      await fetchSuppliers();
    } catch (error) {
      console.log("ERROR DELETE SUPPLIER:", error);
      alert(error.message || "Gagal menghapus supplier");
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

          <div className="mb-5 rounded-2xl bg-white p-4 shadow-sm">
            <Input
              label="Cari Supplier"
              name="search"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Cari nama, telepon, atau alamat..."
            />
          </div>

          {loading ? (
            <div className="rounded-2xl bg-white p-6 text-center text-sm text-slate-500 shadow-sm">
              Loading data supplier...
            </div>
          ) : (
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
        title={editId ? "Edit Supplier" : "Tambah Supplier"}
        size="lg"
        footer={
          <>
            <Button
              variant="outline"
              onClick={handleCloseModal}
              disabled={loading}
            >
              Batal
            </Button>

            <Button variant="primary" onClick={handleSubmit} disabled={loading}>
              {loading ? "Menyimpan..." : editId ? "Update" : "Simpan"}
            </Button>
          </>
        }
      >
        <Form
          fields={supplierFormFields}
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
