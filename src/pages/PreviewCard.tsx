import { ArrowRight } from "lucide-react"

function PreviewHeader() {
  return (
    <div className="mb-4 flex justify-between items-start">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Token Preview
        </p>
        <h3 className="text-xl font-bold text-foreground">Design System</h3>
      </div>
      <div className="h-10 w-10 flex items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
        Aa
      </div>
    </div>
  )
}

function SwatchRow({ tokens }: { tokens: Record<string, string> }) {
  return (
    <div className="flex justify-between rounded-lg bg-background/50 px-4 py-5">
      {Object.entries(tokens).map(([k, v]) => (
        <div key={k} className="flex flex-col items-center gap-1">
          <div className="ui-swatch" style={{ background: v }} />
          <span className="text-xs uppercase text-muted-foreground">{k}</span>
        </div>
      ))}
    </div>
  )
}

function PreviewCard({ tokens }: { tokens: Record<string, string> }) {
  const style = {
    "--color-bg": tokens.bg,
    "--color-surface": tokens.surface,
    "--color-text": tokens.text,
    "--color-primary": tokens.primary
  } as React.CSSProperties

  return (
    <div style={style} className="max-w-lg">
      <div className="ui-card overflow-hidden shadow-lg">
        <div className="h-32" style={{ background: "var(--color-bg)" }} />

        <div
          className="relative -mt-8 mx-4 rounded-xl p-6"
          style={{
            background: "var(--color-surface)",
            color: "var(--color-text)"
          }}
        >
          <PreviewHeader />

          <p className="mb-6 text-sm opacity-70">
            Live preview of your generated color tokens.
          </p>

          <SwatchRow tokens={tokens} />

          <div className="mt-6 flex gap-3">
            <button
              className="ui-button ui-button-primary flex-1"
              style={{
                background: "var(--color-primary)",
                color: "var(--color-surface)"
              }}
            >
              Apply Theme
              <ArrowRight className="h-4 w-4" />
            </button>

            <button
              className="ui-button border"
              style={{
                borderColor: "var(--color-primary)",
                color: "var(--color-primary)"
              }}
            >
              Preview
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}



export { PreviewHeader, SwatchRow}
export default PreviewCard