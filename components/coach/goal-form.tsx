"use client";

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
import { FOCUS_AREA_META, GOAL_STATUS_META } from "@/lib/coach/constants";
import {
  FOCUS_AREAS,
  GOAL_STATUSES,
  type FocusArea,
  type GoalStatus,
  type ImprovementGoal,
} from "@/lib/coach/types";

type Draft = Omit<ImprovementGoal, "id" | "createdAt">;

export function GoalForm({
  draft,
  submitLabel,
  onChange,
  onSubmit,
  onCancel,
}: {
  draft: Draft;
  submitLabel: string;
  onChange: (patch: Partial<Draft>) => void;
  onSubmit: () => void;
  onCancel: () => void;
}) {
  return (
    <form
      className="grid gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <div>
        <Label htmlFor="goal-title">Goal title</Label>
        <Input
          id="goal-title"
          required
          className="mt-1.5"
          value={draft.title}
          onChange={(e) => onChange({ title: e.target.value })}
          placeholder="3-minute after-recess reset"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label>Focus</Label>
          <Select
            value={draft.focusArea}
            onValueChange={(value) =>
              onChange({ focusArea: value as FocusArea })
            }
          >
            <SelectTrigger className="mt-1.5">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {FOCUS_AREAS.map((key) => (
                <SelectItem key={key} value={key}>
                  {FOCUS_AREA_META[key].label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Status</Label>
          <Select
            value={draft.status}
            onValueChange={(value) =>
              onChange({ status: value as GoalStatus })
            }
          >
            <SelectTrigger className="mt-1.5">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {GOAL_STATUSES.map((key) => (
                <SelectItem key={key} value={key}>
                  {GOAL_STATUS_META[key].label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="why">Why this matters for 4th grade</Label>
        <Textarea
          id="why"
          value={draft.why}
          onChange={(e) => onChange({ why: e.target.value })}
          className="mt-1.5"
          placeholder="What is this costing students right now?"
        />
      </div>
      <div>
        <Label htmlFor="current">Current practice</Label>
        <Textarea
          id="current"
          value={draft.currentPractice}
          onChange={(e) => onChange({ currentPractice: e.target.value })}
          className="mt-1.5"
          placeholder="What do you actually do today?"
        />
      </div>
      <div>
        <Label htmlFor="target">Target practice</Label>
        <Textarea
          id="target"
          value={draft.targetPractice}
          onChange={(e) => onChange({ targetPractice: e.target.value })}
          className="mt-1.5"
          placeholder="The small, repeatable move"
        />
      </div>
      <div>
        <Label htmlFor="success">You will know it is working when</Label>
        <Textarea
          id="success"
          value={draft.successLooksLike}
          onChange={(e) => onChange({ successLooksLike: e.target.value })}
          className="mt-1.5"
          placeholder="Observable, within two weeks"
        />
      </div>
      <div>
        <Label htmlFor="target-date">Check-in date</Label>
        <Input
          id="target-date"
          type="date"
          className="mt-1.5"
          value={draft.targetDate}
          onChange={(e) => onChange({ targetDate: e.target.value })}
        />
      </div>

      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{submitLabel}</Button>
      </div>
    </form>
  );
}
