export const FOCUS_AREAS = [
  "community",
  "management",
  "engagement",
  "questioning",
  "differentiation",
  "literacy",
  "math",
  "checking-understanding",
  "feedback",
  "independence",
  "sel",
  "families",
] as const;

export type FocusArea = (typeof FOCUS_AREAS)[number];

export const SUBJECTS = [
  "morning-meeting",
  "reading",
  "writing",
  "math",
  "science",
  "social-studies",
  "specials",
  "recess-transition",
  "dismissal",
  "other",
] as const;

export type Subject = (typeof SUBJECTS)[number];

export const GROUPINGS = [
  "whole-group",
  "small-group",
  "pairs",
  "independent",
  "transition",
] as const;

export type Grouping = (typeof GROUPINGS)[number];

export const TIME_OF_DAY = ["morning", "midday", "afternoon"] as const;
export type TimeOfDay = (typeof TIME_OF_DAY)[number];

export const OBSERVATION_SOURCES = ["self", "admin", "coach", "peer"] as const;
export type ObservationSource = (typeof OBSERVATION_SOURCES)[number];

export const GOAL_STATUSES = [
  "not-started",
  "practicing",
  "sticking",
  "achieved",
] as const;
export type GoalStatus = (typeof GOAL_STATUSES)[number];

export type Observation = {
  id: string;
  createdAt: string;
  date: string;
  timeOfDay: TimeOfDay;
  subject: Subject;
  grouping: Grouping;
  source: ObservationSource;
  focusArea: FocusArea;
  noticed: string;
  glow: string;
  grow: string;
  nextStep: string;
  energy: 1 | 2 | 3 | 4 | 5;
  linkedGoalIds: string[];
};

export type ImprovementGoal = {
  id: string;
  createdAt: string;
  title: string;
  focusArea: FocusArea;
  why: string;
  currentPractice: string;
  targetPractice: string;
  successLooksLike: string;
  status: GoalStatus;
  targetDate: string;
};

export type ChatRole = "teacher" | "coach";

export type ChatMessage = {
  id: string;
  role: ChatRole;
  createdAt: string;
  body: string;
  suggestedObservation?: Partial<Observation>;
};

export type CoachInsight = {
  id: string;
  kind: "pattern" | "strength" | "nudge" | "celebration";
  title: string;
  body: string;
  relatedFocus?: FocusArea;
};

export type CoachState = {
  observations: Observation[];
  goals: ImprovementGoal[];
  messages: ChatMessage[];
  pinnedFocus: FocusArea | null;
};
