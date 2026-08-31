import { SAMPLE_STATE } from "./sample-data";
import { teiJournalState } from "./tei-berguno-2026";
import type { ChatMessage, CoachState } from "./types";

export const STORAGE_KEY = "cbr-classroom-coach-v1";

export const EMPTY_STATE: CoachState = {
  observations: [],
  goals: [],
  messages: [
    {
      id: "welcome",
      role: "coach",
      createdAt: new Date().toISOString(),
      body: "Hi. I am your classroom coach for 4th grade. You can load Tellesha Minter’s 2026–27 TEI spot and start from those four next steps, or tell me what you noticed after a lesson in plain language. Notes stay in this browser — first names or initials only.",
    },
  ],
  pinnedFocus: null,
};

export function newId(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

export function nowIso() {
  return new Date().toISOString();
}

export function todayDateInput() {
  const d = new Date();
  const month = `${d.getMonth() + 1}`.padStart(2, "0");
  const day = `${d.getDate()}`.padStart(2, "0");
  return `${d.getFullYear()}-${month}-${day}`;
}

function isState(value: unknown): value is CoachState {
  if (!value || typeof value !== "object") return false;
  const v = value as CoachState;
  return (
    Array.isArray(v.observations) &&
    Array.isArray(v.goals) &&
    Array.isArray(v.messages)
  );
}

export function loadState(): CoachState {
  if (typeof window === "undefined") return EMPTY_STATE;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return structuredClone(EMPTY_STATE);
    const parsed = JSON.parse(raw) as unknown;
    if (!isState(parsed)) return structuredClone(EMPTY_STATE);
    return {
      observations: parsed.observations,
      goals: parsed.goals,
      messages: parsed.messages.length
        ? parsed.messages
        : structuredClone(EMPTY_STATE.messages),
      pinnedFocus: parsed.pinnedFocus ?? null,
    };
  } catch {
    return structuredClone(EMPTY_STATE);
  }
}

export function saveState(state: CoachState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function sampleState(): CoachState {
  const clone = structuredClone(SAMPLE_STATE);
  const welcome: ChatMessage = {
    id: newId("msg"),
    role: "coach",
    createdAt: nowIso(),
    body: "I loaded a sample first week so you can see how observations, goals, and coaching talk to each other. Delete anything that is not yours, or load the official TEI spot instead.",
  };
  clone.messages = [...clone.messages, welcome];
  return clone;
}

export function officialTeiState(): CoachState {
  const clone = structuredClone(teiJournalState());
  const note: ChatMessage = {
    id: newId("msg"),
    role: "coach",
    createdAt: nowIso(),
    body: "Official TEI spot is in the journal. After your next Eureka block, log whether the sprint stayed in its box and how many pairs actually talked. That is the evidence this cycle needs.",
  };
  clone.messages = [...clone.messages, note];
  return clone;
}

export function exportState(state: CoachState) {
  const blob = new Blob([JSON.stringify(state, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `classroom-coach-${todayDateInput()}.json`;
  a.click();
  URL.revokeObjectURL(url);
}
