import { useState, useMemo } from "react"
import { Copy } from "lucide-react"

type Props = {
  tokens: Record<string, string>
  format: "css" | "json" 
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

    return ""
  }, [tokens, format])

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 1800)
  }

  return (
    <div className="token-output-container">
      <div className="token-card">
        <header className="token-card-header">
          <h3 className="token-card-title">Generated Tokens</h3>
          <button onClick={handleCopy} className="token-copy-button ml-2">
            <Copy className="token-copy-icon " />
            Copy
          </button>
        </header>

        <pre className="token-code">{output}</pre>
      </div>

      {showToast && <div className="token-toast">Copied to clipboard</div>}
    </div>
  )
}
