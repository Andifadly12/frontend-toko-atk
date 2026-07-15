import formatRupiah from "../../utils/formatRupiah";
import Badge from "../badge";
import Text from "../Text";

const columnsProducts = [
  {
    key: "name",
    label: "Produk",
    render: item => (
      <div>
        <Text weight="semibold">{item.name}</Text>
        <Text size="sm" color="muted">
          SKU: {item.sku || "-"}
        </Text>
      </div>
    ),
  },
  {
    key: "category_name",
    label: "Kategori",
    render: item => (
      <Text size="sm" color="muted">
        {item.category_name || item.category || "-"}
      </Text>
    ),
  },
  {
    key: "unit",
    label: "Satuan",
    render: item => (
      <Text size="sm" color="muted">
        {item.unit || "-"}
      </Text>
    ),
  },
  {
    key: "purchase_price",
    label: "Harga Beli",
    render: item => <Text size="sm">{formatRupiah(item.purchase_price)}</Text>,
  },
  {
    key: "selling_price",
    label: "Harga Jual",
    render: item => (
      <Text size="sm" weight="semibold" color="primary">
        {formatRupiah(item.selling_price)}
      </Text>
    ),
  },
  {
    key: "stock",
    label: "Stok",
    render: item => (
      <Badge
        variant={
          item.stock <= 0 ? "danger" : item.stock <= 10 ? "warning" : "success"
        }
      >
        {item.stock}
      </Badge>
    ),
  },
];

export default columnsProducts;
