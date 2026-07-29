import Image from "next/image";
import Link from "next/link";

export default function LandingHeader() {
    return (
        <header className="border-b border-line bg-panel">
            <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
                <div className="flex items-center jusify-center gap-2">
                    <Image
                        src="/logoipsum.png"
                        alt="logo"
                        width="36"
                        height="36"
                    />

                    <div className="flex flex-col">
                        <p className="font-display font-semibold tracking-tight">Digital Chances</p>
                        <p className="text-xs text-slate-500 font-mono">HR Ledger System</p>
                    </div>

                </div>

                <Link
                    href="/login"
                    className="text-sm font-medium text-brand"
                >
                    Staff sign in →
                </Link>
            </div>
        </header>
    )
}
