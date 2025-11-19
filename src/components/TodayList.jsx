import { useEffect, useState } from 'react'

export default function TodayList() {
  const [rows, setRows] = useState([])
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const load = async () => {
    try {
      const res = await fetch(`${baseUrl}/attendance/today`)
      const json = await res.json()
      setRows(json)
    } catch (e) {
      setRows([])
    }
  }

  useEffect(() => {
    load()
    const id = setInterval(load, 5000)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="max-w-6xl mx-auto px-4 pb-16">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-white font-semibold">Today\'s Attendance</h3>
        <a href={`${baseUrl}/attendance/export.csv`} className="text-sm text-blue-300 hover:text-white">Export CSV</a>
      </div>
      <div className="overflow-hidden rounded-lg border border-white/10">
        <table className="w-full text-sm">
          <thead className="bg-slate-800/70 text-blue-200">
            <tr>
              <th className="text-left px-3 py-2">Time (UTC)</th>
              <th className="text-left px-3 py-2">Student ID</th>
              <th className="text-left px-3 py-2">Room ID</th>
              <th className="text-left px-3 py-2">Source</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10 bg-slate-900/30 text-blue-100">
            {rows.map((r) => (
              <tr key={r.id}>
                <td className="px-3 py-2">{new Date(r.timestamp).toLocaleString()}</td>
                <td className="px-3 py-2">{r.student_id}</td>
                <td className="px-3 py-2">{r.room_id}</td>
                <td className="px-3 py-2">{r.source}</td>
              </tr>
            ))}
            {rows.length===0 && (
              <tr><td colSpan={4} className="px-3 py-6 text-center text-blue-200/70">No marks yet today</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}
