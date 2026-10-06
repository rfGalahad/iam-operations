import type { SupportContact, Credential } from "./types";

export const splitLines = (text: string) =>
  text.split("\n").map(line => line.trim()).filter(Boolean);

const splitColumns = (line: string) => line.split("|").map(part => part.trim());

export const parseContacts = (text: string): SupportContact[] =>
  splitLines(text).map(line => {
    const [name = "", contact = ""] = splitColumns(line);
    return { name, contact };
  });

export const parseCredentials = (text: string): Credential[] =>
  splitLines(text).map(line => {
    const parts = splitColumns(line);
    if (parts.length === 2) return { label: parts[0], username: "", password: parts[1] };
    return { label: parts[0] ?? "", username: parts[1] ?? "", password: parts.slice(2).join("|") };
  });

export const formatContacts = (contacts: SupportContact[]) =>
  contacts.map(contact => [contact.name, contact.contact].join(" | ")).join("\n");

export const formatCredentials = (credentials: Credential[]) =>
  credentials.map(credential => [credential.label, credential.username, credential.password].join(" | ")).join("\n");