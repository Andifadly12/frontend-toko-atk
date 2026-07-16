import Text from "../Text";

const columnsCustomers = [
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

export default columnsCustomers;
