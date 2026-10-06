const quote = (value: string) => `"${value.replace(/"/g, '""')}"`;

export function downloadCsv(filename: string, rows: string[][]) {
  const text = "\uFEFF" + rows.map(row => row.map(quote).join(",")).join("\r\n");
  const url = URL.createObjectURL(new Blob([text], { type: "text/csv" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 500);
}