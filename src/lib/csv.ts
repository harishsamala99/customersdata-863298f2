export function downloadCsv(filename: string, rows: Record<string, unknown>[]) {
  if (rows.length === 0) {
    const blob = new Blob([""], { type: "text/csv" });
    triggerDownload(blob, filename);
    return;
  }
  const headers = Object.keys(rows[0]);
  const escape = (v: unknown) => {
    if (v === null || v === undefined) return "";
    const s = String(v).replace(/"/g, '""');
    return /[",\n]/.test(s) ? `"${s}"` : s;
  };
  const lines = [
    headers.join(","),
    ...rows.map((r) => headers.map((h) => escape(r[h])).join(",")),
  ];
  const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8" });
  triggerDownload(blob, filename);
}

function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export function exportPdf(title: string, rows: Record<string, unknown>[]) {
  // Lightweight PDF-ish export via printable HTML window
  const w = window.open("", "_blank");
  if (!w) return;
  const headers = rows.length ? Object.keys(rows[0]) : [];
  w.document.write(`<!doctype html><html><head><title>${title}</title>
    <style>
      body{font-family:Inter,system-ui,sans-serif;padding:32px;color:#111}
      h1{font-family:'Playfair Display',serif;color:#8a6a1f;border-bottom:2px solid #c9a24a;padding-bottom:8px}
      table{width:100%;border-collapse:collapse;margin-top:16px;font-size:12px}
      th,td{border-bottom:1px solid #e5e5e5;padding:8px;text-align:left}
      th{background:#f7f3e8;color:#5a4413;text-transform:uppercase;letter-spacing:.05em;font-size:10px}
    </style></head><body>
    <h1>${title}</h1>
    <table><thead><tr>${headers.map((h) => `<th>${h}</th>`).join("")}</tr></thead>
    <tbody>${rows
      .map(
        (r) =>
          `<tr>${headers.map((h) => `<td>${r[h] ?? ""}</td>`).join("")}</tr>`,
      )
      .join("")}</tbody></table>
    <script>window.onload=()=>window.print()</script>
    </body></html>`);
  w.document.close();
}
