"use client";

import { useMemo, useRef, useState, type ReactNode } from "react";
import {
  BookOpen,
  ClipboardList,
  Download,
  MessageCircle,
  Plus,
  Sparkles,
  Target,
  Trash2,
  Upload,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { weekDots } from "@/lib/coach/agent";
import {
  FOCUS_AREA_META,
  GOAL_STATUS_META,
  PRIVACY_NOTE,
  SOURCE_LABELS,
  STARTER_GOALS,
  SUBJECT_LABELS,
  TIME_LABELS,
} from "@/lib/coach/constants";
import type { CoachState, ImprovementGoal, Observation } from "@/lib/coach/types";
import {
  defaultGoalDraft,
  defaultObservationDraft,
  useCoachStore,
  useInsights,
} from "@/lib/coach/use-coach-store";
import { GoalForm } from "./goal-form";
import { ObservationForm } from "./observation-form";

export function CoachApp() {
  const store = useCoachStore();
  const insights = useInsights();
  const [tab, setTab] = useState("today");
  const [obsOpen, setObsOpen] = useState(false);
  const [goalOpen, setGoalOpen] = useState(false);
  const [obsDraft, setObsDraft] = useState(defaultObservationDraft);
  const [goalDraft, setGoalDraft] = useState(defaultGoalDraft);
  const [editingObs, setEditingObs] = useState<string | null>(null);
  const [editingGoal, setEditingGoal] = useState<string | null>(null);
  const [filter, setFilter] = useState("all");
  const fileRef = useRef<HTMLInputElement>(null);

  const week = weekDots(store.observations);
  const spotsThisWeek = week.reduce((sum, d) => sum + d.count, 0);

  function openNewObservation(seed?: Partial<Observation>) {
    setEditingObs(null);
    setObsDraft({ ...defaultObservationDraft(), ...seed });
    setObsOpen(true);
  }

  function openEditObservation(obs: Observation) {
    const { id: _id, createdAt: _createdAt, ...rest } = obs;
    setEditingObs(obs.id);
    setObsDraft(rest);
    setObsOpen(true);
  }

  function saveObservation() {
    if (!obsDraft.noticed.trim()) return;
    if (editingObs) {
      store.updateObservation(editingObs, obsDraft);
    } else {
      store.addObservation(obsDraft);
    }
    setObsOpen(false);
    setTab("observations");
  }

  function openNewGoal(seed?: Partial<ImprovementGoal>) {
    setEditingGoal(null);
    setGoalDraft({ ...defaultGoalDraft(), ...seed });
    setGoalOpen(true);
  }

  function openEditGoal(goal: ImprovementGoal) {
    const { id: _id, createdAt: _createdAt, ...rest } = goal;
    setEditingGoal(goal.id);
    setGoalDraft(rest);
    setGoalOpen(true);
  }

  function saveGoal() {
    if (!goalDraft.title.trim()) return;
    if (editingGoal) {
      store.updateGoal(editingGoal, goalDraft);
    } else {
      store.addGoal(goalDraft);
    }
    setGoalOpen(false);
    setTab("goals");
  }

  function handleImport(file: File | undefined) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result)) as CoachState;
        if (!Array.isArray(parsed.observations) || !Array.isArray(parsed.goals)) {
          return;
        }
        store.importBackup({
          observations: parsed.observations,
          goals: parsed.goals,
          messages: parsed.messages ?? [],
          pinnedFocus: parsed.pinnedFocus ?? null,
        });
      } catch {
        /* ignore invalid files */
      }
    };
    reader.readAsText(file);
  }

  const filteredObs = useMemo(() => {
    if (filter === "all") return store.observations;
    return store.observations.filter((o) => o.focusArea === filter);
  }, [filter, store.observations]);

  return (
    <div className="mx-auto max-w-6xl px-4 pb-20 pt-8">
      <header className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-brand-orange/30 bg-brand-orange/5 px-3 py-1 text-sm font-medium text-brand-orange">
            <Sparkles className="h-3.5 w-3.5" />
            4th grade classroom coach
          </div>
          <h1 className="text-balance text-3xl font-semibold tracking-tight md:text-5xl">
            Spot observations, then one thing to practice
          </h1>
          <p className="mt-3 max-w-2xl text-text-secondary">
            Capture a 90-second classroom note, keep the improvement goals next
            to it, and let the coach show you the pattern across the week.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => openNewObservation()}>
            <Plus className="h-4 w-4" />
            Log a spot
          </Button>
          <Button variant="outline" onClick={() => openNewGoal()}>
            <Target className="h-4 w-4" />
            New goal
          </Button>
        </div>
      </header>

      <section className="mt-8 grid gap-3 sm:grid-cols-3">
        <StatCard
          label="Spots this week"
          value={String(spotsThisWeek)}
          hint="Mon–Fri in this browser"
        />
        <StatCard
          label="Open goals"
          value={String(
            store.goals.filter((g) => g.status !== "achieved").length
          )}
          hint={`${store.goals.filter((g) => g.status === "practicing").length} practicing`}
        />
        <Card>
          <CardContent className="p-5">
            <div className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
              This week
            </div>
            <div className="mt-3 flex justify-between gap-2">
              {week.map((d) => (
                <div key={d.date} className="flex flex-1 flex-col items-center">
                  <span className="text-xs text-text-tertiary">{d.label}</span>
                  <span
                    className={`mt-1 flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold ${
                      d.count
                        ? "bg-success/15 text-success"
                        : "bg-muted text-text-tertiary"
                    }`}
                  >
                    {d.count || "·"}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <Tabs value={tab} onValueChange={setTab} className="mt-10">
        <TabsList className="grid h-auto w-full grid-cols-2 gap-1 p-1 md:grid-cols-4">
          <TabsTrigger value="today" className="gap-1.5 py-2">
            <Sparkles className="h-3.5 w-3.5" />
            Today
          </TabsTrigger>
          <TabsTrigger value="observations" className="gap-1.5 py-2">
            <ClipboardList className="h-3.5 w-3.5" />
            Observations
          </TabsTrigger>
          <TabsTrigger value="goals" className="gap-1.5 py-2">
            <Target className="h-3.5 w-3.5" />
            Improve
          </TabsTrigger>
          <TabsTrigger value="coach" className="gap-1.5 py-2">
            <MessageCircle className="h-3.5 w-3.5" />
            Coach
          </TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="mt-6">
          <div className="grid gap-6 lg:grid-cols-5">
            <div className="grid gap-4 lg:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Coach read</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-3">
                  {insights.map((insight) => (
                    <div
                      key={insight.id}
                      className="rounded-lg border border-border bg-muted/40 p-4"
                    >
                      <div className="text-xs font-semibold uppercase tracking-wider text-brand-orange">
                        {insight.kind}
                      </div>
                      <div className="mt-1 font-semibold">{insight.title}</div>
                      <p className="mt-1 text-sm text-text-secondary">
                        {insight.body}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex-row items-center justify-between space-y-0">
                  <CardTitle className="text-xl">Latest spots</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setTab("observations")}
                  >
                    See all
                  </Button>
                </CardHeader>
                <CardContent className="grid gap-3">
                  {store.observations.length === 0 ? (
                    <Empty
                      title="No spots yet"
                      body="Log one after your next lesson, or load a sample first week to see how the journal works."
                      action={
                        <div className="flex flex-wrap gap-2">
                          <Button onClick={() => openNewObservation()}>
                            Log a spot
                          </Button>
                          <Button variant="outline" onClick={store.loadSample}>
                            Load sample week
                          </Button>
                        </div>
                      }
                    />
                  ) : (
                    store.observations.slice(0, 3).map((obs) => (
                      <ObservationCard
                        key={obs.id}
                        observation={obs}
                        goals={store.goals}
                        onEdit={() => openEditObservation(obs)}
                        onDelete={() => store.deleteObservation(obs.id)}
                      />
                    ))
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">This week&apos;s focus</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-text-secondary">
                    Pin one lane so the week does not become twelve goals.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {Object.entries(FOCUS_AREA_META).map(([key, meta]) => {
                      const active = store.pinnedFocus === key;
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() =>
                            store.pinFocus(active ? null : (key as Observation["focusArea"]))
                          }
                          className={`rounded-full border px-3 py-1 text-xs font-medium ${
                            active
                              ? "border-brand-orange bg-brand-orange text-white"
                              : "border-border bg-white text-text-secondary hover:bg-muted"
                          }`}
                        >
                          {meta.label}
                        </button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Active goals</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-3">
                  {store.goals.length === 0 ? (
                    <Empty
                      title="No improvement goals yet"
                      body="Start from a 4th grade starter, or write your own."
                      action={
                        <Button variant="outline" onClick={() => setTab("goals")}>
                          Choose a starter
                        </Button>
                      }
                    />
                  ) : (
                    store.goals
                      .filter((g) => g.status !== "achieved")
                      .slice(0, 3)
                      .map((goal) => (
                        <GoalCard
                          key={goal.id}
                          goal={goal}
                          linkedCount={
                            store.observations.filter((o) =>
                              o.linkedGoalIds.includes(goal.id)
                            ).length
                          }
                          onEdit={() => openEditGoal(goal)}
                          onDelete={() => store.deleteGoal(goal.id)}
                        />
                      ))
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="observations" className="mt-6">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">
              <FilterChip
                active={filter === "all"}
                onClick={() => setFilter("all")}
                label="All"
              />
              {Object.entries(FOCUS_AREA_META).map(([key, meta]) => (
                <FilterChip
                  key={key}
                  active={filter === key}
                  onClick={() => setFilter(key)}
                  label={meta.label}
                />
              ))}
            </div>
            <Button onClick={() => openNewObservation()}>
              <Plus className="h-4 w-4" />
              Log a spot
            </Button>
          </div>
          <div className="grid gap-3">
            {filteredObs.length === 0 ? (
              <Card>
                <CardContent className="p-6">
                  <Empty
                    title="Nothing in this filter"
                    body="Log a spot or clear the filter."
                    action={
                      <Button onClick={() => openNewObservation()}>
                        Log a spot
                      </Button>
                    }
                  />
                </CardContent>
              </Card>
            ) : (
              filteredObs.map((obs) => (
                <ObservationCard
                  key={obs.id}
                  observation={obs}
                  goals={store.goals}
                  onEdit={() => openEditObservation(obs)}
                  onDelete={() => store.deleteObservation(obs.id)}
                />
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="goals" className="mt-6">
          <div className="mb-6 flex items-center justify-between">
            <p className="max-w-xl text-sm text-text-secondary">
              Keep it to two or three live goals. Link spots to them so you can
              see whether the practice is actually happening.
            </p>
            <Button onClick={() => openNewGoal()}>
              <Plus className="h-4 w-4" />
              New goal
            </Button>
          </div>

          {store.goals.length === 0 && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-xl">4th grade starters</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3 md:grid-cols-3">
                {STARTER_GOALS.map((starter) => (
                  <button
                    key={starter.title}
                    type="button"
                    onClick={() =>
                      openNewGoal({
                        ...starter,
                        status: "not-started",
                        targetDate: "",
                      })
                    }
                    className="rounded-xl border border-border bg-white p-4 text-left transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <Badge
                      variant="outline"
                      className={FOCUS_AREA_META[starter.focusArea].tint}
                    >
                      {FOCUS_AREA_META[starter.focusArea].label}
                    </Badge>
                    <div className="mt-3 font-semibold">{starter.title}</div>
                    <p className="mt-2 text-sm text-text-secondary">
                      {starter.why}
                    </p>
                  </button>
                ))}
              </CardContent>
            </Card>
          )}

          <div className="grid gap-3">
            {store.goals.map((goal) => (
              <GoalCard
                key={goal.id}
                goal={goal}
                linkedCount={
                  store.observations.filter((o) =>
                    o.linkedGoalIds.includes(goal.id)
                  ).length
                }
                expanded
                onEdit={() => openEditGoal(goal)}
                onDelete={() => store.deleteGoal(goal.id)}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="coach" className="mt-6">
          <CoachChat
            onSaveDraft={(draft) => openNewObservation(draft)}
            onImport={() => fileRef.current?.click()}
          />
        </TabsContent>
      </Tabs>

      <footer className="mt-12 flex flex-col gap-4 border-t border-border pt-6 text-sm text-text-secondary md:flex-row md:items-center md:justify-between">
        <p className="max-w-2xl">{PRIVACY_NOTE}</p>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={store.downloadBackup}>
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => fileRef.current?.click()}
          >
            <Upload className="h-4 w-4" />
            Import
          </Button>
          <Button variant="outline" size="sm" onClick={store.loadSample}>
            <BookOpen className="h-4 w-4" />
            Sample week
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={store.clearJournal}
            className="text-danger"
          >
            <Trash2 className="h-4 w-4" />
            Clear
          </Button>
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="application/json"
          className="hidden"
          onChange={(e) => {
            handleImport(e.target.files?.[0]);
            e.target.value = "";
          }}
        />
      </footer>

      <Dialog open={obsOpen} onOpenChange={setObsOpen}>
        <DialogContent className="max-h-[92vh] max-w-2xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingObs ? "Edit spot observation" : "Log a spot observation"}
            </DialogTitle>
            <DialogDescription>
              Fast and specific beats long and vague. You can finish this in a
              prep period.
            </DialogDescription>
          </DialogHeader>
          <ObservationForm
            draft={obsDraft}
            goals={store.goals}
            submitLabel={editingObs ? "Save changes" : "Save spot"}
            onChange={(patch) => setObsDraft((prev) => ({ ...prev, ...patch }))}
            onSubmit={saveObservation}
            onCancel={() => setObsOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={goalOpen} onOpenChange={setGoalOpen}>
        <DialogContent className="max-h-[92vh] max-w-2xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingGoal ? "Edit improvement goal" : "New improvement goal"}
            </DialogTitle>
            <DialogDescription>
              One visible practice. Two weeks. Evidence from your spots.
            </DialogDescription>
          </DialogHeader>
          <GoalForm
            draft={goalDraft}
            submitLabel={editingGoal ? "Save goal" : "Add goal"}
            onChange={(patch) => setGoalDraft((prev) => ({ ...prev, ...patch }))}
            onSubmit={saveGoal}
            onCancel={() => setGoalOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

function CoachChat({
  onSaveDraft,
  onImport,
}: {
  onSaveDraft: (draft: Partial<Observation>) => void;
  onImport: () => void;
}) {
  const store = useCoachStore();
  const [text, setText] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  function send() {
    const trimmed = text.trim();
    if (!trimmed) return;
    const lower = trimmed.toLowerCase();
    if (
      lower.startsWith("save") &&
      store.messages.at(-1)?.role === "coach"
    ) {
      const lastTeacher = [...store.messages]
        .reverse()
        .find((m) => m.role === "teacher");
      if (lastTeacher) {
        const reply = store.sendTeacherMessage(
          "Please treat my last note as ready to save. I will fill glow and grow in the form."
        );
        void reply;
        onSaveDraft({ noticed: lastTeacher.body });
        setText("");
        return;
      }
    }
    store.sendTeacherMessage(trimmed);
    setText("");
    requestAnimationFrame(() =>
      endRef.current?.scrollIntoView({ behavior: "smooth" })
    );
  }

  const lastTeacher = [...store.messages]
    .reverse()
    .find((m) => m.role === "teacher");

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle className="text-xl">Talk to the coach</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex max-h-[480px] flex-col gap-3 overflow-y-auto pr-1">
            {store.messages.map((msg) => (
              <div
                key={msg.id}
                className={`max-w-[92%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === "teacher"
                    ? "ml-auto bg-brand-orange text-white"
                    : "bg-muted text-text-primary"
                }`}
              >
                {msg.body}
              </div>
            ))}
            <div ref={endRef} />
          </div>
          <div className="mt-4 grid gap-2">
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="After recess it still took too long to start math. Two kids went to the sharpener again…"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
            />
            <div className="flex flex-wrap gap-2">
              <Button onClick={send}>Send</Button>
              {lastTeacher && (
                <Button
                  variant="outline"
                  onClick={() => onSaveDraft({ noticed: lastTeacher.body })}
                >
                  Save last note as a spot
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-xl">How to use this</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-text-secondary">
          <p>
            After a lesson, type what you saw in everyday language. The coach
            names the focus, offers one 4th-grade move, and helps you save it.
          </p>
          <p>
            Link spots to goals. That is the whole system: notice, practice,
            evidence.
          </p>
          <p>
            Notes live in this browser. Export a backup if you switch computers.
          </p>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={store.downloadBackup}>
              <Download className="h-4 w-4" />
              Export journal
            </Button>
            <Button variant="outline" size="sm" onClick={onImport}>
              <Upload className="h-4 w-4" />
              Import
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ObservationCard({
  observation,
  goals,
  onEdit,
  onDelete,
}: {
  observation: Observation;
  goals: ImprovementGoal[];
  onEdit: () => void;
  onDelete: () => void;
}) {
  const linked = goals.filter((g) => observation.linkedGoalIds.includes(g.id));
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge
            variant="outline"
            className={FOCUS_AREA_META[observation.focusArea].tint}
          >
            {FOCUS_AREA_META[observation.focusArea].label}
          </Badge>
          <Badge variant="secondary">
            {SUBJECT_LABELS[observation.subject]}
          </Badge>
          <span className="text-xs text-text-tertiary">
            {observation.date} · {TIME_LABELS[observation.timeOfDay]} ·{" "}
            {SOURCE_LABELS[observation.source]}
          </span>
        </div>
        <p className="mt-3 text-sm leading-relaxed">{observation.noticed}</p>
        {(observation.glow || observation.grow) && (
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {observation.glow && (
              <p className="rounded-md bg-success/10 p-3 text-sm">
                <span className="font-semibold text-success">Glow. </span>
                {observation.glow}
              </p>
            )}
            {observation.grow && (
              <p className="rounded-md bg-warning/10 p-3 text-sm">
                <span className="font-semibold text-warning">Grow. </span>
                {observation.grow}
              </p>
            )}
          </div>
        )}
        {observation.nextStep && (
          <p className="mt-3 text-sm">
            <span className="font-semibold">Next: </span>
            {observation.nextStep}
          </p>
        )}
        {linked.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {linked.map((g) => (
              <Badge key={g.id} variant="outline">
                {g.title}
              </Badge>
            ))}
          </div>
        )}
        <div className="mt-4 flex gap-2">
          <Button size="sm" variant="outline" onClick={onEdit}>
            Edit
          </Button>
          <Button size="sm" variant="ghost" onClick={onDelete}>
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function GoalCard({
  goal,
  linkedCount,
  expanded,
  onEdit,
  onDelete,
}: {
  goal: ImprovementGoal;
  linkedCount: number;
  expanded?: boolean;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge
            variant="outline"
            className={FOCUS_AREA_META[goal.focusArea].tint}
          >
            {FOCUS_AREA_META[goal.focusArea].label}
          </Badge>
          <Badge className={GOAL_STATUS_META[goal.status].tint} variant="outline">
            {GOAL_STATUS_META[goal.status].label}
          </Badge>
          <span className="text-xs text-text-tertiary">
            {linkedCount} linked spot{linkedCount === 1 ? "" : "s"}
            {goal.targetDate ? ` · check-in ${goal.targetDate}` : ""}
          </span>
        </div>
        <h3 className="mt-3 text-lg font-semibold">{goal.title}</h3>
        {expanded && (
          <div className="mt-3 grid gap-2 text-sm text-text-secondary">
            {goal.why && <p>{goal.why}</p>}
            {goal.targetPractice && (
              <p>
                <span className="font-semibold text-text-primary">
                  Target:{" "}
                </span>
                {goal.targetPractice}
              </p>
            )}
            {goal.successLooksLike && (
              <p>
                <span className="font-semibold text-text-primary">
                  Success:{" "}
                </span>
                {goal.successLooksLike}
              </p>
            )}
          </div>
        )}
        <div className="mt-4 flex gap-2">
          <Button size="sm" variant="outline" onClick={onEdit}>
            Edit
          </Button>
          <Button size="sm" variant="ghost" onClick={onDelete}>
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
          {label}
        </div>
        <div className="mt-2 text-3xl font-semibold">{value}</div>
        <div className="mt-1 text-sm text-text-secondary">{hint}</div>
      </CardContent>
    </Card>
  );
}

function Empty({
  title,
  body,
  action,
}: {
  title: string;
  body: string;
  action?: ReactNode;
}) {
  return (
    <div className="rounded-lg border border-dashed border-border p-6 text-center">
      <div className="font-semibold">{title}</div>
      <p className="mt-2 text-sm text-text-secondary">{body}</p>
      {action && <div className="mt-4 flex justify-center">{action}</div>}
    </div>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3 py-1 text-xs font-medium ${
        active
          ? "border-brand-orange bg-brand-orange text-white"
          : "border-border bg-white text-text-secondary hover:bg-muted"
      }`}
    >
      {label}
    </button>
  );
}
