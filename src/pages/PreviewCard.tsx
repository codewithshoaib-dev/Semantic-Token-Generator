import { ArrowRight } from "lucide-react"

function ColorSwatch({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="h-16 w-16 rounded-lg border border-border shadow-sm transition-transform hover:scale-110"
        style={{ background: color }}
        role="img"
        aria-label={`${label} color swatch: ${color}`}
      />
      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <span className="font-mono text-[10px] text-muted-foreground/60">
        {color}
      </span>
    </div>
  )
}

type PreviewCardProps = {
  tokens: Record<string, string>
}

function PreviewCard({ tokens }: PreviewCardProps) {
  const style = {
    "--color-bg": tokens.bg,
    "--color-surface": tokens.surface,
    "--color-text": tokens.text,
    "--color-primary": tokens.primary
  } as React.CSSProperties

  return (
    <div style={style} className="w-full max-w-lg">
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-lg">
        <div
          className="relative h-32 overflow-hidden"
          style={{ background: "var(--color-bg)" }}
        >
          <div
            className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full opacity-20"
            style={{ background: "var(--color-primary)" }}
          />
          <div
            className="absolute -top-5 -left-5 h-24 w-24 rounded-full opacity-10"
            style={{ background: "var(--color-primary)" }}
          />
        </div>

        <div
          className="relative -mt-8 mx-4 rounded-xl p-6 shadow-sm"
          style={{
            background: "var(--color-surface)",
            color: "var(--color-text)"
          }}
        >
          <div className="mb-4 flex items-start justify-between">
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-widest opacity-50">
                Token Preview
              </p>
              <h3 className="text-xl font-bold tracking-tight text-balance">
                Design System
              </h3>
            </div>
            <div
              className="flex h-10 w-10 items-center justify-center rounded-full font-bold"
              style={{
                background: "var(--color-primary)",
                color: "var(--color-surface)"
              }}
            >
              Aa
            </div>
          </div>

          <p className="mb-6 text-sm leading-relaxed opacity-70">
            A live preview of your color tokens rendered in a real component
            layout. Tweak the values and see changes instantly.
          </p>

          <div className="mb-6 flex items-center justify-between rounded-lg bg-background/50 px-4 py-5">
            <ColorSwatch color={tokens.bg} label="BG" />
            <ColorSwatch color={tokens.surface} label="Surface" />
            <ColorSwatch color={tokens.text} label="Text" />
            <ColorSwatch color={tokens.primary} label="Primary" />
          </div>

          <div className="flex gap-3">
            <button
              className="group flex flex-1 items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-all hover:opacity-90 active:scale-95"
              style={{
                background: "var(--color-primary)",
                color: "var(--color-surface)"
              }}
            >
              Apply Theme
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
            <button
              className="flex items-center justify-center rounded-lg border px-5 py-3 text-sm font-semibold transition-all hover:bg-background/50 active:scale-95"
              style={{
                borderColor: "var(--color-primary)",
                color: "var(--color-primary)"
              }}
            >
              Preview
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between px-6 py-4">
          <span className="text-xs text-muted-foreground">4 tokens active</span>
          <div className="flex -space-x-1.5">
            {[tokens.bg, tokens.surface, tokens.text, tokens.primary].map(
              (c, i) => (
                <div
                  key={i}
                  className="h-5 w-5 rounded-full border-2 border-card"
                  style={{ background: c }}
                />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PreviewCard