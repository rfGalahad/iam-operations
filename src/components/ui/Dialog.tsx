import { useEffect, useId, useRef, type ReactNode } from "react";

interface DialogProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
}

export function Dialog({ open, title, onClose, children }: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      onClose={onClose}
      // m-auto: Tailwind's preflight zeroes the margin the browser uses to center <dialog>
      className="m-auto max-h-[90vh] w-[min(640px,94vw)] overflow-y-auto rounded-[10px] border border-line bg-panel p-[18px] text-text backdrop:bg-black/60"
    >
      {open && (
        <>
          <h2 id={titleId} className="mb-3 text-lg font-semibold">{title}</h2>
          {children}
        </>
      )}
    </dialog>
  );
}

export const DialogActions = ({ children }: { children: ReactNode }) => (
  <div className="mt-3.5 flex items-center justify-end gap-2">{children}</div>
);