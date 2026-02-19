import { useState, useMemo } from "react"
import { Copy } from "lucide-react"

type Props = {
  tokens: Record<string, string>
  format: "css" | "json" | "tailwind"
}

export function TokenOutput({ tokens, format }: Props) {
  const [showToast, setShowToast] = useState(false)

  const output = useMemo(() => {
    if (format === "css") {
      return Object.entries(tokens)
        .map(([k, v]) => `--color-${k}: ${v};`)
        .join("\n")
    }

    if (format === "json") {
      return JSON.stringify(tokens, null, 2)
    }

    if (format === "tailwind") {
      return Object.entries(tokens)
        .map(([k]) => `${k}: "var(--color-${k})"`)
        .join(",\n")
    }

    return ""
  }, [tokens, format])

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output)

    // Trigger toast visibility
    setShowToast(true)
    setTimeout(() => setShowToast(false), 1800)
  }

  return (
    <div className="relative space-y-4 p-6">
      {/* Card */}
      <div className="ui-card">
        <div className="ui-card-header">
          <h3 className="ui-card-title">Generated Tokens</h3>
        </div>

        <pre className="ui-code-block">{output}</pre>

        <div className="flex justify-end">
          <button onClick={handleCopy} className="">
            <Copy className="ui-icon" />
            Copy
          </button>
        </div>
      </div>

      {/* Toast */}
      {showToast && <div className="ui-toast">Copied to clipboard</div>}
    </div>
  )
}
