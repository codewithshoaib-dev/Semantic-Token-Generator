import { useState, useMemo } from "react"
import { Copy, Check } from "lucide-react"
export function TokenOutput({
  tokens,
  format
}: {
  tokens: Record<string, string>
  format: string
}) {
  const [copied, setCopied] = useState(false)

  const output = useMemo(() => {
    if (format === "css")
      return Object.entries(tokens)
        .map(([k, v]) => `--color-${k}: ${v};`)
        .join("\n")

    if (format === "tailwind")
      return Object.entries(tokens)
        .map(([k]) => `${k}: "var(--color-${k})"`)
        .join(",\n")

    return JSON.stringify(tokens, null, 2)
  }, [tokens, format])

  return (
    <div className="ui-card p-4">
      <pre className="rounded-md bg-muted p-4 text-xs font-mono text-muted-foreground overflow-x-auto">
        {output}
      </pre>

      <button
        onClick={() => {
          navigator.clipboard.writeText(output)
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
        }}
        className="ui-button ui-button-primary mt-3"
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  )
}
