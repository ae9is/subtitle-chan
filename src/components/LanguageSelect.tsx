import ReactSelect, { ActionMeta, SingleValue } from 'react-select'
import { useState } from 'react'

export type LanguageType = 'transcribe' | 'translate'

export interface LanguageSelectProps {
  defaultValue?: string // Allows passing short language code instead of full react-select OptionType
  languageType?: LanguageType
  id?: string
  onChange?: (newValue: string) => void
}

// Supported translate languages
// ref: https://cloud.google.com/translate/docs/languages
//
// Transcription languages
// ref: https://stackoverflow.com/questions/14257598
export const translateLanguages = {
  en: ['English', 'English'],
  ko: ['Korean', '한국어'],
  ja: ['Japanese', '日本語'],
  ar: ['Arabic', 'العربية'],
  zh: ['Chinese (Simplified)', '中文'],
  'zh-TW': ['Chinese (Traditional)', '中文(台灣)'],
  nl: ['Dutch', 'Nederlands'],
  de: ['German', 'Deutsch'],
  fi: ['Finnish', 'Suomi'],
  fr: ['French', 'Français'],
  id: ['Indonesian', 'Bahasa Indonesia'],
  it: ['Italian', 'Italiano'],
  pl: ['Polish', 'Polski'],
  pt: ['Portuguese', 'Português'],
  no: ['Norwegian', 'Norsk'],
  ru: ['Russian', 'Русский'],
  so: ['Somali', 'Soomaaliga'],
  es: ['Spanish', 'Español'],
  sv: ['Swedish', 'Svenska'],
  th: ['Thai', 'ไทย'],
  tr: ['Turkish', 'Türkçe'],
  uk: ['Ukrainian', 'Українська'],
  vi: ['Vietnamese', 'Tiếng Việt'],
}

// For simplicity, for now set languages to be the same subset for transcription/translation
const transcribeLanguages = translateLanguages

type Option = {
  value: string
  label: string
}

interface ArrayObjectSelectState {
  selectedOption: Option | null
}

// Extending react-select
// ref: https://stackoverflow.com/questions/66348283/
/*
export function LanguageSelect<
  OptionType,
  IsMulti extends boolean = false,
  GroupType extends GroupBase<OptionType> = GroupBase<OptionType>
>({
  languageType = 'translate',
  defaultVal = 'en',
  id,
  ...props
}: Props<OptionType, IsMulti, GroupType> & LanguageSelectProps) {
*/

// ref: https://stackoverflow.com/a/74143834
export function LanguageSelect({
  languageType = 'translate',
  defaultValue = 'en',
  onChange,
  id,
  ...props
}: LanguageSelectProps) {

  const languages = languageType === 'translate' ? translateLanguages : transcribeLanguages
  let defaultLabel = 'English'
  if (Object.prototype.hasOwnProperty.call(languages, defaultValue)) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    defaultLabel = languages[defaultValue][0]
  }
  const languageOptions: Option[] = Object.entries(languages).map(([key, value]) => {
    return {
      value: key || '',
      label: value[0] || '',
    }
  })

  const defaultOption: Option = {
    value: defaultValue || '',
    label: defaultLabel || '',
  }

  const [state, setState] = useState<ArrayObjectSelectState>({
    selectedOption: defaultOption,
  })

  const handleChange = (newValue: SingleValue<Option>, meta: ActionMeta<Option>) => {
    if (newValue !== null) {
      setState({ selectedOption: newValue })
      onChange?.(newValue.value)
    }
  }

  return (
    <>
      <ReactSelect
        inputId={id}
        options={languageOptions}
        getOptionLabel={(opt: Option) => opt.label}
        getOptionValue={(opt: Option) => opt.value}
        value={state.selectedOption}
        onChange={handleChange}
        isSearchable
        components={{
          // Hide dropdown indicator to match fontpicker
          IndicatorSeparator: () => null,
          DropdownIndicator: () => null,
        }}
        className="w-64"
//        styles={{
//          control: base => ({
//            ...base,
//            '&:active': {
//              border: '1px solid #000',
//            },
//            '&:focus': {
//              border: '1px solid #000',
//            }
//          })
//        }}
        {...props}
      />
    </>
  )
}
