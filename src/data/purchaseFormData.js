const purchaseFormData = [
  {
    name: "invoice_number",
    label: "Nomor Invoice",
    type: "text",
    placeholder: "Contoh: INV-001",
    required: true,
  },
  {
    name: "product_name",
    label: "Nama Produk",
    type: "text",
    placeholder: "Contoh: Pulpen Pilot",
    required: true,
  },
  {
    name: "supplier",
    label: "Supplier",
    type: "select",
    placeholder: "Pilih supplier",
    required: true,
    options: [
      {
        label: "PT Sumber ATK",
        value: "PT Sumber ATK",
      },
      {
        label: "CV Berkah Jaya",
        value: "CV Berkah Jaya",
      },
      {
        label: "UD Cahaya Office",
        value: "UD Cahaya Office",
      },
    ],
  },
  {
    name: "quantity",
    label: "Jumlah Pembelian",
    type: "number",
    placeholder: "Contoh: 50",
    required: true,
  },
  {
    name: "purchase_price",
    label: "Harga Beli Satuan",
    type: "number",
    placeholder: "Contoh: 2500",
    required: true,
  },
  {
    name: "purchase_date",
    label: "Tanggal Pembelian",
    type: "date",
    required: true,
  },
  {
    name: "status",
    label: "Status Pembayaran",
    type: "select",
    placeholder: "Pilih status",
    required: true,
    options: [
      {
        label: "Paid",
        value: "paid",
      },
      {
        label: "Unpaid",
        value: "unpaid",
      },
    ],
  },
];

export default purchaseFormData;
