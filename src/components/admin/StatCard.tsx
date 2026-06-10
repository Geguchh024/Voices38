interface StatCardProps {
  label: string
  value: number
}

export function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="terminal-border p-4">
      <div className="text-2xl font-bold tracking-widest">{value}</div>
      <div className="mt-1 text-xs tracking-widest text-gray-400">{label}</div>
    </div>
  )
}
