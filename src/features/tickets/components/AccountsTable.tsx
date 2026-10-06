import { Button, Hint, RowButton, TextInput } from "@/components/ui/index";
import type { Account } from "../types";

interface Props {
  accounts: Account[];
  onAdd: () => void;
  onPaste: () => void;
  onChange: <K extends keyof Account>(i: number, key: K, value: Account[K]) => void;
  onRemove: (i: number) => void;
}

const th = "p-1 text-left text-[11px] font-semibold uppercase tracking-[0.4px] text-sub";

export function AccountsTable({ accounts, onAdd, onPaste, onChange, onRemove }: Props) {
  return (
    <>
      {accounts.length ? (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className={th}>User ID</th><th className={th}>Name</th>
                <th className={th}>Roles / profile</th><th className={th}>Svc</th><th />
              </tr>
            </thead>
            <tbody>
              {accounts.map((a, i) => (
                <tr key={i}>
                  <td className="px-0.75 py-0.5">
                    <TextInput 
                      className="font-mono" 
                      value={a.u} 
                      onChange={e => onChange(i, "u", e.target.value)} 
                    />
                  </td>
                  <td className="px-0.75 py-0.5">
                    <TextInput value={a.n} onChange={e => onChange(i, "n", e.target.value)} />
                  </td>
                  <td className="px-0.75 py-0.5">
                    <TextInput placeholder="Role / profile" value={a.r} onChange={e => onChange(i, "r", e.target.value)} />
                  </td>
                  <td className="px-0.75 py-0.5 text-center">
                    <input type="checkbox" aria-label="Service account" checked={a.s} onChange={e => onChange(i, "s", e.target.checked)} className="accent-accent" />
                  </td>
                  <td className="px-0.75 py-0.5">
                    <RowButton 
                      aria-label="Remove account" 
                      onClick={() => onRemove(i)}>&times;
                    </RowButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <Hint>No accounts yet. Each account becomes one row in the Accounts Log.</Hint>
      )}
      <div className="mt-2 flex gap-2">
        <Button size="sm" onClick={onAdd}>Add account</Button>
        <Button size="sm" onClick={onPaste}>Paste list from Excel</Button>
      </div>
    </>
  );
}