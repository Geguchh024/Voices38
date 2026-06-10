export function AboutVoices38() {
  return (
    <div className="space-y-6">
      <div className="terminal-border p-6">
        <h3 className="mb-4 border-b border-white pb-2 text-xl font-bold">WHO_IS_VOICES38</h3>
        <p className="text-sm leading-relaxed tracking-wide">
          VOICES38 is an independent game design studio operating through a retro-terminal release
          hub. Built for players who appreciate raw, technical presentation and underground
          distribution culture, the project documents shipped games, prototypes, and works still
          moving through development.
        </p>
      </div>

      <div className="terminal-border p-6">
        <h3 className="mb-4 border-b border-white pb-2 text-xl font-bold">WHAT_WE_DO</h3>
        <ul className="space-y-2 text-xs tracking-widest">
          <li>- Design and release original game experiences across multiple genres</li>
          <li>- Publish finished builds through the VOICES38 secure terminal catalog</li>
          <li>- Track active development with transparent progress and ETA logs</li>
          <li>- Maintain a growing archive of past releases for long-term access</li>
          <li>- Support community-backed hardware and testing through donations</li>
        </ul>
      </div>

      <div className="terminal-border p-6">
        <h3 className="mb-4 border-b border-white pb-2 text-xl font-bold">OPERATING_FOCUS</h3>
        <div className="grid grid-cols-1 gap-4 text-xs tracking-widest md:grid-cols-3">
          <div className="border border-white/20 p-3">
            <p className="mb-2 font-bold">RELEASES</p>
            <p className="opacity-80">Polished games ready to download, install, and play.</p>
          </div>
          <div className="border border-white/20 p-3">
            <p className="mb-2 font-bold">IN_PROGRESS</p>
            <p className="opacity-80">Live prototypes with version tags, progress bars, and ETAs.</p>
          </div>
          <div className="border border-white/20 p-3">
            <p className="mb-2 font-bold">ARCHIVE</p>
            <p className="opacity-80">Historical catalog of older VOICES38 builds and experiments.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
