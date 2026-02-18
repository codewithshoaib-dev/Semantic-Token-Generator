type ColorInputProps = {
  label: string
  value: string
  onChange: (hex: string) => void
}

export function ColorInput({ label, value, onChange }: ColorInputProps) {
  function isValidHex(v: string) {
    return /^#([0-9A-F]{3}){1,2}$/i.test(v)
  }

  return (
    <div className="ui-card overflow-hidden transition-all hover:shadow-md">
      <div className="relative h-12" style={{ background: value }} />

      <div className="relative -mt-4 mx-2 mb-2 flex items-center gap-3 rounded-lg bg-card p-3">
        <div className="relative">
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
          <div
            className="h-12 w-12 rounded-full border-2 border-border"
            style={{ background: value }}
          />
        </div>

        <div className="flex flex-1 flex-col">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            {label}
          </span>
          <input
            value={value}
            onChange={(e) => {
              const v = e.target.value
              if (isValidHex(v)) onChange(v)
            }}
            className="ui-input"
          />
        </div>
      </div>
    </div>
  )
}
