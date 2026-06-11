interface SectionHeadingProps {
  title: string
}

export function SectionHeading({ title }: SectionHeadingProps) {
  return (
    <div className="mb-3 flex items-center gap-2 sm:mb-4 sm:gap-4">
      <h2 className="min-w-0 text-sm font-bold break-words uppercase sm:text-lg md:text-xl">
        {title}
      </h2>
      <div className="hidden min-w-[2rem] flex-grow border-t border-dashed border-white sm:block" />
    </div>
  )
}
