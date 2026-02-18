// src/lib/generateTokens.ts
import * as culori from "culori"

type Inputs = {
  primary: string
  secondary?: string
  neutral: string
}

// Helper: ensure minimum contrast (4.5:1)
function enforceContrast(fg: string, bg: string, minRatio = 4.5) {
  let ratio = culori.wcagContrast(fg, bg)
  let fgOklch = culori.oklch(fg)
//   const bgOklch = culori.oklch(bg)

  // adjust lightness until contrast is acceptable
  while (ratio < minRatio) {
    if (!fgOklch) break
    fgOklch.l = Math.min(Math.max(fgOklch.l + 0.02, 0), 1) // increment lightness
    fg = culori.formatHex(culori.oklch(fgOklch))
    ratio = culori.wcagContrast(fg, bg)
  }
  return fg
}

export function generateTokens({ primary, secondary, neutral }: Inputs) {
  const p = culori.oklch(primary)
  const s = secondary ? culori.oklch(secondary) : undefined
  const n = culori.oklch(neutral)

  function make(l: number, base: any) {
    return culori.formatHex(culori.oklch({ l, c: base.c, h: base.h }))
  }

  // Light mode tokens
  const light = {
    bg: make(0.97, n),
    surface: make(1, n),
    text: enforceContrast(make(0.15, n), make(0.97, n)),
    heading: enforceContrast(make(0.07, n), make(0.97, n)),
    primary: make(0.55, p),
    primaryHover: make(0.48, p),
    secondary: s ? make(0.55, s) : undefined
  }

  // Dark mode tokens
  const dark = {
    bg: make(0.12, n),
    surface: make(0.18, n),
    text: enforceContrast(make(0.95, n), make(0.12, n)),
    heading: enforceContrast(make(1, n), make(0.12, n)),
    primary: make(0.65, p),
    primaryHover: make(0.72, p),
    secondary: s ? make(0.65, s) : undefined
  }

  return { light, dark }
}
