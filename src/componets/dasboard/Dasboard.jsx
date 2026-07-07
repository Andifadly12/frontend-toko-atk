import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
const Dashboard = () => {
  const summaryCards = [
    {
      title: "Total Penjualan",
      value: "Rp 2.500.000",
      description: "Total penjualan bulan ini",
      color: "text-blue-600",
    },
    {
      title: "Total Pembelian",
      value: "Rp 1.200.000",
      description: "Total pembelian barang",
      color: "text-green-600",
    },
    {
      title: "Total Produk",
      value: "120",
      description: "Jumlah produk tersedia",
      color: "text-slate-800",
    },
    {
      title: "Total Customer",
      value: "35",
      description: "Jumlah pelanggan",
      color: "text-purple-600",
    },
    {
      title: "Total Supplier",
      value: "8",
      description: "Jumlah supplier",
      color: "text-orange-600",
    },
    {
      title: "Stok Rendah",
      value: "5",
      description: "Produk hampir habis",
      color: "text-red-600",
    },
  ];

  const topProducts = [
    {
      id: 1,
      name: "Pulpen Pilot",
      sold: 50,
      total: "Rp 150.000",
    },
    {
      id: 2,
      name: "Buku Tulis Sidu",
      sold: 40,
      total: "Rp 200.000",
    },
    {
      id: 3,
      name: "Pensil 2B",
      sold: 30,
      total: "Rp 90.000",
    },
  ];

  const lowStockProducts = [
    {
      id: 1,
      name: "Penghapus",
      stock: 5,
    },
    {
      id: 2,
      name: "Spidol Hitam",
      stock: 3,
    },
    {
      id: 3,
      name: "Map Plastik",
      stock: 0,
    },
  ];

  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Content */}
      <div className="flex flex-1 flex-col">
        {/* Navbar */}
       <Navbar />

        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-800">
              Selamat datang
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Ini adalah tampilan dashboard sementara tanpa API.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {summaryCards.map((card) => (
              <div
                key={card.title}
                className="rounded-2xl bg-white p-6 shadow-sm"
              >
                <p className="text-sm font-medium text-slate-500">
                  {card.title}
                </p>

                <h3 className={`mt-3 text-3xl font-bold ${card.color}`}>
                  {card.value}
                </h3>

                <p className="mt-2 text-sm text-slate-400">
                  {card.description}
                </p>
              </div>
            ))}
          </div>

          {/* Tables */}
          <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-2">
            {/* Produk Terlaris */}
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-800">
                    Produk Terlaris
                  </h3>
                  <p className="text-sm text-slate-500">
                    Data penjualan sementara
                  </p>
                </div>

                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                  Top Product
                </span>
              </div>

              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between border-b border-slate-100 pb-3 last:border-0"
                  >
                    <div>
                      <p className="font-semibold text-slate-800">
                        {index + 1}. {product.name}
                      </p>
                      <p className="text-sm text-slate-500">
                        Terjual: {product.sold}
                      </p>
                    </div>

                    <p className="font-bold text-blue-600">
                      {product.total}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Stok Rendah */}
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-800">
                    Produk Stok Rendah
                  </h3>
                  <p className="text-sm text-slate-500">
                    Barang yang perlu ditambah
                  </p>
                </div>

                <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                  Warning
                </span>
              </div>

              <div className="space-y-4">
                {lowStockProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between border-b border-slate-100 pb-3 last:border-0"
                  >
                    <p className="font-semibold text-slate-800">
                      {product.name}
                    </p>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        product.stock <= 0
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      Stok: {product.stock}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;