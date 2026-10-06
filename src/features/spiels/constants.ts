import { uid } from "@/lib/id";
import type { Spiel, SpielWhen } from "./types";

export const SPIELS_KEY = "iam_desk_spiels";
export const ANALYST_KEY = "iam_desk_analyst";

export const PLACEHOLDERS = [
  "requester", "ticket", "summary", "app", "category", "account", "analyst", "date", "pending",
];

const createSpiel = (name: string, when: SpielWhen, lines: string[]): Spiel => ({
  id: uid(),
  name,
  when,
  appId: "",
  body: lines.join("\n"),
});

export const SEED_SPIELS: Spiel[] = [
  createSpiel("Completion", "Closed", [
    "Hi {{requester}},",
    "",
    "Your request {{ticket}} ({{summary}}) for {{app}} has been completed.",
    "Account / User ID: {{account}}",
    "",
    "Please verify your access. If anything does not work as expected, reply to this ticket and we will assist.",
    "",
    "Thank you,",
    "{{analyst}}",
  ]),
  createSpiel("Completion: password reset / unlock", "Closed", [
    "Hi {{requester}},",
    "",
    "Your {{app}} account ({{account}}) has been reset or unlocked as requested in {{ticket}}. Please sign in and change your password right away. If the problem continues, reply to this ticket.",
    "",
    "Thank you,",
    "{{analyst}}",
  ]),
  createSpiel("Cancellation: 3-strike rule", "Cancelled", [
    "Hi {{requester}},",
    "",
    "We followed up on {{ticket}} ({{summary}}) three times and did not receive the information needed to proceed. In line with our 3-strike rule, this request is now cancelled.",
    "",
    "If you still need it, please submit a new request with complete details.",
    "",
    "Regards,",
    "{{analyst}}",
  ]),
  createSpiel("Cancellation: no longer required", "Cancelled", [
    "Hi {{requester}},",
    "",
    "As confirmed, {{ticket}} ({{summary}}) is no longer required, so we are cancelling it. No changes were made to {{app}}.",
    "",
    "If you need this again, please submit a new request.",
    "",
    "Regards,",
    "{{analyst}}",
  ]),
  createSpiel("Cancellation: duplicate request", "Cancelled", [
    "Hi {{requester}},",
    "",
    "{{ticket}} duplicates an existing request, so we are cancelling it to avoid conflicting changes. Please follow the original ticket for updates.",
    "",
    "Regards,",
    "{{analyst}}",
  ]),
  createSpiel("Pending: awaiting approval", "Pending", [
    "Hi {{requester}},",
    "",
    "We are working on {{ticket}} ({{summary}}) but are currently waiting for: {{pending}}.",
    "",
    "We will continue as soon as it is received. Please note the request may be cancelled if we do not hear back.",
    "",
    "Thank you,",
    "{{analyst}}",
  ]),
  createSpiel("Pending: need more information", "Pending", [
    "Hi {{requester}},",
    "",
    "To process {{ticket}} for {{app}}, we need the following details:",
    "- ",
    "- ",
    "",
    "Please reply to this ticket with the information so we can proceed.",
    "",
    "Thank you,",
    "{{analyst}}",
  ]),
  createSpiel("Follow-up reminder", "Pending", [
    "Hi {{requester}},",
    "",
    "This is a follow-up on {{ticket}} ({{summary}}). We are still waiting for: {{pending}}.",
    "",
    "Please respond at your earliest convenience so we can complete your request.",
    "",
    "Thank you,",
    "{{analyst}}",
  ]),
];