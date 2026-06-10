interface SectionHeadingProps {
  title: string
}

export function SectionHeading({ title }: SectionHeadingProps) {
  return (
    <div className="mb-4 flex items-center gap-4">
      <h2 className="text-xl font-bold uppercase">{title}</h2>
      <div className="flex-grow border-t border-dashed border-white" />
    </div>
  )
}
