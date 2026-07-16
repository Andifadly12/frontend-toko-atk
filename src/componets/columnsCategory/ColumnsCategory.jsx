import Badge from "../badge";
import Text from "../Text";

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
      <Badge variant="primary">{item.total_products || 0} Produk</Badge>
    ),
  },
  {
    key: "status",
    label: "Status",
    render: item => (
      <Badge variant={item.status === "inactive" ? "danger" : "success"}>
        {item.status === "inactive" ? "Tidak Aktif" : "Aktif"}
      </Badge>
    ),
  },
];

export default columnCategory;
