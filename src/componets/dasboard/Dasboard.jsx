import { useEffect, useState } from "react";

import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import Card from "../Card";
import Badge from "../badge";
import Text from "../Text";

import formatRupiah from "../../utils/formatRupiah";

import { getSummaryReport, getStockReport } from "../../stores/reportsServices";

const Dashboard = () => {
  const [summary, setSummary] = useState({
    totalSales: 0,
    totalTransactions: 0,
    totalProducts: 0,
    lowStockProducts: 0,
  });

  const [stockProducts, setStockProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    alert("Logout nanti disambungkan setelah fitur login dibuat");
  };

  const normalizeData = data => {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.data)) return data.data;
    if (Array.isArray(data?.rows)) return data.rows;
    return [];
  };

  useEffect(() => {
    let isActive = true;

    const loadDashboard = async () => {
      try {
        const [summaryResponse, stockResponse] = await Promise.all([
          getSummaryReport(),
          getStockReport(),
        ]);

        const summaryData = summaryResponse?.data || {};
        const stockData = normalizeData(stockResponse);

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

          setStockProducts(stockData);
        }
      } catch (error) {
        console.log("ERROR LOAD DASHBOARD:", error);

        if (isActive) {
          alert(error.message || "Gagal mengambil data dashboard");
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    loadDashboard();

    return () => {
      isActive = false;
    };
  }, []);

  const lowStockProducts = stockProducts.filter(product => {
    return Number(product.stock || 0) <= 10;
  });

  const newestStockProducts = stockProducts.slice(0, 5);

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Navbar
          title="Dashboard"
          subtitle="Ringkasan data Toko ATK"
          userName="Admin Toko"
          onLogout={handleLogout}
        />

        <main className="p-6">
          <div className="mb-6">
            <Text as="h1" size="2xl" weight="bold">
              Selamat datang
            </Text>

            <Text size="sm" color="muted" className="mt-1">
              Ringkasan data toko berdasarkan database.
            </Text>
          </div>

          {loading ? (
            <div className="rounded-2xl bg-white p-6 text-center text-sm text-slate-500 shadow-sm">
              Loading dashboard...
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
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

              <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-2">
                <Card variant="default" className="border-0">
                  <div className="mb-5 flex items-center justify-between">
                    <div>
                      <Text as="h3" size="lg" weight="bold">
                        Produk Stok Rendah
                      </Text>

                      <Text size="sm" color="muted">
                        Barang yang perlu segera ditambah
                      </Text>
                    </div>

                    <Badge variant="warning">Warning</Badge>
                  </div>

                  <div className="space-y-4">
                    {lowStockProducts.length > 0 ? (
                      lowStockProducts.map(product => (
                        <div
                          key={product.id}
                          className="flex items-center justify-between border-b border-slate-100 pb-3 last:border-0"
                        >
                          <div>
                            <Text weight="semibold">{product.name}</Text>

                            <Text size="sm" color="muted">
                              {product.category_name || "-"}
                            </Text>
                          </div>

                          <Badge
                            variant={
                              Number(product.stock || 0) <= 0
                                ? "danger"
                                : "warning"
                            }
                          >
                            Stok: {product.stock}
                          </Badge>
                        </div>
                      ))
                    ) : (
                      <Text size="sm" color="muted">
                        Tidak ada produk stok rendah.
                      </Text>
                    )}
                  </div>
                </Card>

                <Card variant="default" className="border-0">
                  <div className="mb-5 flex items-center justify-between">
                    <div>
                      <Text as="h3" size="lg" weight="bold">
                        Data Stok Produk
                      </Text>

                      <Text size="sm" color="muted">
                        Daftar produk dari database
                      </Text>
                    </div>

                    <Badge variant="primary">Stock</Badge>
                  </div>

                  <div className="space-y-4">
                    {newestStockProducts.length > 0 ? (
                      newestStockProducts.map(product => (
                        <div
                          key={product.id}
                          className="flex items-center justify-between border-b border-slate-100 pb-3 last:border-0"
                        >
                          <div>
                            <Text weight="semibold">{product.name}</Text>

                            <Text size="sm" color="muted">
                              Harga jual: {formatRupiah(product.selling_price)}
                            </Text>
                          </div>

                          <Badge
                            variant={
                              Number(product.stock || 0) <= 0
                                ? "danger"
                                : Number(product.stock || 0) <= 10
                                  ? "warning"
                                  : "success"
                            }
                          >
                            {product.stock}
                          </Badge>
                        </div>
                      ))
                    ) : (
                      <Text size="sm" color="muted">
                        Belum ada data produk.
                      </Text>
                    )}
                  </div>
                </Card>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
