import Badge from "../badge";
import Text from "../Text";

const columnsSuppliers = [
  {
    key: "name",
    label: "Supplier",
    render: item => <Text weight="semibold">{item.name}</Text>,
  },
  {
    key: "contact_person",
    label: "Contact Person",
    render: item => (
      <Text size="sm" color="muted">
        {item.contact_person}
      </Text>
    ),
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
    key: "status",
    label: "Status",
    render: item => (
      <Badge variant={item.status === "active" ? "success" : "danger"}>
        {item.status}
      </Badge>
    ),
  },
];

export default columnsSuppliers;
