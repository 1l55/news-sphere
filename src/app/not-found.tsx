import Link from 'next/link';
export default function NotFound() {
  return <div className="flex min-h-screen flex-col items-center justify-center bg-bg-primary text-center"><div className="text-6xl">🌌</div><h1 className="mt-6 font-display text-3xl text-text-primary">页面未找到</h1><p className="mt-2 text-text-secondary">这颗星球似乎不在我们的星图之中</p><Link href="/" className="mt-6 rounded-full border border-accent px-6 py-2 text-accent transition-colors hover:bg-accent hover:text-bg-primary">返回星空</Link></div>;
}
