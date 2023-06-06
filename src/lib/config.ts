export interface Config {
  apiKey?: string
  textAlign?: string
  v_align?: string
  whiteSpace?: string
  recogLang?: string
  transLang?: string
  bgcolor?: string
  size1?: number
  weight1?: number
  color1?: string
  st_color1?: string
  st_width1?: number
  size2?: number
  weight2?: number
  color2?: string
  st_color2?: string
  st_width2?: number
  timer?: number
  phraseSepTime?: number
  speech_text_font_selector?: string
  trans_text_font_selector?: string
  speech_text_font?: string
  trans_text_font?: string
}

export const ConfigKeys = [
  'apiKey',
  'textAlign',
  'v_align',
  'whiteSpace',
  'recogLang',
  'transLang',
  'bgcolor',
  // recognition language text settings
  'size1',
  'weight1',
  'color1',
  'st_color1',
  'st_width1',
  // translated language text settings
  'size2',
  'weight2',
  'color2',
  'st_color2',
  'st_width2',
  'timer',
  'phraseSepTime',
  'speech_text_font_selector',
  'trans_text_font_selector',
  'speech_text_font',
  'trans_text_font',
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
