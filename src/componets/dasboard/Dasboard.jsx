import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import Card from "../Card";
import Badge from "../badge";
import Text from "../Text";
import  summaryCards  from "../../utils/summaryCars.js";
import topProducts from "../../utils/topProducts.js";
import lowStockProducts from "../../utils/lowStockProducts.js";

const Dashboard = () => {
  
  const handleLogout = () => {
    alert("Logout nanti disambungkan setelah fitur login dibuat");
  };

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
              Ini adalah tampilan dashboard sementara tanpa API.
            </Text>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {summaryCards.map((card) => (
              <Card
                key={card.title}
                title={card.title}
                value={card.value}
                description={card.description}
                variant={card.variant}
              />
            ))}
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-2">
            <Card variant="default" className="border-0">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <Text as="h3" size="lg" weight="bold">
                    Produk Terlaris
                  </Text>

                  <Text size="sm" color="muted">
                    Data penjualan sementara
                  </Text>
                </div>

                <Badge variant="primary">Top Product</Badge>
              </div>

              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between border-b border-slate-100 pb-3 last:border-0"
                  >
                    <div>
                      <Text weight="semibold">
                        {index + 1}. {product.name}
                      </Text>

                      <Text size="sm" color="muted">
                        Terjual: {product.sold}
                      </Text>
                    </div>

                    <Text weight="bold" color="primary">
                      {product.total}
                    </Text>
                  </div>
                ))}
              </div>
            </Card>

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
                {lowStockProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between border-b border-slate-100 pb-3 last:border-0"
                  >
                    <Text weight="semibold">{product.name}</Text>

                    <Badge
                      variant={product.stock <= 0 ? "danger" : "warning"}
                    >
                      Stok: {product.stock}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;