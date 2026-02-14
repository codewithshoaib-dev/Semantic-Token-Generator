type Props = {
  label: string
  value: string
  onChange: (hex: string) => void
}

export function ColorInput({ label, value, onChange }: Props) {
  function isValidHex(v: string) {
    return /^#([0-9A-F]{3}){1,2}$/i.test(v)
  }

  function handleText(e: React.ChangeEvent<HTMLInputElement>) {
    const v = e.target.value
    if (isValidHex(v)) onChange(v)
  }

  function handlePicker(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(e.target.value)
  }

  return (
    <div className="ui-field">
      <label className="text-sm font-medium">{label}</label>

      <div className="ui-input-row">
        <input
          type="color"
          value={value}
          onChange={handlePicker}
          className="h-9 w-9 border rounded"
        />

        <input
          type="text"
          value={value}
          onChange={handleText}
          className="ui-input flex-1"
          spellCheck={false}
        />
      </div>
    </div>
  )
}
