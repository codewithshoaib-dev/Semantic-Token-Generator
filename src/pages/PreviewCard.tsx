type Props = {
  tokens: Record<string, string>
}

export function PreviewCard({ tokens }: Props) {
  const style = {
    "--color-bg": tokens.bg,
    "--color-surface": tokens.surface,
    "--color-text": tokens.text,
    "--color-primary": tokens.primary
  } as React.CSSProperties

  return (
    <div style={style} className="p-6 rounded-lg border">
      <div
        style={{
          background: "var(--color-surface)",
          color: "var(--color-text)"
        }}
        className="p-4 rounded space-y-3"
      >
        <h3 className="text-lg font-semibold">Preview Card</h3>
        <p>This is real token usage.</p>
        <button
          style={{ background: "var(--color-primary)", color: "white" }}
          className="px-4 py-2 rounded"
        >
          Primary Action
        </button>
      </div>
    </div>
  )
}
