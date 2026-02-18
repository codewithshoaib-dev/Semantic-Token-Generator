import { useState } from "react"
import { Copy, Check } from "lucide-react"

export function TokenOutput({
  tokens,
  format
}: {
  tokens: Record<string, string>
  format: string
}) {
  const [copied, setCopied] = useState(false)

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

  const handleCopy = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <pre className="text-xs overflow-x-auto rounded-md bg-muted p-4 font-mono text-muted-foreground">
        {output}
      </pre>
      <button
        onClick={handleCopy}
        className="mt-3 flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:opacity-90 active:scale-95"
      >
        {copied ? (
          <>
            <Check className="h-4 w-4" />
            Copied!
          </>
        ) : (
          <>
            <Copy className="h-4 w-4" />
            Copy
          </>
        )}
      </button>
    </div>
  )
}
