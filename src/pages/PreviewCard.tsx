import { ArrowRight } from "lucide-react"

function ColorSwatch({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className="h-12 w-12 rounded-lg border border-border shadow-sm transition-transform hover:scale-110"
        style={{ background: color }}
        role="img"
        aria-label={`${label} color swatch: ${color}`}
      />
      <span className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <span className="font-mono text-[8px] text-muted-foreground/60">
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
    <div className="w-full max-w-4xl max-h-screen overflow-auto p-4">
      <div style={style} className="w-full flex-shrink-0">
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-lg">
          {/* Header / hero */}
          <div
            className="relative h-24 sm:h-32 overflow-hidden"
            style={{ background: "var(--color-bg)" }}
          >
            <div
              className="absolute -bottom-8 -right-8 h-32 w-32 rounded-full opacity-20"
              style={{ background: "var(--color-primary)" }}
            />
            <div
              className="absolute -top-4 -left-4 h-16 w-16 rounded-full opacity-10"
              style={{ background: "var(--color-primary)" }}
            />
          </div>

          {/* Content */}
          <div
            className="relative -mt-6 mx-4 rounded-xl p-4 sm:p-6 shadow-sm"
            style={{
              background: "var(--color-surface)",
              color: "var(--color-text)"
            }}
          >
            {/* Header */}
            <div className="mb-3 flex items-start justify-between">
              <div>
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest opacity-50">
                  Token Preview
                </p>
                <h3 className="text-lg sm:text-xl font-bold tracking-tight text-balance">
                  Design System
                </h3>
              </div>
              <div
                className="flex h-9 w-9 items-center justify-center rounded-full font-bold text-sm sm:text-base"
                style={{
                  background: "var(--color-primary)",
                  color: "var(--color-surface)"
                }}
              >
                Aa
              </div>
            </div>

            <p className="mb-4 text-xs sm:text-sm leading-relaxed opacity-70">
              A live preview of your color tokens rendered in a real component
              layout. Tweak values and see changes instantly.
            </p>

            {/* Color Swatches */}
            <div className="mb-4 flex gap-2 overflow-x-auto">
              <ColorSwatch color={tokens.bg} label="BG" />
              <ColorSwatch color={tokens.surface} label="Surface" />
              <ColorSwatch color={tokens.text} label="Text" />
              <ColorSwatch color={tokens.primary} label="Primary" />
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                className="group flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all hover:opacity-90 active:scale-95"
                style={{
                  background: "var(--color-primary)",
                  color: "var(--color-surface)"
                }}
              >
                Apply Theme
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
              <button
                className="flex items-center justify-center rounded-lg border px-4 py-2 text-sm font-semibold transition-all hover:bg-background/50 active:scale-95"
                style={{
                  borderColor: "var(--color-primary)",
                  color: "var(--color-primary)"
                }}
              >
                Preview
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-[10px] text-muted-foreground">
              4 tokens active
            </span>
            <div className="flex -space-x-1">
              {[tokens.bg, tokens.surface, tokens.text, tokens.primary].map(
                (c, i) => (
                  <div
                    key={i}
                    className="h-4 w-4 rounded-full border-2 border-card"
                    style={{ background: c }}
                  />
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PreviewCard
