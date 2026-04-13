import Link from "next/link";
import { NAV_LINKS, SITE } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-bg-dark text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-3">
        <div>
          <h3 className="text-lg font-semibold">{SITE.name}</h3>
          <p className="mt-2 text-sm text-white/70">{SITE.location}</p>
          <p className="mt-4 text-sm text-white/60">{SITE.tagline}</p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white/80">
            Quick Links
          </h4>
          <ul className="mt-4 space-y-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-white/70 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white/80">
            Get in Touch
          </h4>
          <p className="mt-4 text-sm text-white/70">
            Ready to simplify your business with AI?
          </p>
          <Link
            href="/contact"
            className="mt-3 inline-block text-sm font-medium text-brand-orange hover:underline"
          >
            Contact us →
          </Link>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-6 text-center text-xs text-white/50">
          © {SITE.year} {SITE.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
