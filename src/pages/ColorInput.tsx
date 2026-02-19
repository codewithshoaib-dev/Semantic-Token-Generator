type ColorInputProps = {
  label: string
  value: string
  onChange: (hex: string) => void
}

export function ColorInput({ label, value, onChange }: ColorInputProps) {
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
    <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-all hover:shadow-md">
      <div
        className="relative h-5 overflow-hidden"
        style={{ background: value }}
      >
        <div
          className="absolute -right-4 -bottom-4 h-10 w-10 rounded-full opacity-30"
          style={{ background: value, filter: "brightness(0.6)" }}
        />
      </div>

      <div className="relative mt-2 mx-2 mb-2 flex items-center gap-3 rounded-lg bg-card p-3">
        <div className="relative shrink-0">
          <input
            type="color"
            value={value}
            onChange={handlePicker}
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
            aria-label={`Pick ${label} color`}
          />
          <div
            className="h-12 w-12 rounded-full border-2 border-border shadow-sm transition-transform hover:scale-110"
            style={{ background: value }}
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">
            {label}
          </span>
          <input
            type="text"
            value={value}
            onChange={handleText}
            spellCheck={false}
            className="min-w-0 bg-transparent font-mono text-sm font-medium text-foreground outline-none placeholder:text-muted-foreground/40"
          />
        </div>
      </div>
    </div>
  )
}
