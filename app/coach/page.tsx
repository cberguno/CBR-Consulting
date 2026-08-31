import type { Metadata } from "next";
import { CoachApp } from "@/components/coach/coach-app";
import { CoachProvider } from "@/lib/coach/use-coach-store";

export const metadata: Metadata = {
  title: "Classroom Coach — Spot observations for 4th grade",
  description:
    "Keep spot observations and improvement goals in one place. Built for 4th grade teachers who want a simple practice journal.",
};

export default function CoachPage() {
  return (
    <CoachProvider>
      <CoachApp />
    </CoachProvider>
  );
}
