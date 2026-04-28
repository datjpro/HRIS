import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <h1>HRIS Monorepo</h1>
      <p>Scaffold for web, server, worker, and shared packages.</p>
      <ul>
        <li><Link href="/me">Employee view</Link></li>
        <li><Link href="/manager">Manager view</Link></li>
        <li><Link href="/hr">HR view</Link></li>
        <li><Link href="/ui-preview">UI preview</Link></li>
      </ul>
    </main>
  );
}

