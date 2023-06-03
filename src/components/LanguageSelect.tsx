import Select, { GroupBase, Props } from 'react-select'
import logger from '../lib/logger'

export type LanguageType = 'transcribe' | 'translate'

export interface LanguageSelectProps {
  defaultVal?: string // Allows passing short language code instead of full react-select OptionType
  languageType?: LanguageType
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
  de: ['German', 'Deutsch'],
  es: ['Spanish', 'Español'],
  fi: ['Finnish', 'Suomi'],
  fr: ['French', 'Français'],
  id: ['Indonesian', 'Bahasa Indonesia'],
  it: ['Italian', 'Italiano'],
  pl: ['Polish', 'Polski'],
  pt: ['Portuguese', 'Português'],
  ru: ['Russian', 'Русский'],
  nl: ['Dutch', 'Nederlands'],
  no: ['Norwegian', 'Norsk'],
  so: ['Somali', 'Soomaaliga'],
  sv: ['Swedish', 'Svenska'],
  th: ['Thai', 'ไทย'],
  tr: ['Turkish', 'Türkçe'],
  uk: ['Ukrainian', 'Українська'],
  vi: ['Vietnamese', 'Tiếng Việt'],
  zh: ['Chinese (Simplified)', '中文'],
  'zh-TW': ['Chinese (Traditional)', '中文(台灣)'],
}

// For simplicity, for now set languages to be the same subset for transcription/translation
const transcribeLanguages = translateLanguages

// ref: https://stackoverflow.com/questions/66348283/
export function LanguageSelect<
  OptionType,
  IsMulti extends boolean = false,
  GroupType extends GroupBase<OptionType> = GroupBase<OptionType>
>({
  languageType = 'translate',
  defaultVal = 'en',
  ...props
}: Props<OptionType, IsMulti, GroupType> & LanguageSelectProps) {
  // react-select: https://github.com/JedWatson/react-select#readme
  const languages = languageType === 'translate' ? translateLanguages : transcribeLanguages
  // eslint-disable-next-line
  // @ts-ignore
  const defaultLabel = languages[defaultVal][0]
  // eslint-disable-next-line
  // @ts-ignore
  const defaultValueOptionType: OptionType = {
    key: defaultVal,
    label: defaultLabel,
  }
  logger.log('LanguageSelect: defaultVal: ' + defaultVal + ', label: ' + defaultLabel)
  // eslint-disable-next-line
  // @ts-ignore
  const languageOptions: OptionType[] = Object.entries(languages).map(([key, value]) => {
    return {
      value: key,
      label: value[0],
    }
  })

  return (
    <>
      <Select
        className="w-64"
        options={languageOptions}
        onChange={props?.onChange}
        defaultValue={defaultValueOptionType}
        isSearchable
        components={{
          // Hide dropdown indicator to match fontpicker
          IndicatorSeparator: () => null,
          DropdownIndicator: () => null,
        }}
        /*
        styles={{
          control: base => ({
            ...base,
            '&:active': {
              border: '1px solid #000',
            },
            '&:focus': {
              border: '1px solid #000',
            }
          })
        }}
        */
      />
    </>
  )
}
