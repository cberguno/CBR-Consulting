"use client";

import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FOCUS_AREA_META,
  GOAL_STATUS_META,
  GROUPING_LABELS,
  SOURCE_LABELS,
  SUBJECT_LABELS,
  TIME_LABELS,
} from "@/lib/coach/constants";
import {
  FOCUS_AREAS,
  GROUPINGS,
  OBSERVATION_SOURCES,
  SUBJECTS,
  TIME_OF_DAY,
  type FocusArea,
  type Grouping,
  type ImprovementGoal,
  type Observation,
  type ObservationSource,
  type Subject,
  type TimeOfDay,
} from "@/lib/coach/types";

type Draft = Omit<Observation, "id" | "createdAt">;

export function ObservationForm({
  draft,
  goals,
  submitLabel,
  onChange,
  onSubmit,
  onCancel,
}: {
  draft: Draft;
  goals: ImprovementGoal[];
  submitLabel: string;
  onChange: (patch: Partial<Draft>) => void;
  onSubmit: () => void;
  onCancel: () => void;
}) {
  const activeGoals = useMemo(
    () => goals.filter((g) => g.status !== "achieved"),
    [goals]
  );

  return (
    <form
      className="grid gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <div>
        <Label htmlFor="noticed">What did you notice?</Label>
        <Textarea
          id="noticed"
          required
          value={draft.noticed}
          onChange={(e) => onChange({ noticed: e.target.value })}
          placeholder="Be specific. What did students do? What did you do? What happened in the first 3 minutes?"
          className="mt-1.5 min-h-[110px]"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="glow">Glow — what worked</Label>
          <Textarea
            id="glow"
            value={draft.glow}
            onChange={(e) => onChange({ glow: e.target.value })}
            placeholder="One concrete thing worth repeating"
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="grow">Grow — what to tighten</Label>
          <Textarea
            id="grow"
            value={draft.grow}
            onChange={(e) => onChange({ grow: e.target.value })}
            placeholder="One thing that leaked time, thinking, or belonging"
            className="mt-1.5"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="nextStep">One next step</Label>
        <Textarea
          id="nextStep"
          value={draft.nextStep}
          onChange={(e) => onChange({ nextStep: e.target.value })}
          placeholder="Something you can try in the next lesson, not a personality change"
          className="mt-1.5"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <FieldSelect
          label="Focus"
          value={draft.focusArea}
          onValueChange={(value) => onChange({ focusArea: value as FocusArea })}
          options={FOCUS_AREAS.map((key) => ({
            value: key,
            label: FOCUS_AREA_META[key].label,
          }))}
        />
        <FieldSelect
          label="Subject / block"
          value={draft.subject}
          onValueChange={(value) => onChange({ subject: value as Subject })}
          options={SUBJECTS.map((key) => ({
            value: key,
            label: SUBJECT_LABELS[key],
          }))}
        />
        <FieldSelect
          label="Grouping"
          value={draft.grouping}
          onValueChange={(value) => onChange({ grouping: value as Grouping })}
          options={GROUPINGS.map((key) => ({
            value: key,
            label: GROUPING_LABELS[key],
          }))}
        />
        <FieldSelect
          label="When"
          value={draft.timeOfDay}
          onValueChange={(value) => onChange({ timeOfDay: value as TimeOfDay })}
          options={TIME_OF_DAY.map((key) => ({
            value: key,
            label: TIME_LABELS[key],
          }))}
        />
        <div>
          <Label htmlFor="obs-date">Date</Label>
          <Input
            id="obs-date"
            type="date"
            className="mt-1.5"
            value={draft.date}
            onChange={(e) => onChange({ date: e.target.value })}
          />
        </div>
        <FieldSelect
          label="Whose eyes"
          value={draft.source}
          onValueChange={(value) =>
            onChange({ source: value as ObservationSource })
          }
          options={OBSERVATION_SOURCES.map((key) => ({
            value: key,
            label: SOURCE_LABELS[key],
          }))}
        />
      </div>

      <div>
        <Label>How was your energy after?</Label>
        <div className="mt-2 flex flex-wrap gap-2">
          {([1, 2, 3, 4, 5] as const).map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => onChange({ energy: n })}
              className={`h-10 min-w-10 rounded-md border px-3 text-sm font-medium transition-colors ${
                draft.energy === n
                  ? "border-brand-orange bg-brand-orange text-white"
                  : "border-border bg-white text-text-secondary hover:bg-muted"
              }`}
              aria-pressed={draft.energy === n}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      {activeGoals.length > 0 && (
        <div>
          <Label>Link to an improvement goal</Label>
          <div className="mt-2 grid gap-2">
            {activeGoals.map((goal) => {
              const checked = draft.linkedGoalIds.includes(goal.id);
              return (
                <label
                  key={goal.id}
                  className="flex cursor-pointer items-start gap-3 rounded-lg border border-border bg-white p-3"
                >
                  <input
                    type="checkbox"
                    className="mt-1"
                    checked={checked}
                    onChange={() => {
                      const next = checked
                        ? draft.linkedGoalIds.filter((id) => id !== goal.id)
                        : [...draft.linkedGoalIds, goal.id];
                      onChange({ linkedGoalIds: next });
                    }}
                  />
                  <span>
                    <span className="block text-sm font-medium">
                      {goal.title}
                    </span>
                    <span className="text-xs text-text-secondary">
                      {FOCUS_AREA_META[goal.focusArea].label} ·{" "}
                      {GOAL_STATUS_META[goal.status].label}
                    </span>
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      )}

      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{submitLabel}</Button>
      </div>
    </form>
  );
}

function FieldSelect({
  label,
  value,
  onValueChange,
  options,
}: {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <Label>{label}</Label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="mt-1.5">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
