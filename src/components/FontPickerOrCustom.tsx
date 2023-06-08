import FontPicker from 'react-fontpicker-ts-lite'
import 'react-fontpicker-ts-lite/dist/index.css'
//import FontPicker from 'react-fontpicker-ts' // For more fonts
//import 'react-fontpicker-ts/dist/index.css'
import './FontPicker.css' // Custom styling to match react-select somewhat
import { Input } from './Input'

export interface FontPickerOrCustomProps {
  id?: string
  defaultValue?: string
  defaultValueCustom?: string
  onChange?: (font: string) => void
  onChangeCustom?: (font: string) => void
  useCustom?: boolean
  onToggleCustom?: (useCustom: boolean) => void
}

export function FontPickerOrCustom(props: FontPickerOrCustomProps) {
  const {
    id,
    defaultValue,
    defaultValueCustom,
    onChange,
    onChangeCustom,
    useCustom,
    onToggleCustom,
  } = props

  const handleChange = (font: string) => {
    onChange?.(font)
  }

  const handleChangeCustom = (e: any) => {
    const newValue = e?.target?.value ?? ''
    onChangeCustom?.(newValue)
  }

  const handleChangeCheckbox = () => {
    const newValue = !useCustom
    onToggleCustom?.(newValue)
  }

  const customInputId = id ? id + '-custom' : undefined
  const customCheckboxId = id ? id + '-useCustom' : undefined

  return (
    <>
      <FontPicker autoLoad inputId={id} defaultValue={defaultValue} value={handleChange} />
      <span className="inline-flex gap-x-4 px-1 py-2 items-end">
        <span className="inline-flex gap-x-2 mb-[0.125rem] min-h-[1.5rem] pl-[1.5rem]">
          <input
            id={customCheckboxId}
            name={customCheckboxId}
            type="checkbox"
            checked={useCustom}
            onChange={handleChangeCheckbox}
            className="disabled:opacity-50"
          />
          <label
            className="inline-block pl-[0.15rem] hover:cursor-pointer"
            htmlFor={customCheckboxId}
          >
            Custom?
          </label>
        </span>
        <label
          className="hidden"
          htmlFor={customInputId}
        >
          <Input
            disabled={!useCustom}
            id={customInputId}
            onChange={handleChangeCustom}
            defaultValue={defaultValueCustom}
            placeholder={'Custom browser font'}
          />
        </label>
      </span>
    </>
  )
}
