import { useEffect, useState } from 'react'

export default function RoomsOverview() {
  const [data, setData] = useState({ rooms: [] })
  const [loading, setLoading] = useState(true)

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const load = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${baseUrl}/dashboard/status`)
      const json = await res.json()
      setData(json)
    } catch (e) {
      setData({ rooms: [] })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
    const id = setInterval(load, 5000)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white text-xl font-semibold">Rooms</h2>
        <button onClick={load} className="px-3 py-1.5 text-sm rounded bg-blue-500 hover:bg-blue-600 text-white">Refresh</button>
      </div>
      {loading ? (
        <p className="text-blue-200/70">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.rooms.map((r) => (
            <div key={r.id} className="rounded-lg border border-white/10 bg-slate-800/50 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">{r.name}</p>
                  <p className="text-xs text-blue-200/70">{r.present_count} / {r.total} present</p>
                </div>
                <div className={`px-2 py-1 rounded text-xs ${r.present_count>0? 'bg-green-500/20 text-green-300':'bg-yellow-500/20 text-yellow-300'}`}>{r.present_count>0? 'Active':'Idle'}</div>
              </div>
            </div>
          ))}
          {data.rooms.length===0 && (
            <div className="col-span-full text-blue-200/70">No rooms yet. Add rooms via the API, then run an Edge Agent per room.</div>
          )}
        </div>
      )}
    </section>
  )
}
