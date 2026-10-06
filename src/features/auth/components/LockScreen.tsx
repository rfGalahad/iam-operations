import { useState, type FormEvent } from "react";
import { Button, Field, Hint, RowButton, TextInput } from "@/components/ui/index";

interface LockScreenProps {
  hasPassword: boolean;
  onUnlock: (password: string) => Promise<string | null>;
  onCreatePassword: (password: string, confirmation: string) => Promise<string | null>;
  onForgot: () => void;
}

export function LockScreen({ hasPassword, onUnlock, onCreatePassword, onForgot }: LockScreenProps) {
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [error, setError] = useState("");
  const [isBusy, setIsBusy] = useState(false);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setIsBusy(true);
    const problem = hasPassword ? await onUnlock(password) : await onCreatePassword(password, confirmation);
    setIsBusy(false);
    if (problem) setError(problem);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-bg p-4">
      <form onSubmit={submit} className="w-[min(360px,100%)] rounded-[10px] border border-line bg-panel p-5.5">
        <h2 className="mb-1 text-lg font-semibold">{hasPassword ? "Unlock IAM Ticket Desk" : "Set a password"}</h2>
        <div className="mb-3">
          <Hint>
            {hasPassword
              ? "Enter your password to continue."
              : "Choose a password for this desk. Use at least 4 characters."}
          </Hint>
        </div>

        <div className="space-y-2.5">
          <Field label="Password">
            <TextInput
              type="password"
              autoComplete="off"
              autoFocus
              value={password}
              onChange={event => { setPassword(event.target.value); setError(""); }}
            />
          </Field>
          {!hasPassword && (
            <Field label="Confirm password">
              <TextInput
                type="password"
                autoComplete="off"
                value={confirmation}
                onChange={event => { setConfirmation(event.target.value); setError(""); }}
              />
            </Field>
          )}
        </div>

        <div role="alert" className="min-h-4.5 pt-1 text-xs font-semibold text-danger">{error}</div>
        <Button type="submit" variant="primary" className="mt-1.5 w-full" disabled={isBusy}>
          {hasPassword ? "Unlock" : "Save password and open"}
        </Button>

        {hasPassword && (
          <div className="mt-3.5 text-center">
            <RowButton onClick={onForgot}>Forgot password</RowButton>
          </div>
        )}
      </form>
    </div>
  );
}