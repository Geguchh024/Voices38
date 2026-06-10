interface InstallationManualProps {
  steps: string[]
  note: string
}

export function InstallationManual({ steps, note }: InstallationManualProps) {
  return (
    <div className="terminal-border p-6">
      <h3 className="mb-4 border-b border-white pb-2 text-xl font-bold">INSTALLATION_MANUAL</h3>
      <ul className="list-none space-y-2 text-xs tracking-widest">
        {steps.map((step) => (
          <li key={step}>- {step}</li>
        ))}
        <li className="pt-4 text-xs opacity-60">{note}</li>
      </ul>
    </div>
  )
}
