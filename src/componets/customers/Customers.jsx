import { useEffect, useState } from "react";

import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import Button from "../Button";
import Input from "../input";
import Modal from "../Modal";
import Table from "../Table";
import Form from "../form";
import Footer from "../footer";

import columnsCustomers from "../columnsCustomers/columnsCustomers";

import useForm from "../../hooks/useForm";
import useModal from "../../hooks/useModal";
import useSearch from "../../hooks/useSearch";
import usePagination from "../../hooks/usePagination";
import { customerFormFields } from "../../utils/customerFormFields";
import { initialCustomerForm } from "../../utils/customerFormFields";
import {
  getCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "../../stores/costumersServices";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null);

  const { isModalOpen, openModal, closeModal } = useModal();

  const { form, setForm, errors, setErrors, handleChange, resetForm } =
    useForm(initialCustomerForm);

  const { search, setSearch, filteredData } = useSearch(customers, [
    "name",
    "phone",
    "address",
  ]);

  const { currentPage, totalPages, paginatedData, nextPage, prevPage } =
    usePagination(filteredData, 10);

  const normalizeCustomers = data => {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.data)) return data.data;
    if (Array.isArray(data?.rows)) return data.rows;
    return [];
  };

  const fetchCustomers = async () => {
    try {
      setLoading(true);

      const data = await getCustomers();
      const customerList = normalizeCustomers(data);

      setCustomers(customerList);
    } catch (error) {
      console.log("ERROR GET CUSTOMERS:", error);
      alert(error.message || "Gagal mengambil data customer");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isActive = true;

    const loadCustomers = async () => {
      try {
        const data = await getCustomers();
        const customerList = normalizeCustomers(data);

        if (isActive) {
          setCustomers(customerList);
        }
      } catch (error) {
        console.log("ERROR LOAD CUSTOMERS:", error);

        if (isActive) {
          alert(error.message || "Gagal mengambil data customer");
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    loadCustomers();

    return () => {
      isActive = false;
    };
  }, []);

  const openAddModal = () => {
    resetForm({
      name: "",
      phone: "",
      address: "",
    });

    setEditId(null);
    setErrors({});
    openModal();
  };

  const openEditModal = customer => {
    setEditId(customer.id);

    setForm({
      name: customer.name || "",
      phone: customer.phone || "",
      address: customer.address || "",
    });

    setErrors({});
    openModal();
  };

  const handleCloseModal = () => {
    closeModal();

    resetForm({
      name: "",
      phone: "",
      address: "",
    });

    setEditId(null);
    setErrors({});
  };

  const validateForm = () => {
    const fieldErrors = {};

    if (!form.name.trim()) {
      fieldErrors.name = "Nama customer wajib diisi";
    }

    if (!form.phone.trim()) {
      fieldErrors.phone = "Nomor telepon wajib diisi";
    }

    if (!form.address.trim()) {
      fieldErrors.address = "Alamat wajib diisi";
    }

    setErrors(fieldErrors);

    return Object.keys(fieldErrors).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const isValid = validateForm();

    if (!isValid) return;

    const customerPayload = {
      name: form.name.trim(),
      phone: form.phone.trim(),
      address: form.address.trim(),
    };

    try {
      setLoading(true);

      if (editId) {
        await updateCustomer(editId, customerPayload);
      } else {
        await createCustomer(customerPayload);
      }

      await fetchCustomers();
      handleCloseModal();
    } catch (error) {
      console.log("ERROR SAVE CUSTOMER:", error);
      alert(error.message || "Gagal menyimpan customer");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async id => {
    const confirmDelete = window.confirm("Yakin ingin menghapus customer ini?");

    if (!confirmDelete) return;

    try {
      setLoading(true);

      await deleteCustomer(id);

      await fetchCustomers();
    } catch (error) {
      console.log("ERROR DELETE CUSTOMER:", error);
      alert(error.message || "Gagal menghapus customer");
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

          <div className="mb-5 rounded-2xl bg-white p-4 shadow-sm">
            <Input
              label="Cari Customer"
              name="search"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Cari nama, telepon, atau alamat..."
            />
          </div>

          {loading ? (
            <div className="rounded-2xl bg-white p-6 text-center text-sm text-slate-500 shadow-sm">
              Loading data customer...
            </div>
          ) : (
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
        title={editId ? "Edit Customer" : "Tambah Customer"}
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
          fields={customerFormFields}
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
