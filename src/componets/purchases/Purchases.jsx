import { useEffect, useState } from "react";

import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import Button from "../Button";
import Modal from "../Modal";
import Table from "../Table";
import Form from "../form";
import Footer from "../footer";

import columnsPurchases from "../columnsPurchases/columnsPurchases";

import useForm from "../../hooks/useForm";
import useModal from "../../hooks/useModal";
import usePagination from "../../hooks/usePagination";

import {
  getPurchases,
  getPurchaseById,
  createPurchase,
  updatePurchase,
  deletePurchase,
} from "../../stores/purchasesServices";

import { getProducts } from "../../stores/productServices";
import { getSuppliers } from "../../stores/supplierServices";

const initialPurchaseForm = {
  supplier_id: "",
  product_id: "",
  quantity: "",
  price: "",
};

const Purchases = () => {
  const [purchases, setPurchases] = useState([]);
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null);

  const { isModalOpen, openModal, closeModal } = useModal();

  const { form, setForm, errors, setErrors, handleChange, resetForm } =
    useForm(initialPurchaseForm);

  const { currentPage, totalPages, paginatedData, nextPage, prevPage } =
    usePagination(purchases, 5);

  const normalizeData = data => {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.data)) return data.data;
    if (Array.isArray(data?.rows)) return data.rows;
    return [];
  };

  const normalizeDetail = data => {
    if (data?.data) return data.data;
    return data;
  };

  const purchaseFormFields = [
    {
      name: "supplier_id",
      label: "Supplier",
      type: "select",
      placeholder: "Pilih supplier",
      options: suppliers.map(supplier => ({
        label: supplier.name,
        value: supplier.id,
      })),
    },
    {
      name: "product_id",
      label: "Produk",
      type: "select",
      placeholder: "Pilih produk",
      required: true,
      options: products.map(product => ({
        label: `${product.name} - Stok: ${product.stock}`,
        value: product.id,
      })),
    },
    {
      name: "quantity",
      label: "Jumlah",
      type: "number",
      placeholder: "Contoh: 10",
      required: true,
    },
    {
      name: "price",
      label: "Harga Beli",
      type: "number",
      placeholder: "Contoh: 5000",
      required: true,
    },
  ];

  const enrichPurchasesWithDetail = async purchaseList => {
    const result = await Promise.all(
      purchaseList.map(async purchase => {
        try {
          const detailResponse = await getPurchaseById(purchase.id);
          const detail = normalizeDetail(detailResponse);
          const firstItem = detail.items?.[0] || {};

          return {
            ...purchase,
            product_id: firstItem.product_id || "",
            product_name: firstItem.product_name || "-",
            quantity: firstItem.quantity || 0,
            price: firstItem.price || 0,
            subtotal: firstItem.subtotal || purchase.total_amount || 0,
          };
        } catch (error) {
          console.log("ERROR GET PURCHASE DETAIL:", error);

          return {
            ...purchase,
            product_name: "-",
            quantity: 0,
            price: 0,
            subtotal: purchase.total_amount || 0,
          };
        }
      }),
    );

    return result;
  };

  useEffect(() => {
    let isActive = true;

    const loadData = async () => {
      try {
        const [purchaseResponse, productResponse, supplierResponse] =
          await Promise.all([getPurchases(), getProducts(), getSuppliers()]);

        const purchaseList = normalizeData(purchaseResponse);
        const productList = normalizeData(productResponse);
        const supplierList = normalizeData(supplierResponse);

        const purchaseWithDetail =
          await enrichPurchasesWithDetail(purchaseList);

        if (isActive) {
          setPurchases(purchaseWithDetail);
          setProducts(productList);
          setSuppliers(supplierList);
        }
      } catch (error) {
        console.log("ERROR LOAD PURCHASE DATA:", error);

        if (isActive) {
          alert(error.message || "Gagal mengambil data pembelian");
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

  const fetchPurchases = async () => {
    try {
      setLoading(true);

      const data = await getPurchases();
      const purchaseList = normalizeData(data);
      const purchaseWithDetail = await enrichPurchasesWithDetail(purchaseList);

      setPurchases(purchaseWithDetail);
    } catch (error) {
      console.log("ERROR GET PURCHASES:", error);
      alert(error.message || "Gagal mengambil data pembelian");
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

  const openEditModal = async purchase => {
    try {
      setLoading(true);
      setEditId(purchase.id);

      const detailResponse = await getPurchaseById(purchase.id);
      const detail = normalizeDetail(detailResponse);

      const purchaseData = detail.purchase || {};
      const firstItem = detail.items?.[0] || {};

      setForm({
        supplier_id: purchaseData.supplier_id || purchase.supplier_id || "",
        product_id: firstItem.product_id || "",
        quantity: firstItem.quantity || "",
        price: firstItem.price || "",
      });

      setErrors({});
      openModal();
    } catch (error) {
      console.log("ERROR GET PURCHASE DETAIL:", error);
      alert(error.message || "Gagal mengambil detail pembelian");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    closeModal();
    resetForm();
    setEditId(null);
    setErrors({});
  };

  const validateForm = () => {
    const fieldErrors = {};

    if (!form.product_id) {
      fieldErrors.product_id = "Produk wajib dipilih";
    }

    if (!form.quantity || Number(form.quantity) <= 0) {
      fieldErrors.quantity = "Jumlah wajib lebih dari 0";
    }

    if (!form.price || Number(form.price) <= 0) {
      fieldErrors.price = "Harga beli wajib lebih dari 0";
    }

    setErrors(fieldErrors);

    return Object.keys(fieldErrors).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const isValid = validateForm();

    if (!isValid) return;

    const purchasePayload = {
      supplier_id: form.supplier_id ? Number(form.supplier_id) : null,
      items: [
        {
          product_id: Number(form.product_id),
          quantity: Number(form.quantity),
          price: Number(form.price),
        },
      ],
    };

    try {
      setLoading(true);

      if (editId) {
        await updatePurchase(editId, purchasePayload);
      } else {
        await createPurchase(purchasePayload);
      }

      await fetchPurchases();
      handleCloseModal();
    } catch (error) {
      console.log("ERROR SAVE PURCHASE:", error);
      alert(error.message || "Gagal menyimpan data pembelian");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async id => {
    const confirmDelete = window.confirm(
      "Yakin ingin menghapus data pembelian ini?",
    );

    if (!confirmDelete) return;

    try {
      setLoading(true);

      await deletePurchase(id);

      await fetchPurchases();
    } catch (error) {
      console.log("ERROR DELETE PURCHASE:", error);
      alert(error.message || "Gagal menghapus data pembelian");
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

          {loading ? (
            <div className="rounded-2xl bg-white p-6 text-center text-sm text-slate-500 shadow-sm">
              Loading data pembelian...
            </div>
          ) : (
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
        title={editId ? "Edit Pembelian" : "Tambah Pembelian"}
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
          fields={purchaseFormFields}
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
