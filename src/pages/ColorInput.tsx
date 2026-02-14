"use client"

type Props = {
  label: string
  value: string
  onChange: (hex: string) => void
}

export function ColorInput({ label, value, onChange }: Props) {
  function isValidHex(v: string) {
    return /^#([0-9A-F]{3}){1,2}$/i.test(v)
  }

  function handleText(e: React.ChangeEvent<HTMLInputElement>) {
    const v = e.target.value
    if (isValidHex(v)) onChange(v)
  }

  function handlePicker(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(e.target.value)
  }

  return (
    <div className="group overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
      {/* Colored header strip — mirrors PreviewCard's header */}
      <div
        className="relative h-10 overflow-hidden"
        style={{ background: value }}
      >
        <div
          className="absolute -right-3 -bottom-3 h-10 w-10 rounded-full opacity-20"
          style={{ background: value, filter: "brightness(0.6)" }}
        />
      </div>

      {/* Inner content panel — card-in-card like PreviewCard */}
      <div className="relative -mt-3 mx-2 mb-2 flex items-center gap-3 rounded-lg bg-card p-3 shadow-sm">
        {/* Circular swatch — matches PreviewCard's ColorSwatch */}
        <div className="relative flex-shrink-0">
          <input
            type="color"
            value={value}
            onChange={handlePicker}
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
            aria-label={`Pick ${label} color`}
          />
          <div
            className="h-10 w-10 rounded-full border border-border shadow-sm transition-transform hover:scale-110"
            style={{ background: value }}
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground/60">
            {label}
          </span>
          <input
            type="text"
            value={value}
            onChange={handleText}
            spellCheck={false}
            className="min-w-0 bg-transparent font-mono text-sm font-medium text-card-foreground outline-none placeholder:text-muted-foreground/40"
          />
        </div>
      </div>
    </div>
  )
}
