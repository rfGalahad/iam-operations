import { useState } from "react";

import { usePersistentState } from "../../../hooks/usePersistentState";

import { APPS_KEY, DEFAULT_CATEGORY, emptyApplication } from "../constants";
import { sampleApplications } from "../sampleApplications";
import type { Application, SupportContact } from "../types";


export function useApplications() {

  const [apps, setApps] = usePersistentState<Application[]>(APPS_KEY, sampleApplications);
  const [selectedName, setSelectedName] = useState<string>(() => apps[0]?.name ?? "");
  const [category, setCategory] = useState<string>(DEFAULT_CATEGORY);

  const selected = apps.find(a => a.name === selectedName);

  const select = (name: string) => {
    setSelectedName(name);
    setCategory(DEFAULT_CATEGORY);
  };

  /** Applies a change to the selected app, based on its latest state. */
  const patchSelected = (fn: (app: Application) => Partial<Application>) => {
    if (!selected) return;
    const name = selected.name;
    setApps(as => as.map(a => (a.name === name ? { ...a, ...fn(a) } : a)));
  };

  /** Returns false if the name is empty or already used. */
  const add = (rawName: string): boolean => {
    const name = rawName.trim();
    if (!name || apps.some(a => a.name.toLowerCase() === name.toLowerCase())) return false;
    setApps(as => [...as, emptyApplication(name)]);
    select(name);
    return true;
  };

  const addStep = (step: string) => {
    const text = step.trim();
    if (!text) return;
    patchSelected(a => ({
      categories: a.categories.map(c => (c.name === category ? { ...c, steps: [...c.steps, text] } : c)),
    }));
  };

  const removeStep = (idx: number) =>
    patchSelected(a => ({
      categories: a.categories.map(c =>
        c.name === category ? { ...c, steps: c.steps.filter((_, i) => i !== idx) } : c,
      ),
    }));

  const addSupport = (s: SupportContact) => {
    if (!s.name.trim()) return;
    patchSelected(a => ({ support: [...a.support, { name: s.name.trim(), contact: s.contact.trim() }] }));
  };

  const removeSupport = (idx: number) =>
    patchSelected(a => ({ support: a.support.filter((_, i) => i !== idx) }));

  const reset = () => {
    setApps(sampleApplications);
    select(sampleApplications[0].name);
  };

  return {
    apps, selected, selectedName, category,
    setCategory, select, add, addStep, removeStep, addSupport, removeSupport, reset,
  };
}

export type ApplicationsStore = ReturnType<typeof useApplications>;