import Text from "../Text";
import Badge from "../badge";
const columnCategory = [
  {
    key: "name",
    label: "Nama Kategori",
    render: item => <Text weight="semibold">{item.name}</Text>,
  },
  {
    key: "description",
    label: "Deskripsi",
    render: item => (
      <Text size="sm" color="muted">
        {item.description || "-"}
      </Text>
    ),
  },
  {
    key: "total_products",
    label: "Jumlah Produk",
    render: item => (
      <Badge variant="primary">{item.total_products} Produk</Badge>
    ),
  },
  {
    key: "status",
    label: "Status",
    render: item => (
      <Badge variant={item.status === "active" ? "success" : "danger"}>
        {item.status === "active" ? "Aktif" : "Tidak Aktif"}
      </Badge>
    ),
  },
];

export default columnCategory;
