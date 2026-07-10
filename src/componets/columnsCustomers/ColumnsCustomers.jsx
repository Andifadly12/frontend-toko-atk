import Badge from "../badge";
import Text from "../Text";

const ColumnsCustomers = [
  {
    key: "name",
    label: "Customer",
    render: item => <Text weight="semibold">{item.name}</Text>,
  },
  {
    key: "phone",
    label: "Telepon",
    render: item => (
      <Text size="sm" color="muted">
        {item.phone}
      </Text>
    ),
  },
  {
    key: "email",
    label: "Email",
    render: item => (
      <Text size="sm" color="muted">
        {item.email || "-"}
      </Text>
    ),
  },
  {
    key: "customer_type",
    label: "Tipe",
    render: item => (
      <Badge
        variant={
          item.customer_type === "reseller"
            ? "primary"
            : item.customer_type === "corporate"
              ? "warning"
              : "success"
        }
      >
        {item.customer_type}
      </Badge>
    ),
  },
  {
    key: "status",
    label: "Status",
    render: item => (
      <Badge variant={item.status === "active" ? "success" : "danger"}>
        {item.status}
      </Badge>
    ),
  },
];

export default ColumnsCustomers;
