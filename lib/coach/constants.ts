import type {
  FocusArea,
  GoalStatus,
  Grouping,
  ObservationSource,
  Subject,
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

export const STARTER_GOALS: Array<{
  title: string;
  focusArea: FocusArea;
  why: string;
  currentPractice: string;
  targetPractice: string;
  successLooksLike: string;
}> = [
  {
    title: "3-minute after-recess reset",
    focusArea: "management",
    why: "Fourth graders come back from recess with big feelings and leftover playground stories. The next lesson dies if the reset takes too long.",
    currentPractice: "I wait for quiet, then reteach the expectation, then start.",
    targetPractice:
      "Same visual timer, same water/bathroom rule, same attention signal every day. Lesson starts when the timer hits 0.",
    successLooksLike:
      "Three school days in a row, instruction starts within 3 minutes of walking in.",
  },
  {
    title: "Five-second wait time",
    focusArea: "questioning",
    why: "The first hand is rarely the deepest thinking. Nine- and ten-year-olds need air to retrieve and explain.",
    currentPractice: "I call on the first ready student so the lesson keeps moving.",
    targetPractice:
      "Ask, then silently count to five. Use a talk move: 'Turn and tell your partner first.'",
    successLooksLike:
      "In a spot observation, at least 3 students who do not usually jump in share an idea.",
  },
  {
    title: "Four writing conferences per workshop",
    focusArea: "feedback",
    why: "Writing workshop only changes writing if I sit with kids, not just circulate.",
    currentPractice: "I put out fires and give quick compliments.",
    targetPractice:
      "Clipboard with 4 names. 3-minute conference: notice, name the craft, one next step.",
    successLooksLike:
      "Every student gets a real conference at least once a week.",
  },
];

export const PRIVACY_NOTE =
  "Keep notes local to this browser. Use first names or initials only — skip last names, IDs, and anything a family would not want in a teaching journal.";
