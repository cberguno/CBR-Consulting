"use client";

import {
  createContext,
  createElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { analyzeJournal, coachOnObservation, replyToTeacher } from "./agent";
import {
  EMPTY_STATE,
  exportState,
  loadState,
  newId,
  nowIso,
  officialTeiState,
  sampleState,
  saveState,
  todayDateInput,
} from "./storage";
import type {
  ChatMessage,
  CoachState,
  FocusArea,
  ImprovementGoal,
  Observation,
} from "./types";

type CoachStore = CoachState & {
  hydrated: boolean;
  addObservation: (
    input: Omit<Observation, "id" | "createdAt">
  ) => Observation;
  updateObservation: (id: string, patch: Partial<Observation>) => void;
  deleteObservation: (id: string) => void;
  addGoal: (input: Omit<ImprovementGoal, "id" | "createdAt">) => ImprovementGoal;
  updateGoal: (id: string, patch: Partial<ImprovementGoal>) => void;
  deleteGoal: (id: string) => void;
  pinFocus: (focus: FocusArea | null) => void;
  sendTeacherMessage: (text: string) => ChatMessage;
  addCoachMessage: (body: string) => void;
  loadSample: () => void;
  loadTeiSpot: () => void;
  clearJournal: () => void;
  downloadBackup: () => void;
  importBackup: (state: CoachState) => void;
};

const CoachContext = createContext<CoachStore | null>(null);

export function CoachProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CoachState>(EMPTY_STATE);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setState(loadState());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveState(state);
  }, [state, hydrated]);

  const update = useCallback((updater: (prev: CoachState) => CoachState) => {
    setState((prev) => updater(prev));
  }, []);

  const addObservation = useCallback(
    (input: Omit<Observation, "id" | "createdAt">) => {
      const observation: Observation = {
        ...input,
        id: newId("obs"),
        createdAt: nowIso(),
      };
      update((prev) => {
        const next = {
          ...prev,
          observations: [observation, ...prev.observations],
        };
        const coachNote: ChatMessage = {
          id: newId("msg"),
          role: "coach",
          createdAt: nowIso(),
          body: coachOnObservation(observation),
        };
        return { ...next, messages: [...prev.messages, coachNote] };
      });
      return observation;
    },
    [update]
  );

  const updateObservation = useCallback(
    (id: string, patch: Partial<Observation>) => {
      update((prev) => ({
        ...prev,
        observations: prev.observations.map((o) =>
          o.id === id ? { ...o, ...patch } : o
        ),
      }));
    },
    [update]
  );

  const deleteObservation = useCallback(
    (id: string) => {
      update((prev) => ({
        ...prev,
        observations: prev.observations.filter((o) => o.id !== id),
      }));
    },
    [update]
  );

  const addGoal = useCallback(
    (input: Omit<ImprovementGoal, "id" | "createdAt">) => {
      const goal: ImprovementGoal = {
        ...input,
        id: newId("goal"),
        createdAt: nowIso(),
      };
      update((prev) => ({ ...prev, goals: [goal, ...prev.goals] }));
      return goal;
    },
    [update]
  );

  const updateGoal = useCallback(
    (id: string, patch: Partial<ImprovementGoal>) => {
      update((prev) => ({
        ...prev,
        goals: prev.goals.map((g) => (g.id === id ? { ...g, ...patch } : g)),
      }));
    },
    [update]
  );

  const deleteGoal = useCallback(
    (id: string) => {
      update((prev) => ({
        ...prev,
        goals: prev.goals.filter((g) => g.id !== id),
        observations: prev.observations.map((o) => ({
          ...o,
          linkedGoalIds: o.linkedGoalIds.filter((gid) => gid !== id),
        })),
      }));
    },
    [update]
  );

  const pinFocus = useCallback(
    (focus: FocusArea | null) => {
      update((prev) => ({ ...prev, pinnedFocus: focus }));
    },
    [update]
  );

  const sendTeacherMessage = useCallback(
    (text: string) => {
      const teacher: ChatMessage = {
        id: newId("msg"),
        role: "teacher",
        createdAt: nowIso(),
        body: text.trim(),
      };
      let coach: ChatMessage = {
        id: newId("msg"),
        role: "coach",
        createdAt: nowIso(),
        body: "Tell me a little more about what you noticed.",
      };
      update((prev) => {
        const reply = replyToTeacher(text, prev);
        const relatedGoal = prev.goals.find(
          (g) =>
            g.status !== "achieved" &&
            reply.draft?.focusArea &&
            g.focusArea === reply.draft.focusArea
        );
        coach = {
          ...reply.message,
          suggestedObservation: {
            noticed: text.trim(),
            ...reply.draft,
            linkedGoalIds: relatedGoal ? [relatedGoal.id] : [],
          },
        };
        return { ...prev, messages: [...prev.messages, teacher, coach] };
      });
      return coach;
    },
    [update]
  );

  const addCoachMessage = useCallback(
    (body: string) => {
      update((prev) => ({
        ...prev,
        messages: [
          ...prev.messages,
          { id: newId("msg"), role: "coach", createdAt: nowIso(), body },
        ],
      }));
    },
    [update]
  );

  const loadSample = useCallback(() => {
    setState(sampleState());
  }, []);

  const loadTeiSpot = useCallback(() => {
    setState(officialTeiState());
  }, []);

  const clearJournal = useCallback(() => {
    setState(structuredClone(EMPTY_STATE));
  }, []);

  const downloadBackup = useCallback(() => {
    exportState(state);
  }, [state]);

  const importBackup = useCallback((next: CoachState) => {
    setState(next);
  }, []);

  const value = useMemo<CoachStore>(
    () => ({
      ...state,
      hydrated,
      addObservation,
      updateObservation,
      deleteObservation,
      addGoal,
      updateGoal,
      deleteGoal,
      pinFocus,
      sendTeacherMessage,
      addCoachMessage,
      loadSample,
      loadTeiSpot,
      clearJournal,
      downloadBackup,
      importBackup,
    }),
    [
      state,
      hydrated,
      addObservation,
      updateObservation,
      deleteObservation,
      addGoal,
      updateGoal,
      deleteGoal,
      pinFocus,
      sendTeacherMessage,
      addCoachMessage,
      loadSample,
      loadTeiSpot,
      clearJournal,
      downloadBackup,
      importBackup,
    ]
  );

  return createElement(CoachContext.Provider, { value }, children);
}

export function useCoachStore() {
  const ctx = useContext(CoachContext);
  if (!ctx) {
    throw new Error("useCoachStore must be used inside CoachProvider");
  }
  return ctx;
}

export function useInsights() {
  const { observations, goals, pinnedFocus, messages } = useCoachStore();
  return analyzeJournal({ observations, goals, pinnedFocus, messages });
}

export function defaultObservationDraft(): Omit<
  Observation,
  "id" | "createdAt"
> {
  return {
    date: todayDateInput(),
    timeOfDay: "morning",
    subject: "other",
    grouping: "whole-group",
    source: "self",
    focusArea: "engagement",
    noticed: "",
    glow: "",
    grow: "",
    nextStep: "",
    energy: 3,
    linkedGoalIds: [],
  };
}

export function defaultGoalDraft(): Omit<ImprovementGoal, "id" | "createdAt"> {
  return {
    title: "",
    focusArea: "management",
    why: "",
    currentPractice: "",
    targetPractice: "",
    successLooksLike: "",
    status: "not-started",
    targetDate: "",
  };
}

export function withoutMeta<T extends { id: string; createdAt: string }>(
  item: T
): Omit<T, "id" | "createdAt"> {
  const rest = { ...item };
  delete (rest as Partial<T>).id;
  delete (rest as Partial<T>).createdAt;
  return rest;
}
