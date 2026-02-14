export function TokenOutput({
  tokens,
  format
}: {
  tokens: Record<string, string>
  format: string
}) {
  let output = ""

  if (format === "css") {
    output = Object.entries(tokens)
      .map(([k, v]) => `--color-${k}: ${v};`)
      .join("\n")
  }

  if (format === "json") {
    output = JSON.stringify(tokens, null, 2)
  }

  if (format === "tailwind") {
    output = Object.entries(tokens)
      .map(([k]) => `${k}: "var(--color-${k})"`)
      .join(",\n")
  }

  return (
    <div className="ui-card p-4">
      <pre className="text-sm whitespace-pre-wrap">{output}</pre>
      <button
        className="ui-button mt-2"
        onClick={() => navigator.clipboard.writeText(output)}
      >
        Copy
      </button>
    </div>
  )
}
