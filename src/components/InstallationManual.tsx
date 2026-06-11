interface InstallationManualProps {
  steps: string[]
}

export function InstallationManual({ steps }: InstallationManualProps) {
  return (
    <div className="terminal-border p-3 sm:p-6">
      <h3 className="mb-3 border-b border-white pb-2 text-base font-bold sm:mb-4 sm:text-xl">
        INSTALLATION_MANUAL
      </h3>
      <ul className="list-none space-y-1.5 text-[0.65rem] leading-relaxed tracking-wide sm:space-y-2 sm:text-xs sm:tracking-widest">
        {steps.map((step) => (
          <li key={step} className="break-words">
            - {step}
          </li>
        ))}
      </ul>
    </div>
  )
}
