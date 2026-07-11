import Badge from "../badge";
import Text from "../Text";
import formatRupiah from "../../utils/formatRupiah";

const ColumnsReports = [
  {
    key: "date",
    label: "Tanggal",
    render: item => (
      <Text size="sm" color="muted">
        {item.date}
      </Text>
    ),
  },
  {
    key: "invoice",
    label: "Invoice",
    render: item => <Text weight="semibold">{item.invoice}</Text>,
  },
  {
    key: "type",
    label: "Tipe",
    render: item => (
      <Badge variant={item.type === "sale" ? "success" : "warning"}>
        {item.type === "sale" ? "Penjualan" : "Pembelian"}
      </Badge>
    ),
  },
  {
    key: "description",
    label: "Keterangan",
    render: item => (
      <Text size="sm" color="muted">
        {item.description}
      </Text>
    ),
  },
  {
    key: "total",
    label: "Total",
    render: item => (
      <Text size="sm" weight="semibold" color="primary">
        {formatRupiah(item.total)}
      </Text>
    ),
  },
  {
    key: "status",
    label: "Status",
    render: item => (
      <Badge
        variant={
          item.status === "completed" || item.status === "paid"
            ? "success"
            : "danger"
        }
      >
        {item.status}
      </Badge>
    ),
  },
];

export default ColumnsReports;
