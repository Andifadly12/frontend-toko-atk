import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import Card from "../Card";
import Table from "../Table";
import Text from "../Text";
import Footer from "../footer";

import reportsData from "../../data/reportsData";
import columnsReports from "../columnsReports/columnsReports";

import usePagination from "../../hooks/usePagination";
import formatRupiah from "../../utils/formatRupiah";

const Reports = () => {
  const salesReports = reportsData.filter(report => report.type === "sale");
  const purchaseReports = reportsData.filter(
    report => report.type === "purchase",
  );

  const totalSales = salesReports.reduce((total, report) => {
    return total + Number(report.total || 0);
  }, 0);

  const totalPurchases = purchaseReports.reduce((total, report) => {
    return total + Number(report.total || 0);
  }, 0);

  const profit = totalSales - totalPurchases;

  const { currentPage, totalPages, paginatedData, nextPage, prevPage } =
    usePagination(reportsData, 5);

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <div className="flex min-h-screen flex-1 flex-col">
        <Navbar
          userName="Admin Toko"
          onLogout={() => alert("Logout nanti disambungkan")}
        />

        <main className="flex-1 p-6">
          <div className="mb-6">
            <Text as="h1" size="2xl" weight="bold">
              Reports / Laporan
            </Text>

            <Text size="sm" color="muted" className="mt-1">
              Ringkasan laporan penjualan dan pembelian Toko ATK.
            </Text>
          </div>

          <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            <Card
              title="Total Penjualan"
              value={formatRupiah(totalSales)}
              description="Total transaksi penjualan"
              variant="success"
            />

            <Card
              title="Total Pembelian"
              value={formatRupiah(totalPurchases)}
              description="Total transaksi pembelian"
              variant="warning"
            />

            <Card
              title="Laba / Rugi"
              value={formatRupiah(profit)}
              description="Penjualan dikurangi pembelian"
              variant={profit >= 0 ? "primary" : "danger"}
            />

            <Card
              title="Jumlah Transaksi"
              value={reportsData.length}
              description="Total data laporan"
              variant="default"
            />
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="mb-5">
              <Text as="h2" size="lg" weight="bold">
                Data Laporan
              </Text>

              <Text size="sm" color="muted">
                Daftar laporan transaksi penjualan dan pembelian.
              </Text>
            </div>

            <Table
              columns={columnsReports}
              data={paginatedData}
              emptyMessage="Belum ada data laporan"
            />
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
