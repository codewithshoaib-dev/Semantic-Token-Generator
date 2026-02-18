"use client"

import { useState, useMemo } from "react"
import { generateTokens } from "@/lib/generateTokens"

import { TokenOutput } from "./TokenOutput"
import { ColorInput } from "./ColorInput"
import PreviewCard from "./PreviewCard"



export function GeneratorPage() {
  const [primary, setPrimary] = useState("#3b82f6")
  const [secondary, setSecondary] = useState("#10b981")
  const [neutral, setNeutral] = useState("#f5f7fa")
  const [mode, setMode] = useState<"light" | "dark">("light")
  const [format, setFormat] = useState<"css" | "tailwind" | "json">("css")

  const tokens = useMemo(
    () => generateTokens({ primary, secondary, neutral }),
    [primary, secondary, neutral]
  )

  return (
    <div className="flex h-screen bg-background text-foreground">
      <aside className="w-72 border-r border-border bg-card p-6 overflow-y-auto space-y-6">
        <div>
          <h2 className="ui-section-title mb-4">Pick colors</h2>
          <div className="space-y-3">
            <ColorInput label="Primary" value={primary} onChange={setPrimary} />
            <ColorInput
              label="Secondary"
              value={secondary}
              onChange={setSecondary}
            />
            <ColorInput label="Neutral" value={neutral} onChange={setNeutral} />
          </div>
        </div>

        <div>
          <h3 className="ui-section-title mb-3">Theme</h3>
          <div className="flex gap-2">
            {(["light", "dark"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`ui-button flex-1 ${
                  mode === m ? "ui-button-primary" : "ui-button-ghost"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="ui-section-title mb-3">Export</h3>
          <div className="flex flex-col gap-2">
            {(["css", "tailwind", "json"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFormat(f)}
                className={`ui-button ${
                  format === f ? "ui-button-primary" : "ui-button-ghost"
                }`}
              >
                {f.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-4xl space-y-8">
          <div>
            <h1 className="text-3xl font-bold">Token Generator</h1>
            <p className="text-muted-foreground">
              Generate production-ready color systems.
            </p>
          </div>

          <PreviewCard tokens={tokens[mode]} />
          <TokenOutput tokens={tokens[mode]} format={format} />
        </div>
      </main>
    </div>
  )
}

