import Text from "../Text";
import Badge from "../badge";
import formatRupiah from "../../utils/formatRupiah";

const columnsPurchases = [
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
        {item.product_name || "-"}
      </Text>
    ),
  },
  {
    key: "supplier_name",
    label: "Supplier",
    render: item => (
      <Text size="sm" color="muted">
        {item.supplier_name || "-"}
      </Text>
    ),
  },
  {
    key: "quantity",
    label: "Qty",
    render: item => <Badge variant="primary">{item.quantity || 0}</Badge>,
  },
  {
    key: "price",
    label: "Harga Beli",
    render: item => <Text size="sm">{formatRupiah(item.price || 0)}</Text>,
  },
  {
    key: "total_amount",
    label: "Total",
    render: item => (
      <Text size="sm" weight="semibold" color="primary">
        {formatRupiah(item.total_amount || item.subtotal || 0)}
      </Text>
    ),
  },
  {
    key: "status",
    label: "Status",
    render: () => <Badge variant="success">Selesai</Badge>,
  },
];

export default columnsPurchases;
