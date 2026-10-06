export interface ImportRow { no: string; app: string; cat: string; sub: string; req: string; pri: string }
export type ParseResult = { error: string } | { rows: ImportRow[]; missing: string[] };

type Col = "no" | "app" | "cat" | "sub" | "req" | "pri";
const COLS: Record<Col, string[]> = {
  no: ["ticket number", "ticket", "ritm", "ritm number", "ticket no"],
  app: ["application", "app"],
  cat: ["category"],
  sub: ["sub-category", "sub category", "subcategory"],
  req: ["requester", "requestor", "requested by"],
  pri: ["priority"],
};
const LABELS: Record<Exclude<Col, "no">, string> = {
  app: "Application", cat: "Category", sub: "Sub-Category", req: "Requester", pri: "Priority",
};

export function parseCsv(input: string): string[][] {
  const s = input.replace(/^\uFEFF/, "");
  const first = s.split("\n")[0];
  const delim = [",", "\t", ";"].sort((a, b) => first.split(b).length - first.split(a).length)[0];
  const rows: string[][] = [];
  let row: string[] = [], cell = "", quoted = false;
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (quoted) {
      if (ch === '"') { if (s[i + 1] === '"') { cell += '"'; i++; } else quoted = false; }
      else cell += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === delim) { row.push(cell); cell = ""; }
    else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && s[i + 1] === "\n") i++;
      row.push(cell); rows.push(row); row = []; cell = "";
    } else cell += ch;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  return rows;
}

export async function readRows(file: File): Promise<unknown[][]> {
  if (/\.(csv|txt)$/i.test(file.name)) return parseCsv(await file.text());
  const XLSX = await import("xlsx");
  const wb = XLSX.read(await file.arrayBuffer(), { type: "array" });
  return XLSX.utils.sheet_to_json<unknown[]>(wb.Sheets[wb.SheetNames[0]], { header: 1, raw: false, defval: "" });
}

export function parseRows(input: unknown[][]): ParseResult {
  const R = input.filter(r => r.some(c => String(c).trim()));
  if (!R.length) return { error: "The file is empty." };
  const head = R[0].map(h => String(h).trim().toLowerCase());
  const ix = Object.fromEntries(
    (Object.keys(COLS) as Col[]).map(k => [k, head.findIndex(h => COLS[k].includes(h))]),
  ) as Record<Col, number>;
  if (ix.no < 0) return { error: 'No "Ticket Number" column found. Check the header row.' };

  const get = (r: unknown[], k: Col) => (ix[k] < 0 ? "" : String(r[ix[k]] ?? "").trim());
  const map = new Map<string, ImportRow>();
  R.slice(1).forEach(r => {
    const no = get(r, "no");
    if (no && !map.has(no)) {
      map.set(no, { no, app: get(r, "app"), cat: get(r, "cat"), sub: get(r, "sub"), req: get(r, "req"), pri: get(r, "pri") });
    }
  });
  const missing = (Object.keys(LABELS) as (keyof typeof LABELS)[]).filter(k => ix[k] < 0).map(k => LABELS[k]);
  return { rows: [...map.values()], missing };
}

const q = (v: string) => `"${v.replace(/"/g, '""')}"`;
export function downloadTemplate() {
  const rows = [
    ["Ticket Number", "Application", "Category", "Sub-Category", "Requester", "Priority"],
    ["RITM0012400", "Active Directory", "Account Creation", "New hire", "J. Cruz", "Medium"],
    ["RITM0012401", "Workday", "Account Deletion", "Offboarding", "HR Ops", "High"],
  ];
  const url = URL.createObjectURL(new Blob(["\uFEFF" + rows.map(r => r.map(q).join(",")).join("\r\n")], { type: "text/csv" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = "ticket-import-template.csv";
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 500);
}