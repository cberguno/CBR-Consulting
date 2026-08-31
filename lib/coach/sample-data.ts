import type { CoachState, ImprovementGoal, Observation } from "./types";

function id(prefix: string, n: number) {
  return `${prefix}-${n}`;
}

const goals: ImprovementGoal[] = [
  {
    id: id("goal", 1),
    createdAt: "2026-08-18T13:00:00.000Z",
    title: "3-minute after-recess reset",
    focusArea: "management",
    why: "The afternoon math block has been starting late since the first week.",
    currentPractice: "I wait, remind, and restart several times.",
    targetPractice:
      "Timer on the board, water cups already filled, attention signal once.",
    successLooksLike: "Math number talk starts within 3 minutes of walking in.",
    status: "practicing",
    targetDate: "2026-09-18",
  },
  {
    id: id("goal", 2),
    createdAt: "2026-08-18T13:05:00.000Z",
    title: "Five-second wait time",
    focusArea: "questioning",
    why: "The same four students answer most whole-group questions.",
    currentPractice: "I take the first hand so we stay on pace.",
    targetPractice: "Ask, wait five, then turn-and-talk before I take shares.",
    successLooksLike: "Quieter students explain thinking at least once a lesson.",
    status: "practicing",
    targetDate: "2026-09-25",
  },
  {
    id: id("goal", 3),
    createdAt: "2026-08-20T20:00:00.000Z",
    title: "Four writing conferences per workshop",
    focusArea: "feedback",
    why: "I am circulating, but kids are not leaving with a next step.",
    currentPractice: "Quick compliments and spelling help.",
    targetPractice: "3-minute conference: notice, name the craft move, one next step.",
    successLooksLike: "Clipboard shows every writer conferenced this week.",
    status: "not-started",
    targetDate: "2026-10-02",
  },
];

const observations: Observation[] = [
  {
    id: id("obs", 1),
    createdAt: "2026-08-25T14:10:00.000Z",
    date: "2026-08-25",
    timeOfDay: "morning",
    subject: "morning-meeting",
    grouping: "whole-group",
    source: "self",
    focusArea: "community",
    noticed:
      "Greeting around the circle felt warm. Two students skipped the greeting and sat on the rug talking about soccer.",
    glow: "The class song and morning share prompt got almost everyone looking at the speaker.",
    grow: "I did not have a job for the two students who opted out, so they stayed on the edge.",
    nextStep:
      "Assign those two the greeting check-in role tomorrow so they have a reason to join.",
    energy: 4,
    linkedGoalIds: [],
  },
  {
    id: id("obs", 2),
    createdAt: "2026-08-26T16:40:00.000Z",
    date: "2026-08-26",
    timeOfDay: "afternoon",
    subject: "recess-transition",
    grouping: "transition",
    source: "self",
    focusArea: "management",
    noticed:
      "It took about 8 minutes from lining up outside to sitting with dry-erase boards ready for number talk.",
    glow: "Line was quiet once we used the freeze signal.",
    grow: "Water cups, bathroom, and pencil sharpening all happened after we sat down.",
    nextStep:
      "Water and bathroom happen before we leave recess. Boards already on desks.",
    energy: 2,
    linkedGoalIds: ["goal-1"],
  },
  {
    id: id("obs", 3),
    createdAt: "2026-08-27T15:05:00.000Z",
    date: "2026-08-27",
    timeOfDay: "morning",
    subject: "math",
    grouping: "whole-group",
    source: "self",
    focusArea: "questioning",
    noticed:
      "Number talk on 16 x 4. I called on Maya in about two seconds. Three other hands went down.",
    glow: "Maya's doubling strategy was clear and I recorded it on the board.",
    grow: "I did not protect wait time, so the room never had to wrestle.",
    nextStep:
      "Tomorrow: 'Put a thumb on your knee when you have one strategy. Keep thinking of a second.' Then wait.",
    energy: 3,
    linkedGoalIds: ["goal-2"],
  },
  {
    id: id("obs", 4),
    createdAt: "2026-08-28T18:20:00.000Z",
    date: "2026-08-28",
    timeOfDay: "morning",
    subject: "writing",
    grouping: "independent",
    source: "self",
    focusArea: "feedback",
    noticed:
      "Writing workshop on personal narrative. I conferenced with one student, then spent the rest of the block helping with Chromebook logins.",
    glow: "The minilesson on 'small moment' was short and kids could repeat the goal.",
    grow: "I never opened the conference clipboard. Tech ate the block.",
    nextStep:
      "Login check is a morning job, not a workshop job. Sit with 4 writers no matter what.",
    energy: 2,
    linkedGoalIds: ["goal-3"],
  },
  {
    id: id("obs", 5),
    createdAt: "2026-08-28T19:00:00.000Z",
    date: "2026-08-28",
    timeOfDay: "midday",
    subject: "reading",
    grouping: "small-group",
    source: "admin",
    focusArea: "literacy",
    noticed:
      "Principal popped in for 6 minutes during guided reading. Note: 'Students were tracking print. Consider a turn-and-talk before you jump in with the strategy.'",
    glow: "The group could find the tricky word and use the picture + first letters.",
    grow: "I explained the strategy instead of letting them try it first.",
    nextStep:
      "Prompt: 'What could you try?' then wait. Name the strategy after they attempt it.",
    energy: 4,
    linkedGoalIds: ["goal-2"],
  },
  {
    id: id("obs", 6),
    createdAt: "2026-08-31T17:15:00.000Z",
    date: "2026-08-31",
    timeOfDay: "afternoon",
    subject: "math",
    grouping: "whole-group",
    source: "self",
    focusArea: "management",
    noticed:
      "After recess we hit 4 minutes to start. Better than last week. Two students still wandered to the pencil sharpener.",
    glow: "Timer was on the board and most kids were ready.",
    grow: "Pencil sharpener is still an escape hatch.",
    nextStep: "Community pencils in cups. Sharpener closed after morning work.",
    energy: 4,
    linkedGoalIds: ["goal-1"],
  },
];

export const SAMPLE_STATE: CoachState = {
  observations,
  goals,
  messages: [
    {
      id: "msg-1",
      role: "coach",
      createdAt: "2026-08-25T12:00:00.000Z",
      body: "Hi. I am your classroom coach for 4th grade. Drop a 60-second spot observation anytime — after a lesson, after a walkthrough, or when something nags at you in the car. I will help you name what happened, keep a record, and pick one thing worth practicing next.",
    },
  ],
  pinnedFocus: "management",
};
