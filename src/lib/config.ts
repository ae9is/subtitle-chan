import { getAllParams, parseBoolean, parseNumber } from '../lib/url'

export interface Config {
  apiKey?: string
  recogLang?: string
  transLang?: string
  bgColor?: string
  recogFont?: string
  recogFontSize?: number
  recogFontWeight?: number
  recogFontColor?: string
  recogFontStrokeColor?: string
  recogFontStrokeWidth?: number
  transFont?: string
  transFontSize?: number
  transFontWeight?: number
  transFontColor?: string
  transFontStrokeColor?: string
  transFontStrokeWidth?: number
  phraseSepTime?: number
  deleteDelay?: number
  textAlignH?: string
  textAlignV?: string
  showFontTest?: boolean
  hideConfig?: boolean
}

export const defaults = {
  recogLang: 'ko',
  transLang: 'en',
  bgColor: '#00ff00',
  recogFont: 'Ubuntu',
  recogFontSize: 34,
  recogFontWeight: 700,
  recogFontColor: '#ffffff',
  recogFontStrokeColor: '#000000',
  recogFontStrokeWidth: 2,
  transFont: 'Ubuntu',
  transFontSize: 34,
  transFontWeight: 700,
  transFontColor: '#ffffff',
  transFontStrokeColor: '#000000',
  transFontStrokeWidth: 2,
  phraseSepTime: 750,
  deleteDelay: 30000,
  textAlignH: 'left',
  textAlignV: 'top',
  showFontTest: false,
  hideConfig: false,
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
  'showFontTest',
  'hideConfig',
]

// Avoid race conditions by setting and getting localstorage keys individually
export function saveConfig(key: string, value: any) {
  try {
    if (value === null || value === undefined) {
      localStorage.removeItem(key)
    } else {
      localStorage.setItem(key, JSON.stringify(value))
    }
  } catch (e) {
    return
  }
}

export function getConfig(key: string) {
  let value
  try {
    value = JSON.parse(localStorage.getItem(key) || '') || undefined
  } catch (e) {
    value = undefined
  }
  return value
}

export function getAllConfig() {
  const config: Config = {
    phraseSepTime: getConfig('phraseSepTime'),
    recogLang: getConfig('recogLang'),
    transLang: getConfig('transLang'),
    recogFont: getConfig('recogFont'),
    transFont: getConfig('transFont'),
    recogFontSize: getConfig('recogFontSize'),
    recogFontWeight: getConfig('recogFontWeight'),
    recogFontStrokeWidth: getConfig('recogFontStrokeWidth'),
    transFontSize: getConfig('transFontSize'),
    transFontWeight: getConfig('transFontWeight'),
    transFontStrokeWidth: getConfig('transFontStrokeWidth'),
    recogFontColor: getConfig('recogFontColor'),
    transFontColor: getConfig('transFontColor'),
    recogFontStrokeColor: getConfig('recogFontStrokeColor'),
    transFontStrokeColor: getConfig('transFontStrokeColor'),
    bgColor: getConfig('bgColor'),
    showFontTest: getConfig('showFontTest'),
    hideConfig: getConfig('hideConfig'),
  }
  return config
}

export function toUrlParams(config: Config) {
  const pairs: [string, string][] = Object.entries(config)
    .map(([key, value]) => {
      if (key && value) {
        return [key, '' + value]
      }
      return undefined
    })
    .filter((x): x is [string, string] => !!x)
  const params = new URLSearchParams(pairs)
  return '?' + params.toString() ?? ''
}

export function getConfigFromUrlParams() {
  const params = getAllParams()
  const config: Config = {
    phraseSepTime: parseNumber(params.get('phraseSepTime')),
    recogLang: params.get('recogLang') || undefined,
    transLang: params.get('transLang') || undefined,
    recogFont: params.get('recogFont') || undefined,
    transFont: params.get('transFont') || undefined,
    recogFontSize: parseNumber(params.get('recogFontSize')),
    recogFontWeight: parseNumber(params.get('recogFontWeight')),
    recogFontStrokeWidth: parseNumber(params.get('recogFontStrokeWidth')),
    transFontSize: parseNumber(params.get('transFontSize')),
    transFontWeight: parseNumber(params.get('transFontWeight')),
    transFontStrokeWidth: parseNumber(params.get('transFontStrokeWidth')),
    recogFontColor: params.get('recogFontColor') || undefined,
    transFontColor: params.get('transFontColor') || undefined,
    recogFontStrokeColor: params.get('recogFontStrokeColor') || undefined,
    transFontStrokeColor: params.get('transFontStrokeColor') || undefined,
    bgColor: params.get('bgColor') || undefined,
    showFontTest: parseBoolean(params.get('showFontTest')),
    hideConfig: parseBoolean(params.get('hideConfig')),
  }
  return config
}

export function saveConfigFromUrlParams() {
  const paramsConfig = getConfigFromUrlParams()
  Object.entries(paramsConfig).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      saveConfig(key, value)
    }
  })
}
