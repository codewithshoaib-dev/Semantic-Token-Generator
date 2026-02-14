import { useState, useMemo } from "react";
import { generateTokens } from "@lib/generateTokens";
import { ColorInput } from "./ColorInput";
import { PreviewCard } from "./PreviewCard";
import { TokenOutput } from "./TokenOutput";


export function GeneratorPage() {
  const [primary, setPrimary] = useState("#3b82f6");
  const [secondary, setSecondary] = useState("#10b981");
  const [neutral, setNeutral] = useState("#f5f7fa");
  const [mode, setMode] = useState<"light" | "dark">("light");
  const [format, setFormat] = useState<"css" | "tailwind" | "json">("css");

  const tokens = useMemo(
    () => generateTokens({ primary, secondary, neutral }),
    [primary, secondary, neutral]
  );

  return (
    <div className="grid grid-cols-[280px_1fr] h-screen">
      <aside className="p-4 space-y-4 border-r">
        <ColorInput label="Primary" value={primary} onChange={setPrimary} />
        <ColorInput label="Secondary" value={secondary} onChange={setSecondary} />
        <ColorInput label="Neutral" value={neutral} onChange={setNeutral} />

        <div className="flex gap-2">
          <button onClick={() => setMode("light")}>Light</button>
          <button onClick={() => setMode("dark")}>Dark</button>
        </div>

        <div className="flex gap-2">
          <button onClick={() => setFormat("css")}>CSS</button>
          <button onClick={() => setFormat("tailwind")}>Tailwind</button>
          <button onClick={() => setFormat("json")}>JSON</button>
        </div>
      </aside>

      <main className="p-6 space-y-6">
        <PreviewCard tokens={tokens[mode]} />
        <TokenOutput tokens={tokens[mode]} format={format} />
      </main>
    </div>
  );
}
