import Text from "../Text";

const Table = ({
  columns = [],
  data = [],
  actions,
  emptyMessage = "Data tidak tersedia",
}) => {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-slate-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-5 py-4 text-left text-sm font-semibold text-slate-600 ${
                    column.align === "right" ? "text-right" : "text-left"
                  }`}
                >
                  {column.label}
                </th>
              ))}

              {actions && (
                <th className="px-5 py-4 text-right text-sm font-semibold text-slate-600">
                  Aksi
                </th>
              )}
            </tr>
          </thead>

          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr
                  key={item.id || index}
                  className="border-t border-slate-100 hover:bg-slate-50"
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={`px-5 py-4 text-sm text-slate-700 ${
                        column.align === "right" ? "text-right" : "text-left"
                      }`}
                    >
                      {column.render
                        ? column.render(item, index)
                        : item[column.key]}
                    </td>
                  ))}

                  {actions && (
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        {actions(item)}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={actions ? columns.length + 1 : columns.length}
                  className="px-5 py-10 text-center"
                >
                  <Text color="muted">{emptyMessage}</Text>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;