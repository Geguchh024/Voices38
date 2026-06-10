interface IsoDetailsProps {
  isoImage: string
  blake3Hash: string
}

export function IsoDetails({ isoImage, blake3Hash }: IsoDetailsProps) {
  return (
    <section className="terminal-border p-4 text-xs tracking-widest opacity-70">
      <div className="flex flex-col justify-between gap-2 md:flex-row">
        <span>ISO_IMAGE: {isoImage}</span>
        <span>Blake3 HASH: {blake3Hash}</span>
      </div>
    </section>
  )
}
