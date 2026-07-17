import Badge from "../badge";
import Text from "../Text";
import formatRupiah from "../../utils/formatRupiah";

const columnsReports = [
  {
    key: "invoice_number",
    label: "Invoice",
    render: item => <Text weight="semibold">{item.invoice_number}</Text>,
  },
  {
    key: "customer_name",
    label: "Customer",
    render: item => (
      <Text size="sm" color="muted">
        {item.customer_name || "-"}
      </Text>
    ),
  },
  {
    key: "cashier_name",
    label: "Kasir",
    render: item => (
      <Text size="sm" color="muted">
        {item.cashier_name || "-"}
      </Text>
    ),
  },
  {
    key: "payment_method",
    label: "Metode",
    render: item => (
      <Badge variant="primary">{item.payment_method || "-"}</Badge>
    ),
  },
  {
    key: "total_amount",
    label: "Total",
    render: item => (
      <Text size="sm" weight="semibold" color="primary">
        {formatRupiah(item.total_amount)}
      </Text>
    ),
  },
  {
    key: "paid_amount",
    label: "Dibayar",
    render: item => (
      <Text size="sm" color="muted">
        {formatRupiah(item.paid_amount)}
      </Text>
    ),
  },
  {
    key: "change_amount",
    label: "Kembalian",
    render: item => (
      <Text size="sm" color="muted">
        {formatRupiah(item.change_amount)}
      </Text>
    ),
  },
  {
    key: "created_at",
    label: "Tanggal",
    render: item => (
      <Text size="sm" color="muted">
        {item.created_at
          ? new Date(item.created_at).toLocaleDateString("id-ID")
          : "-"}
      </Text>
    ),
  },
];

export default columnsReports;
