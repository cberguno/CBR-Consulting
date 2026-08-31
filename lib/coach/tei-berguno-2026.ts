import type { CoachState, ImprovementGoal, Observation } from "./types";

const GOAL_SPRINT = "goal-tei-sprint";
const GOAL_PARTNERS = "goal-tei-partners";
const GOAL_EQUITY = "goal-tei-equity";
const GOAL_CIRCULATE = "goal-tei-circulate";

export const TEI_GOALS: ImprovementGoal[] = [
  {
    id: GOAL_SPRINT,
    createdAt: "2026-08-31T22:00:00.000Z",
    title: "Eureka sprint with fidelity",
    focusArea: "math",
    why: "Tellesha rated 2.1 Alignment Progressing because the multiplication-fact fluency and extra practice were not the Eureka sprint, so only some activities matched the estimation-word-problem objective.",
    currentPractice:
      "A fluency activity and three extra minutes of practice that were not the designed sprint.",
    targetPractice:
      "Run the Eureka sprint exactly as written — intended directions and time limit — then move to the application problem.",
    successLooksLike:
      "The sprint stays inside its time box, and the application problem gets the minutes it was designed to have.",
    status: "not-started",
    targetDate: "2026-09-18",
  },
  {
    id: GOAL_PARTNERS,
    createdAt: "2026-08-31T22:00:00.000Z",
    title: "Assigned Partner A / Partner B",
    focusArea: "engagement",
    why: "3.1 was Proficient on routines and the timer, but partner roles were not assigned strategically and three of eight groups did not participate.",
    currentPractice:
      "Partner A/B is named, but roles are not assigned on purpose and some pairs sit out the talk.",
    targetPractice:
      "Assign A/B before the lesson. Teach speaker and listener jobs. Start the talk only when both sides know their job.",
    successLooksLike:
      "During partner talk, every pair has a speaker and a listener, and fewer than one group sits out.",
    status: "not-started",
    targetDate: "2026-09-18",
  },
  {
    id: GOAL_EQUITY,
    createdAt: "2026-08-31T22:00:00.000Z",
    title: "Hear more than the volunteers",
    focusArea: "questioning",
    why: "2.3 Delivery and 3.2 / 3.3 all noted that whole-group talk sat with a few students, unison answers hid individual thinking, and two students stayed off task.",
    currentPractice:
      "Think time is in place, then volunteers or the whole class answer together.",
    targetPractice:
      "After think time, use sticks, a randomizer, or a tracker. Cold-call a range of students to restate the question or name the operation.",
    successLooksLike:
      "In one Eureka application block, at least six different students give an individual response — not a chorus.",
    status: "not-started",
    targetDate: "2026-09-25",
  },
  {
    id: GOAL_CIRCULATE,
    createdAt: "2026-08-31T22:00:00.000Z",
    title: "Circulate with a restating checklist",
    focusArea: "checking-understanding",
    why: "Tellesha’s probe: how will you know every student — not only volunteers — can restate the question and choose the operation? 2.2 Mastery was not rated.",
    currentPractice:
      "Model RDW, invite explanations, and notice who is talking, without a written record of who can restate.",
    targetPractice:
      "During partner talk, circulate with the Progress tracker / Feedback for Learning checklist. Mark who can restate the problem and explain their strategy.",
    successLooksLike:
      "End of the application problem: checklist shows restating data for the class, and one reteach or advance move follows from it.",
    status: "not-started",
    targetDate: "2026-09-25",
  },
];

export const TEI_OBSERVATION: Observation = {
  id: "obs-tei-2026-minter",
  createdAt: "2026-08-31T22:00:00.000Z",
  date: "2026-08-31",
  timeOfDay: "morning",
  subject: "math",
  grouping: "whole-group",
  source: "admin",
  focusArea: "engagement",
  noticed:
    "2026–27 TEI spot by Tellesha Minter. Eureka math: estimation word problem using RDW. Application problem matched the objective. Fluency/extra practice was not the Eureka sprint, so alignment slipped. Delivery slowed; partner talk and whole-group answers sat with a few students. Three of eight groups did not join the partner discussion.",
  glow: "Think time before students explained the story. RDW (and connecting “read” with “restate”) gave a consistent path into the word problem. Routines for materials and restroom, a timer, and a Partner A/B structure were visible. Positive language and chances to share thinking. Climate & culture and procedures rated Proficient.",
  grow: "Alignment Progressing: nonaligned fluency plus three extra practice minutes. Delivery Progressing: pace and a few voices. Behavior Progressing: two students off task, several groups silent, redirection did not always restart participation. Unison responses hid individual accountability. Application ran over time.",
  nextStep:
    "This week: sprint exactly as designed. Assign A/B before the lesson. Cold-call with sticks or a tracker. Circulate with a restating checklist.",
  energy: 3,
  linkedGoalIds: [GOAL_SPRINT, GOAL_PARTNERS, GOAL_EQUITY, GOAL_CIRCULATE],
  tei: {
    cycle: "2026-27",
    reviewer: "Tellesha Minter",
    teacher: "Cristian Berguno",
    praise: [
      "Think time before asking students to explain the story — supported processing and prepared them for academic discussion.",
      "RDW gave students a consistent process for making sense of the word problem before solving it.",
    ],
    probes: [
      "How will you determine whether every student — not only the students who volunteer — can restate the question and select the correct operation?",
      "How could implementing the Eureka fluency activity with fidelity improve both alignment and the amount of time available for the application problem?",
    ],
    polish: [
      "Prepare and implement the Eureka sprint exactly as designed, including its intended directions and time limit.",
      "Establish assigned Partner A/Partner B roles before the lesson and explicitly teach the expectations for both speakers and listeners.",
      "Use sticks, a randomizer, or a participation tracker to gather individual responses from a representative range of students.",
      "Circulate during partner discussions and use a checklist (Progress tracker — Feedback for Learning) to document which students can restate the problem and explain their strategy.",
    ],
    indicators: [
      {
        code: "2.1",
        title: "Alignment",
        rating: "progressing",
        comment:
          "The application problem supported solving an estimation word problem, and RDW helped students understand the task. The multiplication-fact fluency activity and three extra minutes of practice were not aligned to the Eureka sprint, so only some activities matched the objective and curriculum.",
      },
      {
        code: "2.2",
        title: "Mastery",
        rating: "no-rating",
        comment: "Not rated.",
      },
      {
        code: "2.3",
        title: "Delivery",
        rating: "progressing",
        comment:
          "Modeled RDW, provided think time, connected “read” with “restate,” and invited students to explain the problem. Pace slowed with a nonaligned fluency activity and an application task that ran long. Whole-group participation concentrated among a few students.",
      },
      {
        code: "2.4",
        title: "Cognitive demand",
        rating: "no-rating",
        comment: "Not rated.",
      },
      {
        code: "3.1",
        title: "Procedures & systems",
        rating: "proficient",
        comment:
          "Clear routines for materials and restroom. Timer and Partner A/B were in place. Partner roles were not assigned strategically, three of eight groups did not participate, and the application ran over time.",
      },
      {
        code: "3.2",
        title: "Behavioral expectations",
        rating: "progressing",
        comment:
          "Noticed two students participating more and asked others to contribute. Two students stayed off task; several groups skipped partner talk. Redirection did not consistently restart participation.",
      },
      {
        code: "3.3",
        title: "Climate & culture",
        rating: "proficient",
        comment:
          "Positive language (“Very good,” “Good job,” “I appreciate it”) and chances to share thinking. Academic talk still sat with a small number of students; unison responses made individual accountability hard to see.",
      },
    ],
  },
};

export function teiJournalState(): CoachState {
  return {
    observations: [TEI_OBSERVATION],
    goals: TEI_GOALS,
    pinnedFocus: "engagement",
    messages: [
      {
        id: "msg-tei-welcome",
        role: "coach",
        createdAt: "2026-08-31T22:05:00.000Z",
        body: "I loaded Tellesha Minter’s 2026–27 TEI spot. Keep the two Proficients: routines/timer and the warm tone. The cycle of practice is four polishes — Eureka sprint fidelity, assigned Partner A/B, voices beyond the volunteers, and a restating checklist while you circulate. Pick one for this week and log a 90-second spot after the next Eureka application problem.",
      },
    ],
  };
}
