export default function Loading() {
  return <div className="flex min-h-screen flex-col items-center justify-center bg-bg-primary"><div className="flex gap-2">{[0,1,2,3,4].map(i=><div key={i} className="h-3 w-3 animate-pulse rounded-full bg-accent" style={{animationDelay:`${i*0.15}s`}}/>)}</div><p className="mt-4 font-body text-sm text-text-secondary">正在凝聚星尘...</p></div>;
}
