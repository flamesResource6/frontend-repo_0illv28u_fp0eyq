import { useEffect, useState } from 'react'

export default function Header() {
  const [backendUrl, setBackendUrl] = useState('')
  useEffect(() => {
    setBackendUrl(import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000')
  }, [])
  return (
    <header className="sticky top-0 z-10 backdrop-blur bg-slate-900/60 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300 font-bold">AI</div>
          <div>
            <h1 className="text-white font-semibold leading-tight">Attendance Dashboard</h1>
            <p className="text-xs text-blue-200/70">Backend: {backendUrl}</p>
          </div>
        </div>
        <a href="/test" className="text-blue-300 hover:text-white text-sm">Health Check</a>
      </div>
    </header>
  )
}
