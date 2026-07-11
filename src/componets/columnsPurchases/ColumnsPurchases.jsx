import Badge from "../badge";
import Text from "../Text";
import formatRupiah from "../../utils/formatRupiah";

const ColumnsPurchases = [
  {
    key: "invoice_number",
    label: "Invoice",
    render: item => <Text weight="semibold">{item.invoice_number}</Text>,
  },
  {
    key: "product_name",
    label: "Produk",
    render: item => (
      <Text size="sm" color="muted">
        {item.product_name}
      </Text>
    ),
  },
  {
    key: "supplier",
    label: "Supplier",
    render: item => (
      <Text size="sm" color="muted">
        {item.supplier}
      </Text>
    ),
  },
  {
    key: "quantity",
    label: "Qty",
    render: item => <Badge variant="primary">{item.quantity}</Badge>,
  },
  {
    key: "purchase_price",
    label: "Harga Beli",
    render: item => <Text size="sm">{formatRupiah(item.purchase_price)}</Text>,
  },
  {
    key: "total_price",
    label: "Total",
    render: item => (
      <Text size="sm" weight="semibold" color="primary">
        {formatRupiah(item.total_price)}
      </Text>
    ),
  },
  {
    key: "status",
    label: "Status",
    render: item => (
      <Badge variant={item.status === "paid" ? "success" : "warning"}>
        {item.status}
      </Badge>
    ),
  },
];

export default ColumnsPurchases;
