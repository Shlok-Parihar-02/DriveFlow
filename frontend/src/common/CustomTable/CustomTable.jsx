const CustomTable = ({
    columns = [],
    rows = [],
    rowKey = "id",
    caption,
    emptyMessage = "No records to display.",
    loading = false,
    className = "",
}) => {
    const getRowKey = (row, index) =>
        typeof rowKey === "function" ? rowKey(row, index) : row?.[rowKey] ?? index

    return (
        <div className={`w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm ${className}`}>
            <div className="overflow-x-auto">
                <table
                    aria-busy={loading}
                    className="w-full min-w-[32rem] border-collapse text-left text-sm"
                >
                    {caption && <caption className="sr-only">{caption}</caption>}
                    <thead>
                        <tr className="border-b border-slate-200 bg-slate-50/80">
                            {columns.map((column) => (
                                <th
                                    key={column.key}
                                    scope="col"
                                    className={`whitespace-nowrap px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-slate-500 ${
                                        column.align === "right" ? "text-right" : ""
                                    } ${column.headerClassName ?? ""}`}
                                >
                                    {column.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {loading ? (
                            Array.from({ length: 3 }, (_, rowIndex) => (
                                <tr key={`loading-${rowIndex}`} aria-hidden="true">
                                    {columns.map((column, columnIndex) => (
                                        <td key={column.key} className="px-5 py-4">
                                            <div
                                                className={`h-4 animate-pulse rounded bg-slate-100 motion-reduce:animate-none ${
                                                    columnIndex === 0 ? "w-3/4" : "w-1/2"
                                                }`}
                                            />
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : rows.length > 0 ? (
                            rows.map((row, rowIndex) => (
                                <tr
                                    key={getRowKey(row, rowIndex)}
                                    className="transition-colors duration-150 ease-out hover:bg-sky-50/60 motion-reduce:transition-none"
                                >
                                    {columns.map((column) => (
                                        <td
                                            key={column.key}
                                            className={`px-5 py-4 text-slate-700 ${
                                                column.align === "right" ? "text-right" : ""
                                            } ${column.className ?? ""}`}
                                        >
                                            {column.render
                                                ? column.render(row, rowIndex)
                                                : row?.[column.key]}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={Math.max(columns.length, 1)}
                                    className="px-5 py-12 text-center text-sm text-slate-500"
                                >
                                    {emptyMessage}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="h-0.5 bg-gradient-to-r from-sky-100 via-sky-400 to-sky-100" />
        </div>
    )
}

export default CustomTable