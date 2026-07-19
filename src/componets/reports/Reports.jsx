import { useEffect, useState } from "react";

import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import Card from "../Card";
import Table from "../Table";
import Text from "../Text";
import Footer from "../footer";

import columnsReports from "../columnsReports/columnsReports";
import useLogout from "../../hooks/useLogout";
import useAuthStore from "../../hooks/authStore";
import usePagination from "../../hooks/usePagination";
import formatRupiah from "../../utils/formatRupiah";

import { getSummaryReport, getSalesReport } from "../../stores/reportsServices";

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [summary, setSummary] = useState({
    totalSales: 0,
    totalTransactions: 0,
    totalProducts: 0,
    lowStockProducts: 0,
  });

  const [loading, setLoading] = useState(true);

  const { currentPage, totalPages, paginatedData, nextPage, prevPage } =
    usePagination(reports, 5);

  const normalizeData = data => {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.data)) return data.data;
    if (Array.isArray(data?.rows)) return data.rows;
    return [];
  };

  useEffect(() => {
    let isActive = true;

    const loadReports = async () => {
      try {
        const [summaryResponse, salesResponse] = await Promise.all([
          getSummaryReport(),
          getSalesReport(),
        ]);

        const summaryData = summaryResponse?.data || {};
        const salesData = normalizeData(salesResponse);

        const salesReports = salesData.map(sale => ({
          id: sale.id,
          invoice_number: sale.invoice_number || "-",
          customer_name: sale.customer_name || "Umum / Tanpa Customer",
          cashier_name: sale.cashier_name || "-",
          payment_method: sale.payment_method || "-",
          total_amount: Number(sale.total_amount || 0),
          paid_amount: Number(sale.paid_amount || 0),
          change_amount: Number(sale.change_amount || 0),
          created_at: sale.created_at,
        }));

        if (isActive) {
          setSummary({
            totalSales: Number(summaryData.totalSales || 0),
            totalTransactions: Number(
              summaryData.totalTransactions ||
                summaryData.totalTrasactions ||
                0,
            ),
            totalProducts: Number(summaryData.totalProducts || 0),
            lowStockProducts: Number(summaryData.lowStockProducts || 0),
          });

          setReports(salesReports);
        }
      } catch (error) {
        console.log("ERROR LOAD REPORTS:", error);

        if (isActive) {
          alert(error.message || "Gagal mengambil data laporan");
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    loadReports();

    return () => {
      isActive = false;
    };
  }, []);
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
          <div className="mb-6">
            <Text as="h1" size="2xl" weight="bold">
              Reports / Laporan
            </Text>

            <Text size="sm" color="muted" className="mt-1">
              Ringkasan laporan penjualan dan stok Toko ATK.
            </Text>
          </div>

          <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            <Card
              title="Total Penjualan"
              value={formatRupiah(summary.totalSales)}
              description="Total nominal penjualan"
              variant="success"
            />

            <Card
              title="Jumlah Transaksi"
              value={summary.totalTransactions}
              description="Total transaksi penjualan"
              variant="primary"
            />

            <Card
              title="Total Produk"
              value={summary.totalProducts}
              description="Jumlah produk terdaftar"
              variant="warning"
            />

            <Card
              title="Stok Menipis"
              value={summary.lowStockProducts}
              description="Produk dengan stok ≤ 10"
              variant="danger"
            />
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="mb-5">
              <Text as="h2" size="lg" weight="bold">
                Laporan Penjualan
              </Text>

              <Text size="sm" color="muted">
                Data laporan transaksi penjualan dari database.
              </Text>
            </div>

            {loading ? (
              <div className="rounded-xl border border-slate-200 p-5 text-center text-sm text-slate-500">
                Loading data laporan...
              </div>
            ) : (
              <Table
                columns={columnsReports}
                data={paginatedData}
                emptyMessage="Belum ada data laporan"
              />
            )}
          </div>
        </main>

        <Footer
          currentPage={currentPage}
          totalPages={totalPages}
          prevPage={prevPage}
          nextPage={nextPage}
        />
      </div>
    </div>
  );
};

export default Reports;
