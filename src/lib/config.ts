export interface Config {
  apiKey?: string
  recogLang?: string
  transLang?: string
  bgColor?: string
  recogFont?: string
  recogFontSize?: string
  recogFontWeight?: string
  recogFontColor?: string
  recogFontStrokeColor?: string
  recogFontStrokeWidth?: string
  transFont?: string
  transFontSize?: string
  transFontWeight?: string
  transFontColor?: string
  transFontStrokeColor?: string
  transFontStrokeWidth?: string
  phraseSepTime?: number
  deleteDelay?: number
  textAlignH?: string
  textAlignV?: string
}

export const defaults = {
  recogLang: 'ko',
  transLang: 'en',
  bgColor: '#00ff00',
  recogFont: '',
  recogFontSize: '36',
  recogFontWeight: '700',
  recogFontColor: '#ffffff',
  recogFontStrokeColor: '#000000',
  recogFontStrokeWidth: '2',
  transFont: '',
  transFontSize: '36',
  transFontWeight: '700',
  transFontColor: '#ffffff',
  transFontStrokeColor: '#000000',
  transFontStrokeWidth: '2',
  phraseSepTime: 750,
  deleteDelay: 30000,
  textAlignH: 'left',
  textAlignV: 'top',
}

export const ConfigKeys = [
  'apiKey',
  'recogLang',
  'transLang',
  'bgColor',
  'recogFont',
  'recogFontSize',
  'recogFontWeight',
  'recogFontColor',
  'recogFontStrokeColor',
  'recogFontStrokeWidth',
  'transFont',
  'transFontSize',
  'transFontWeight',
  'transFontColor',
  'transFontStrokeColor',
  'transFontStrokeWidth',
  'phraseSepTime',
  'deleteDelay',
  'textAlignH',
  'textAlignV',
]

export function saveConfig(config: Config) {
  // Sensitive values like API keys shouldn't be stored in local storage.
  //  User can use browser's password manager if desired.
  const { apiKey, ...rest } = config
  localStorage.subtitleChanConfig = JSON.stringify(rest)
}

export function getConfig() {
  let config
  try {
    config = JSON.parse(localStorage.subtitleChanConfig || '{}')
  } catch (e) {
    config = {}
  }
  return config
}

export const toUrlParams = (config: Config) => {
  const pairs: [string, string][] = Object.entries(config).map(([key, value]) => {
    return [key, JSON.stringify(value)]
  })
  const params = new URLSearchParams(pairs)
  return '?' + params.toString() ?? ''
}
