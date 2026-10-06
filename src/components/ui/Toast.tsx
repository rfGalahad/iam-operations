export const Toast = ({ message }: { message: string }) =>
  message ? (
    <div
      role="status"
      className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-lg border border-line bg-panel2 px-3.5 py-2 text-[13px] shadow-lg"
    >
      {message}
    </div>
  ) : null;