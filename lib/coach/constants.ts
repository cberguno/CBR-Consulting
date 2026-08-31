import type {
  FocusArea,
  GoalStatus,
  Grouping,
  ObservationSource,
  Subject,
  TeiRating,
  TimeOfDay,
} from "./types";

export const FOCUS_AREA_META: Record<
  FocusArea,
  { label: string; hint: string; tint: string }
> = {
  community: {
    label: "Classroom community",
    hint: "Belonging, routines, how the class treats each other",
    tint: "bg-info/10 text-info",
  },
  management: {
    label: "Management & transitions",
    hint: "Signals, lining up, materials, time between activities",
    tint: "bg-warning/10 text-warning",
  },
  engagement: {
    label: "Student engagement",
    hint: "Who is with you, who is coasting, participation",
    tint: "bg-brand-orange/10 text-brand-orange",
  },
  questioning: {
    label: "Questioning & discussion",
    hint: "Wait time, talk moves, who gets to think out loud",
    tint: "bg-[#8b5cf6]/10 text-[#8b5cf6]",
  },
  differentiation: {
    label: "Differentiation",
    hint: "Access, challenge, supports without tracking kids",
    tint: "bg-info/10 text-info",
  },
  literacy: {
    label: "Literacy",
    hint: "Reading workshop, writing, vocabulary, stamina",
    tint: "bg-success/10 text-success",
  },
  math: {
    label: "Math thinking",
    hint: "Number talks, productive struggle, math language",
    tint: "bg-success/10 text-success",
  },
  "checking-understanding": {
    label: "Checking for understanding",
    hint: "Exit tickets, turn-and-talk, mid-lesson pulse checks",
    tint: "bg-[#8b5cf6]/10 text-[#8b5cf6]",
  },
  feedback: {
    label: "Feedback & conferencing",
    hint: "In-the-moment coaching, writing conferences, next steps",
    tint: "bg-brand-orange/10 text-brand-orange",
  },
  independence: {
    label: "Independence & stamina",
    hint: "Can they keep going when you are with a small group?",
    tint: "bg-warning/10 text-warning",
  },
  sel: {
    label: "SEL & relationships",
    hint: "Regulation, conflict, friendship, restorative talk",
    tint: "bg-info/10 text-info",
  },
  families: {
    label: "Families",
    hint: "Notes home, conferences, celebrating growth with families",
    tint: "bg-text-secondary/10 text-text-secondary",
  },
};

export const SUBJECT_LABELS: Record<Subject, string> = {
  "morning-meeting": "Morning meeting",
  reading: "Reading",
  writing: "Writing",
  math: "Math",
  science: "Science",
  "social-studies": "Social studies",
  specials: "Specials",
  "recess-transition": "Recess / transition",
  dismissal: "Dismissal",
  other: "Other",
};

export const GROUPING_LABELS: Record<Grouping, string> = {
  "whole-group": "Whole group",
  "small-group": "Small group",
  pairs: "Pairs",
  independent: "Independent",
  transition: "Transition",
};

export const TIME_LABELS: Record<TimeOfDay, string> = {
  morning: "Morning",
  midday: "Midday",
  afternoon: "Afternoon",
};

export const SOURCE_LABELS: Record<ObservationSource, string> = {
  self: "My own spot check",
  admin: "Admin walkthrough",
  coach: "Instructional coach",
  peer: "Peer / teammate",
};

export const GOAL_STATUS_META: Record<
  GoalStatus,
  { label: string; tint: string }
> = {
  "not-started": {
    label: "Not started",
    tint: "bg-muted text-text-secondary",
  },
  practicing: {
    label: "Practicing",
    tint: "bg-warning/10 text-warning",
  },
  sticking: {
    label: "Starting to stick",
    tint: "bg-info/10 text-info",
  },
  achieved: {
    label: "Habit",
    tint: "bg-success/10 text-success",
  },
};

export const TEI_RATING_META: Record<
  TeiRating,
  { label: string; tint: string }
> = {
  proficient: { label: "Proficient", tint: "bg-success/10 text-success" },
  progressing: { label: "Progressing", tint: "bg-warning/10 text-warning" },
  "no-rating": { label: "Not rated", tint: "bg-muted text-text-secondary" },
};

export const STARTER_GOALS: Array<{
  title: string;
  focusArea: FocusArea;
  why: string;
  currentPractice: string;
  targetPractice: string;
  successLooksLike: string;
}> = [
  {
    title: "Eureka sprint with fidelity",
    focusArea: "math",
    why: "Alignment slips when fluency is not the designed Eureka sprint, and the application problem loses minutes.",
    currentPractice: "A nearby fluency activity and extra practice minutes.",
    targetPractice:
      "Sprint exactly as written — directions and time limit — then start the application problem.",
    successLooksLike:
      "Sprint stays in its box. Application problem gets its designed minutes.",
  },
  {
    title: "Assigned Partner A / Partner B",
    focusArea: "engagement",
    why: "A/B structure without assigned roles leaves some groups silent.",
    currentPractice: "Partners are named, but speaker and listener jobs are loose.",
    targetPractice:
      "Assign A/B before the lesson. Teach speaker and listener. Start talk only when both know the job.",
    successLooksLike: "Every pair has a speaker and a listener during partner talk.",
  },
  {
    title: "Hear more than the volunteers",
    focusArea: "questioning",
    why: "Think time is working. Whole-group answers still sit with a few students or a chorus.",
    currentPractice: "Volunteers or unison responses after think time.",
    targetPractice:
      "Sticks, randomizer, or tracker. Individual restates of the question or the operation.",
    successLooksLike:
      "Six different students give an individual response in one application block.",
  },
  {
    title: "Circulate with a restating checklist",
    focusArea: "checking-understanding",
    why: "You cannot rate mastery if only volunteers prove they can restate and choose the operation.",
    currentPractice: "Circulate and listen without a written record.",
    targetPractice:
      "Progress tracker / Feedback for Learning checklist during partner talk.",
    successLooksLike:
      "Checklist shows restating data, then one reteach or advance move.",
  },
];

export const PRIVACY_NOTE =
  "Keep notes local to this browser. Use first names or initials only — skip last names, IDs, and anything a family would not want in a teaching journal.";
