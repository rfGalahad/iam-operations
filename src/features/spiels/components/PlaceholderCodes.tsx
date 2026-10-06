import { PLACEHOLDERS } from "../constants";

export const PlaceholderCodes = () => (
  <>
    {PLACEHOLDERS.map(name => (
      <code key={name} className="mr-1 rounded bg-panel2 px-1">{`{{${name}}}`}</code>
    ))}
  </>
);