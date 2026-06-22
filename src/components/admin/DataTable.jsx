const DataTable = ({ columns, data, onEdit, onDelete }) => {

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-3">
        <span className="text-5xl">📭</span>
        <p className="text-sm text-[#A8957B]">No data found</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-[#EDE5D4]">
      <table className="w-full">

        {/* Head */}
        <thead>
          <tr className="bg-[#1A160E]">
            {columns.map((col) => (
              <th key={col.key}
                className="px-5 py-3.5 text-left text-xs font-semibold
                  text-[#C9A84C] uppercase tracking-widest whitespace-nowrap">
                {col.label}
              </th>
            ))}
            {(onEdit || onDelete) && (
              <th className="px-5 py-3.5 text-left text-xs font-semibold
                text-[#C9A84C] uppercase tracking-widest">
                Actions
              </th>
            )}
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {data.map((row, i) => (
            <tr key={row.id || i}
              className={`border-t border-[#F0E8D5] transition-colors duration-150
                ${i % 2 === 0 ? "bg-white" : "bg-[#FAF7F0]"}
                hover:bg-[#F5F0E8]`}>

              {columns.map((col) => (
                <td key={col.key}
                  className="px-5 py-3.5 text-sm text-[#5C5040] whitespace-nowrap">
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}

              {/* Actions */}
              {(onEdit || onDelete) && (
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2">
                    {onEdit && (
                      <button
                        onClick={() => onEdit(row)}
                        className="text-xs bg-[#F2DFA0] text-[#7A5E1A]
                          px-3 py-1.5 rounded-lg hover:bg-[#C9A84C]
                          hover:text-[#1A160E] transition-all duration-200
                          font-medium"
                      >
                        Edit ✎
                      </button>
                    )}
                    {onDelete && (
                      <button
                        onClick={() => onDelete(row)}
                        className="text-xs bg-red-50 text-red-400
                          px-3 py-1.5 rounded-lg hover:bg-red-400
                          hover:text-white transition-all duration-200
                          font-medium"
                      >
                        Delete ✕
                      </button>
                    )}
                  </div>
                </td>
              )}

            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
};

export default DataTable;