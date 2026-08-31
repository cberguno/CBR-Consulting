import { FOCUS_AREA_META, SUBJECT_LABELS } from "./constants";
import type {
  ChatMessage,
  CoachInsight,
  CoachState,
  FocusArea,
  Observation,
  Subject,
  TimeOfDay,
} from "./types";

type Strategy = {
  title: string;
  tryThis: string;
};

const STRATEGIES: Record<FocusArea, Strategy[]> = {
  community: [
    {
      title: "Give the edge kids a job",
      tryThis:
        "Tomorrow, hand the two students on the edge a visible job (greeting checker, materials captain) so belonging is a role, not a request.",
    },
    {
      title: "Name the community move",
      tryThis:
        "When a student includes someone, freeze and name it: 'That is how we make room.' Fourth graders repeat what you celebrate.",
    },
  ],
  management: [
    {
      title: "Move the friction before the lesson",
      tryThis:
        "Water, bathroom, and pencils happen before you leave the previous space. When they sit, the only job is the opener.",
    },
    {
      title: "One signal, one timer",
      tryThis:
        "Same attention signal every time. Visual timer where they can see it. Start teaching when it hits zero, even if two kids are still settling — then reteach later, not during the launch.",
    },
  ],
  engagement: [
    {
      title: "Total participation before hands",
      tryThis:
        "Whiteboards, chips, or a thumb-on-chest show you every brain, not just the volunteers. Call on a student after everyone has a mark on their board.",
    },
    {
      title: "Protect the quiet thinkers",
      tryThis:
        "Use 'no hands yet.' Students write a word or sketch first. Then you pick two unexpected voices.",
    },
  ],
  questioning: [
    {
      title: "Five silent seconds",
      tryThis:
        "Ask the question, then count five on your fingers where they can see them. Do not rephrase until the fifth finger.",
    },
    {
      title: "Turn-and-talk is the first share",
      tryThis:
        "After wait time: 'Tell your partner your first idea.' Listen in, then lift a student who rarely speaks: 'J, I heard you say… can you tell us?'",
    },
  ],
  differentiation: [
    {
      title: "Same task, different on-ramps",
      tryThis:
        "Keep the 4th grade standard. Offer a worked example, a number line or sentence stem, and a stretch prompt. Kids choose the on-ramp, not a different assignment.",
    },
  ],
  literacy: [
    {
      title: "Prompt, then zip it",
      tryThis:
        "In guided reading, ask 'What could you try?' and wait. Name the strategy after they attempt it so the work stays theirs.",
    },
    {
      title: "Stamina is a taught skill",
      tryThis:
        "Start independent reading with a visible goal ('8 quiet minutes'). Celebrate the minutes, not just the pages.",
    },
  ],
  math: [
    {
      title: "Collect strategies, not answers",
      tryThis:
        "Record two or three student strategies on the board before you confirm the answer. Ask, 'Where do these two methods meet?'",
    },
    {
      title: "Thumb on knee",
      tryThis:
        "'Thumb on your knee when you have one way. Keep thinking of a second.' This stops the race to be first.",
    },
  ],
  "checking-understanding": [
    {
      title: "Mid-lesson pulse",
      tryThis:
        "Pause at minute 8. Three students show boards. If two are wobbly, reteach the one idea before you add the next.",
    },
  ],
  feedback: [
    {
      title: "Notice, name, next step",
      tryThis:
        "Three-minute conference: one specific notice, name the craft or strategy, one next step they can try before you walk away. Write it on a sticky they keep.",
    },
    {
      title: "Clipboard over firefighting",
      tryThis:
        "Pick 4 names before workshop starts. Those four get you even if Chromebooks misbehave. Tech becomes a morning job.",
    },
  ],
  independence: [
    {
      title: "Must-do / may-do",
      tryThis:
        "Post a must-do that every student can start without you, then a may-do. Your small group should not be the only engine in the room.",
    },
  ],
  sel: [
    {
      title: "Regulate before you reason",
      tryThis:
        "If a 4th grader is flooded, do not problem-solve yet. Water, seat, two breaths, then 'What happened?' Stories come back once the body is down.",
    },
  ],
  families: [
    {
      title: "One glow a week",
      tryThis:
        "Send one specific glow home for a student who is working on a hard habit. Families will reinforce what you name.",
    },
  ],
};

const KEYWORDS: Array<{ area: FocusArea; words: string[] }> = [
  {
    area: "management",
    words: [
      "transition",
      "recess",
      "line",
      "lining",
      "voice",
      "off-task",
      "off task",
      "hallway",
      "pencil",
      "timer",
      "settling",
      "wandering",
    ],
  },
  {
    area: "questioning",
    words: [
      "wait time",
      "question",
      "hands",
      "called on",
      "discussion",
      "turn and talk",
      "turn-and-talk",
    ],
  },
  {
    area: "literacy",
    words: [
      "reading",
      "writing",
      "workshop",
      "fluency",
      "comprehension",
      "guided reading",
      "phonics",
      "narrative",
    ],
  },
  {
    area: "math",
    words: [
      "number talk",
      "math",
      "fraction",
      "multiplication",
      "strategy",
      "problem",
    ],
  },
  {
    area: "feedback",
    words: ["conference", "feedback", "clipboard", "next step", "comment"],
  },
  {
    area: "engagement",
    words: ["bored", "engagement", "participation", "checked out", "off task"],
  },
  {
    area: "sel",
    words: [
      "upset",
      "conflict",
      "friend",
      "tears",
      "angry",
      "regulate",
      "meltdown",
    ],
  },
  {
    area: "community",
    words: ["greeting", "circle", "belong", "community", "morning meeting"],
  },
  {
    area: "independence",
    words: ["stamina", "independent", "small group", "when I left"],
  },
  {
    area: "checking-understanding",
    words: ["exit ticket", "whiteboard", "check for", "confused", "got it"],
  },
];

function daysAgo(isoDate: string) {
  const then = new Date(`${isoDate}T12:00:00`);
  const now = new Date();
  return Math.floor((now.getTime() - then.getTime()) / 86400000);
}

function countBy<T extends string>(items: T[]) {
  const map = new Map<T, number>();
  for (const item of items) {
    map.set(item, (map.get(item) ?? 0) + 1);
  }
  return Array.from(map.entries()).sort((a, b) => b[1] - a[1]);
}

function pickStrategy(area: FocusArea, salt = 0): Strategy {
  const list = STRATEGIES[area];
  return list[salt % list.length];
}

export function inferFocus(text: string): FocusArea {
  const lower = text.toLowerCase();
  let best: FocusArea = "engagement";
  let score = 0;
  for (const row of KEYWORDS) {
    const hits = row.words.filter((w) => lower.includes(w)).length;
    if (hits > score) {
      score = hits;
      best = row.area;
    }
  }
  return best;
}

export function inferSubject(text: string): Subject {
  const lower = text.toLowerCase();
  if (/(number talk|math|fraction|multiplication)/.test(lower)) return "math";
  if (/(writing|narrative|essay)/.test(lower)) return "writing";
  if (/(reading|guided reading|fluency)/.test(lower)) return "reading";
  if (/(recess|transition|line)/.test(lower)) return "recess-transition";
  if (/(morning meeting|greeting|circle)/.test(lower)) return "morning-meeting";
  if (/science/.test(lower)) return "science";
  if (/social/.test(lower)) return "social-studies";
  return "other";
}

export function inferTimeOfDay(): TimeOfDay {
  const hour = new Date().getHours();
  if (hour < 11) return "morning";
  if (hour < 14) return "midday";
  return "afternoon";
}

export function analyzeJournal(state: CoachState): CoachInsight[] {
  const insights: CoachInsight[] = [];
  const recent = [...state.observations].sort((a, b) =>
    b.date.localeCompare(a.date)
  );

  if (recent.length === 0) {
    insights.push({
      id: "empty",
      kind: "nudge",
      title: "Start with one 90-second spot",
      body: "You do not need a formal observation cycle. After one lesson today, jot what you noticed, one glow, and one grow. I will turn that into a practice thread.",
    });
    return insights;
  }

  const focusCounts = countBy(recent.map((o) => o.focusArea));
  const top = focusCounts[0];
  if (top && top[1] >= 2) {
    const meta = FOCUS_AREA_META[top[0]];
    insights.push({
      id: `pattern-${top[0]}`,
      kind: "pattern",
      title: `${meta.label} keeps showing up`,
      body: `${top[1]} of your spots land in ${meta.label.toLowerCase()}. That is not a failure — it is your current laboratory. Keep collecting evidence there for two more weeks before you add a new goal.`,
      relatedFocus: top[0],
    });
  }

  const afternoonMgmt = recent.filter(
    (o) => o.timeOfDay === "afternoon" && o.focusArea === "management"
  );
  if (afternoonMgmt.length >= 2) {
    insights.push({
      id: "afternoon-mgmt",
      kind: "pattern",
      title: "Afternoons are where the system frays",
      body: "More than one afternoon spot is about management. For 9- and 10-year-olds that usually means recess residue plus tired brains. Fix the first 3 minutes after they walk in before you rewrite the math lesson.",
      relatedFocus: "management",
    });
  }

  const glowRich = recent.filter((o) => o.glow.trim().length > 20);
  if (glowRich.length >= 2) {
    insights.push({
      id: "strengths",
      kind: "strength",
      title: "You are already naming what works",
      body: "Your glows are specific, not generic. Keep that. Fourth graders and evaluators both need the same thing: a clear picture of the move you want to see again.",
    });
  }

  for (const goal of state.goals.filter((g) => g.status !== "achieved")) {
    const linked = recent.filter((o) => o.linkedGoalIds.includes(goal.id));
    const last = linked[0];
    if (linked.length === 0) {
      insights.push({
        id: `gap-${goal.id}`,
        kind: "nudge",
        title: `No spots yet for “${goal.title}”`,
        body: `The goal is on paper. The next observation that touches ${FOCUS_AREA_META[goal.focusArea].label.toLowerCase()} should be linked to it, even if the day was messy. Practice needs evidence.`,
        relatedFocus: goal.focusArea,
      });
    } else if (last && daysAgo(last.date) >= 7) {
      insights.push({
        id: `stale-${goal.id}`,
        kind: "nudge",
        title: `“${goal.title}” has gone quiet`,
        body: `Last linked spot was ${daysAgo(last.date)} days ago. A tiny revisit this week — even a 4-minute note — keeps the habit from sliding back.`,
        relatedFocus: goal.focusArea,
      });
    } else if (linked.length >= 2 && goal.status === "practicing") {
      insights.push({
        id: `progress-${goal.id}`,
        kind: "celebration",
        title: `You are practicing “${goal.title}”`,
        body: `${linked.length} spots are already tied to this goal. Look at the next-step line on the newest one and run that exact move once more before you change the goal.`,
        relatedFocus: goal.focusArea,
      });
    }
  }

  const admin = recent.filter((o) => o.source === "admin" || o.source === "coach");
  if (admin.length) {
    insights.push({
      id: "external",
      kind: "nudge",
      title: "Walkthrough notes are data, not a verdict",
      body: "You logged feedback from someone else. Turn their comment into one next step you control this week. That is how a spot observation becomes growth instead of rumination.",
    });
  }

  const subjects = countBy(recent.map((o) => o.subject));
  if (subjects.length >= 1 && recent.length >= 4) {
    const uncovered = (
      ["reading", "writing", "math"] as Subject[]
    ).filter((s) => !subjects.find(([key]) => key === s));
    if (uncovered.length) {
      insights.push({
        id: "subject-gap",
        kind: "nudge",
        title: `No recent spots in ${uncovered
          .map((s) => SUBJECT_LABELS[s])
          .join(" or ")}`,
        body: "Fourth grade is a full academic day. If your journal only lives in one block, you will over-coach that block and miss the rest of the child.",
      });
    }
  }

  return insights.slice(0, 4);
}

export function coachOnObservation(observation: Observation): string {
  const strategy = pickStrategy(
    observation.focusArea,
    observation.noticed.length
  );
  const focus = FOCUS_AREA_META[observation.focusArea].label;
  const parts = [
    `I saved that spot under ${focus.toLowerCase()} during ${SUBJECT_LABELS[observation.subject].toLowerCase()}.`,
  ];
  if (observation.glow.trim()) {
    parts.push(`Glow I am keeping: ${observation.glow.trim()}`);
  }
  if (observation.grow.trim()) {
    parts.push(`Grow I heard: ${observation.grow.trim()}`);
  }
  parts.push(`${strategy.title}: ${strategy.tryThis}`);
  if (observation.nextStep.trim()) {
    parts.push(
      `Your next step is already concrete. Protect it tomorrow before you add anything else.`
    );
  } else {
    parts.push(
      `Want a next step? Steal this: ${strategy.tryThis.split(".")[0]}.`
    );
  }
  return parts.join(" ");
}

export function replyToTeacher(
  text: string,
  state: CoachState
): { message: ChatMessage; draft?: Partial<Observation> } {
  const focus = inferFocus(text);
  const subject = inferSubject(text);
  const strategy = pickStrategy(focus, text.length);
  const relatedGoal = state.goals.find(
    (g) => g.focusArea === focus && g.status !== "achieved"
  );
  const recentSame = state.observations.filter((o) => o.focusArea === focus);

  const chunks: string[] = [];
  chunks.push(
    `I am hearing this as a ${FOCUS_AREA_META[focus].label.toLowerCase()} moment${
      subject !== "other" ? ` in ${SUBJECT_LABELS[subject].toLowerCase()}` : ""
    }.`
  );

  if (recentSame.length) {
    chunks.push(
      `You have ${recentSame.length} earlier spot${
        recentSame.length === 1 ? "" : "s"
      } in that same lane. That is a thread, not a one-off.`
    );
  }

  if (relatedGoal) {
    chunks.push(
      `This sits next to your goal “${relatedGoal.title}.” When you save the observation, link it so the practice has evidence.`
    );
  } else if (state.goals.length < 3) {
    chunks.push(
      `If this keeps happening, it is worth a small improvement goal — one behavior you can practice for two weeks.`
    );
  }

  chunks.push(`${strategy.title}: ${strategy.tryThis}`);
  chunks.push(
    "I can save this as a spot observation. Add a glow and a grow if you have them, or tell me to save it as-is."
  );

  return {
    message: {
      id: `coach-${Date.now().toString(36)}`,
      role: "coach",
      createdAt: new Date().toISOString(),
      body: chunks.join(" "),
    },
    draft: {
      noticed: text.trim(),
      focusArea: focus,
      subject,
      timeOfDay: inferTimeOfDay(),
      grow: "",
      glow: "",
      nextStep: strategy.tryThis,
    },
  };
}

export function weekDots(observations: Observation[], weekStart = new Date()) {
  const start = startOfWeek(weekStart);
  return Array.from({ length: 5 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    const key = toDateKey(d);
    return {
      date: key,
      label: ["Mon", "Tue", "Wed", "Thu", "Fri"][i],
      count: observations.filter((o) => o.date === key).length,
    };
  });
}

export function startOfWeek(from: Date) {
  const d = new Date(from);
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function toDateKey(d: Date) {
  const month = `${d.getMonth() + 1}`.padStart(2, "0");
  const day = `${d.getDate()}`.padStart(2, "0");
  return `${d.getFullYear()}-${month}-${day}`;
}
