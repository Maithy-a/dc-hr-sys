import LandingHeader from "@/components/LandingHeader";
import Link from "next/link";

const scoresheet = [
  {
    label: "Education level",
    weight: 25,
  },
  {
    label: "Years of experience",
    weight: 25,
  },
  {
    label: "Skills match",
    weight: 30,
  },
  {
    label: "Certifications",
    weight: 10,
  },
  {
    label: "CertDocument completeness",
    weight: 10,
  }
]

export default async function Home() {

  return (
    <main className="min-h-screen flex flex-col">
      <LandingHeader />

      <section className="flex-1 flex items-center">
        <div className="max-w-5xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-brand font-medium mb-4">
              Employee Vetting &amp; Appraisal Management
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-bold leading-tight text-balance">
              Every candidate scored. Every appraisal on the record.
            </h1>
            <p className="mt-5 text-slate-500 leading-relaxed">
              Digital Chances evaluates every application and every employee against the
              same published criteria — a rule-based ledger that replaces guesswork with
              transparent, weighted scoring.
            </p>
            <div className="mt-8 flex gap-3">
              <Link
                href="/apply"
                className="px-5 py-2.5 bg-brand text-white rounded font-medium text-sm hover:bg-brand-600 transition-colors"
              >
                Apply for a position
              </Link>
              <Link
                href="/login"
                className="px-5 py-2.5 border border-line rounded font-medium text-sm text-ink  transition-colors"
              >
                HR &amp; staff portal
              </Link>
            </div>
          </div>

          <div className="bg-panel border border-line rounded p-6 shadow-sm">
            <p className="font-mono text-xs uppercase tracking-widest text-slate mb-4 font-semibold">
              How candidates are scored
            </p>

            <ul className="space-y-3">
              {scoresheet.map(({ label, weight }) => (
                <li key={label} className="flex items-center gap-3">
                  <span className="text-sm flex-1">{label}</span>
                  <div className="score-track w-24">
                    <div className="score-fill" style={{ width: `${weight * 3}%` }} />
                  </div>
                  <span className="font-mono text-xs text-slate w-9 text-right">{weight}%</span>
                </li>
              ))}
            </ul>

            <p className="mt-5 pt-4 border-t border-line text-xs text-slate">
              {/* {openJobs} open position{openJobs === 1 ? "" : "s"} accepting applications now. */}
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t border-line py-6">
        <p className="text-center text-xs text-slate font-mono">
          Digital Chances · Nairobi · Employee Vetting &amp; Appraisal Management System
        </p>
      </footer>
    </main>
  );
}
