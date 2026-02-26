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
    <div className="flex flex-col md:flex-row min-h-screen bg-background text-foreground">
      {/* Sidebar / Control Panel */}
      <aside
        className="
        relative
  md:w-72 w-full 
  md:h-screen 
  md:sticky md:top-0 
  border-b md:border-b-0 md:border-r border-border 
  bg-card p-4 md:p-6 
  flex-shrink-0 
  space-y-6
  overflow-y-auto
"
      >
        {/* Color Inputs */}
        <div>
          <h2 className="ui-section-title mb-4">Pick colors</h2>
          <div className="flex flex-col sm:gap-3 space-y-3 sm:space-y-0">
            <ColorInput label="Primary" value={primary} onChange={setPrimary} />
            <ColorInput
              label="Secondary"
              value={secondary}
              onChange={setSecondary}
            />
            <ColorInput label="Neutral" value={neutral} onChange={setNeutral} />
          </div>
        </div>

        {/* Theme Toggle */}
        <div>
          <h3 className="ui-section-title mb-3">Theme</h3>
          <div className="flex gap-2 flex-wrap">
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

        {/* Export Options */}
        <div>
          <h3 className="ui-section-title mb-3">Export</h3>
          <div className="flex gap-2 flex-wrap">
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

      {/* Main Content */}
      <main className="flex-1 flex flex-col md:flex-row gap-6 p-4 md:p-8 overflow-y-auto">
        {/* Left column: Preview */}
        <div className="flex-1 max-w-4xl space-y-8">
          <div>
            <h1 className="text-2xl font-bold">Token Generator</h1>
            <p className="text-muted-foreground">
              Generate production-ready color systems.
            </p>
          </div>

          <PreviewCard tokens={tokens[mode]} />
        </div>

        {/* Right column: Token output */}
        <div className="w-full md:w-fit shrink-0">
          <TokenOutput tokens={tokens[mode]} format={format} />
        </div>
      </main>
    </div>
  )
}
