import { permanentRedirect } from "next/navigation";

export default function SubscriptionAuditRedirectPage() {
  permanentRedirect("/pricing");
}
