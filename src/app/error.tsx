'use client';
export default function Error({error,reset}:{error:Error;reset:()=>void}){
  return <div className="flex min-h-screen flex-col items-center justify-center bg-bg-primary text-center"><div className="text-5xl">⚠️</div><h1 className="mt-4 font-display text-2xl text-text-primary">出了点问题</h1><p className="mt-2 text-text-secondary">{error.message||'未知错误'}</p><button onClick={reset} className="mt-6 rounded-full border border-accent px-6 py-2 text-accent transition-colors hover:bg-accent hover:text-bg-primary">重试</button></div>;
}
