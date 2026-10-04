import { Section } from "@/components/ui";

interface Props {
  dos: string[];
  donts: string[];
}

function Column({ title, items, tone }: { title: string; items: string[]; tone: "text-ok" | "text-danger" }) {
  return (
    <div className="min-w-[220px] flex-1">
      <h4 className={`mb-2 mt-0 text-xs font-semibold uppercase tracking-[0.4px] ${tone}`}>{title}</h4>
      {items.length === 0 ? (
        <p className="m-0 text-xs text-sub">None yet.</p>
      ) : (
        <ul className="m-0 list-disc pl-[18px] text-[13px] leading-[1.6] text-text">
          {items.map((d, i) => <li key={i}>{d}</li>)}
        </ul>
      )}
    </div>
  );
}

export default function DosDonts({ dos, donts }: Props) {
  return (
    <Section title="Do's & Don'ts">
      <div className="mt-2.5 flex flex-wrap gap-4">
        <Column title="Do" items={dos} tone="text-ok" />
        <Column title="Don't" items={donts} tone="text-danger" />
      </div>
    </Section>
  );
}