import Text from "../Text";

const columnsSuppliers = [
  {
    key: "name",
    label: "Supplier",
    render: item => <Text weight="semibold">{item.name}</Text>,
  },
  {
    key: "phone",
    label: "Telepon",
    render: item => (
      <Text size="sm" color="muted">
        {item.phone || "-"}
      </Text>
    ),
  },
  {
    key: "address",
    label: "Alamat",
    render: item => (
      <Text size="sm" color="muted">
        {item.address || "-"}
      </Text>
    ),
  },
  {
    key: "created_at",
    label: "Dibuat",
    render: item => (
      <Text size="sm" color="muted">
        {item.created_at
          ? new Date(item.created_at).toLocaleDateString("id-ID")
          : "-"}
      </Text>
    ),
  },
];

export default columnsSuppliers;
