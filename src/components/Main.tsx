import { useState } from 'react'
import FontPicker from 'react-fontpicker-ts-lite'
import 'react-fontpicker-ts-lite/dist/index.css'
import './FontPicker.css' // Custom styling to match react-select somewhat
import { defaults, getAllConfig, saveConfig } from '../lib/config'
import { Subtitler } from './Subtitler'
import { Input } from './Input'
import { Label } from './Label'
import { Range } from './Range'
import { CopyLinkButton } from './CopyLinkButton'
import { ColorInput } from './ColorInput'
import { LanguageSelect } from './LanguageSelect'

export function Main() {
  const config = getAllConfig()
  const [apiKey, setApiKey] = useState(config.apiKey)
  const minPhraseSepTime = 100
  const [phraseSepTime, setPhraseSepTime] = useState<number>(
    config.phraseSepTime || defaults.phraseSepTime
  )
  const [recogLang, setRecogLang] = useState<string>(config.recogLang || defaults.recogLang)
  const [transLang, setTransLang] = useState<string>(config.transLang || defaults.transLang)
  const [recogFont, setRecogFont] = useState<string>(config.recogFont || defaults.recogFont)
  const [transFont, setTransFont] = useState<string>(config.transFont || defaults.transFont)
  const [recogFontSize, setRecogFontSize] = useState<number>(
    config.recogFontSize ?? defaults.recogFontSize
  )
  const [recogFontWeight, setRecogFontWeight] = useState<number>(
    config.recogFontWeight ?? defaults.recogFontWeight
  )
  const [recogFontStrokeWidth, setRecogFontStrokeWidth] = useState<number>(
    config.recogFontStrokeWidth ?? defaults.recogFontStrokeWidth
  )
  const [transFontSize, setTransFontSize] = useState<number>(
    config.transFontSize ?? defaults.transFontSize
  )
  const [transFontWeight, setTransFontWeight] = useState<number>(
    config.transFontWeight ?? defaults.transFontWeight
  )
  const [transFontStrokeWidth, setTransFontStrokeWidth] = useState<number>(
    config.transFontStrokeWidth ?? defaults.transFontStrokeWidth
  )
  const [recogFontColor, setRecogFontColor] = useState<string>(
    config.recogFontColor || defaults.recogFontColor
  )
  const [transFontColor, setTransFontColor] = useState<string>(
    config.transFontColor || defaults.transFontColor
  )
  const [recogFontStrokeColor, setRecogFontStrokeColor] = useState<string>(
    config.recogFontStrokeColor || defaults.recogFontStrokeColor
  )
  const [transFontStrokeColor, setTransFontStrokeColor] = useState<string>(
    config.transFontStrokeColor || defaults.transFontStrokeColor
  )
  const [bgColor, setBgColor] = useState<string>(config.bgColor || defaults.bgColor)
  const [showFontTest, setShowFontTest] = useState<boolean>(
    config.showFontTest ?? defaults.showFontTest
  )

  const onChangeApiKey = (e: any) => {
    const newApiKey = e?.target?.value ?? ''
    setApiKey(newApiKey)
  }

  const onChangePhraseSepTime = (e: any) => {
    const newValue = e?.target?.value
    let newNum = Number(newValue) || phraseSepTime
    if (newNum < minPhraseSepTime) {
      newNum = minPhraseSepTime
    }
    setPhraseSepTime(newNum)
    saveConfig('phraseSepTime', newNum)
  }

  const onChangeRecogLang = (lang: string) => {
    const newValue = lang || recogLang
    setRecogLang(newValue)
    saveConfig('recogLang', newValue)
  }

  const onChangeTransLang = (lang: string) => {
    const newValue = lang || transLang
    setTransLang(newValue)
    saveConfig('transLang', newValue)
  }

  const onChangeRecogFont = (font: string) => {
    setRecogFont(font)
    saveConfig('recogFont', font)
  }

  const onChangeTransFont = (font: string) => {
    setTransFont(font)
    saveConfig('transFont', font)
  }

  const onChangeRecogFontColor = (e: any) => {
    const newValue = e?.target?.value || recogFontColor
    setRecogFontColor(newValue)
    saveConfig('recogFontColor', newValue)
  }

  const onChangeTransFontColor = (e: any) => {
    const newValue = e?.target?.value || transFontColor
    setTransFontColor(newValue)
    saveConfig('transFontColor', newValue)
  }

  const onChangeRecogFontStrokeColor = (e: any) => {
    const newValue = e?.target?.value || recogFontStrokeColor
    setRecogFontStrokeColor(newValue)
    saveConfig('recogFontStrokeColor', newValue)
  }

  const onChangeTransFontStrokeColor = (e: any) => {
    const newValue = e?.target?.value || transFontStrokeColor
    setTransFontStrokeColor(newValue)
    saveConfig('transFontStrokeColor', newValue)
  }

  const onChangeBgColor = (e: any) => {
    const newValue = e?.target?.value || bgColor
    setBgColor(newValue)
    saveConfig('bgColor', newValue)
  }

  const onChangeRecogFontSize = (e: any) => {
    const newValue = e?.target?.value
    const newNum = Number(newValue) || recogFontSize
    setRecogFontSize(newNum)
    saveConfig('recogFontSize', newNum)
  }

  const onChangeRecogFontWeight = (e: any) => {
    const newValue = e?.target?.value
    const newNum = Number(newValue) || recogFontWeight
    setRecogFontWeight(newNum)
    saveConfig('recogFontWeight', newNum)
  }

  const onChangeRecogFontStrokeWidth = (e: any) => {
    const newValue = e?.target?.value
    const newNum = Number(newValue) ?? recogFontStrokeWidth
    setRecogFontStrokeWidth(newNum)
    saveConfig('recogFontStrokeWidth', newNum)
  }

  const onChangeTransFontSize = (e: any) => {
    const newValue = e?.target?.value
    const newNum = Number(newValue) || transFontSize
    setTransFontSize(newNum)
    saveConfig('transFontSize', newNum)
  }

  const onChangeTransFontWeight = (e: any) => {
    const newValue = e?.target?.value
    const newNum = Number(newValue) || transFontWeight
    setTransFontWeight(newNum)
    saveConfig('transFontWeight', newNum)
  }

  const onChangeTransFontStrokeWidth = (e: any) => {
    const newValue = e?.target?.value
    const newNum = Number(newValue) ?? transFontStrokeWidth
    setTransFontStrokeWidth(newNum)
    saveConfig('transFontStrokeWidth', newNum)
  }

  const onChangeShowFontTest = () => {
    const newValue = !showFontTest
    setShowFontTest(newValue)
    saveConfig('showFontTest', newValue)
  }

  return (
    <>
      <Subtitler
        apiKey={apiKey}
        phraseSepTime={phraseSepTime}
        recogLang={recogLang}
        transLang={transLang}
        recogFont={recogFont}
        transFont={transFont}
        bgColor={bgColor}
        recogFontColor={recogFontColor}
        transFontColor={transFontColor}
        recogFontStrokeColor={recogFontStrokeColor}
        transFontStrokeColor={transFontStrokeColor}
        recogFontSize={recogFontSize}
        recogFontWeight={recogFontWeight}
        recogFontStrokeWidth={recogFontStrokeWidth}
        transFontSize={transFontSize}
        transFontWeight={transFontWeight}
        transFontStrokeWidth={transFontStrokeWidth}
        showFontTest={showFontTest}
      />
      <div className="p-8 border border-gray-200">
        <h1 className="font-medium text-3xl">subtitle-chan</h1>
        <p className="mt-4">This is a live demo showing how to use subtitle-chan.</p>
        <p className="mt-4">
          See <a href="https://github.com/ae9is/subtitle-chan#readme">github repo</a> for
          installation instructions.
        </p>
        <div className="mt-8 space-y-6">
          <form id="apiKeyForm" name="apiKeyForm">
            <div>
              {/* Better user experience storing API key as "password" in browser's password manager if we include a dummy username */}
              <label hidden={true} htmlFor="dummyUser" />
              <input
                type="username"
                name="dummyUser"
                id="dummyUser"
                size={0}
                hidden={true}
                defaultValue="subtitle-chan"
              />
            </div>
            <div>
              <Label htmlFor="apiKey">API Key</Label>
              <Input
                type="password"
                name="apiKey"
                id="apiKey"
                onChange={onChangeApiKey}
                defaultValue={apiKey}
              />
            </div>
          </form>
          <div>
            <Label htmlFor="phraseSepTime">Phrase separation time (ms)</Label>
            <Input
              name="phraseSepTime"
              id="phraseSepTime"
              onChange={onChangePhraseSepTime}
              defaultValue={phraseSepTime}
            />
          </div>
        </div>

        <div className="mt-8 grid lg:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="recogFontColor">Transcript Font Color</Label>
            <ColorInput
              name="recogFontColor"
              id="recogFontColor"
              defaultValue={recogFontColor}
              onChange={onChangeRecogFontColor}
            />
          </div>
          <div>
            <Label htmlFor="recogFontStrokeColor">Transcript Border Color</Label>
            <ColorInput
              name="recogFontStrokeColor"
              id="recogFontStrokeColor"
              defaultValue={recogFontStrokeColor}
              onChange={onChangeRecogFontStrokeColor}
            />
          </div>
          <div>
            <Label htmlFor="bgColor">Background Color</Label>
            <ColorInput
              name="bgColor"
              id="bgColor"
              defaultValue={bgColor}
              onChange={onChangeBgColor}
            />
          </div>
          <div>
            <Label htmlFor="transFontColor">Translation Font Color</Label>
            <ColorInput
              type="color"
              name="transFontColor"
              id="transFontColor"
              defaultValue={transFontColor}
              onChange={onChangeTransFontColor}
            />
          </div>
          <div>
            <Label htmlFor="transFontStrokeColor">Translation Border Color</Label>
            <ColorInput
              type="color"
              name="transFontStrokeColor"
              id="transFontStrokeColor"
              defaultValue={transFontStrokeColor}
              onChange={onChangeTransFontStrokeColor}
            />
          </div>
        </div>

        <div className="mt-8 grid lg:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="recogFontSize" value={recogFontSize + 'px'}>
              Transcript Size
            </Label>
            <Range
              name="recogFontSize"
              id="recogFontSize"
              min={8}
              max={64}
              step={2}
              defaultValue={recogFontSize}
              onChange={onChangeRecogFontSize}
            />
          </div>
          <div>
            <Label htmlFor="recogFontWeight" value={recogFontWeight + ''}>
              Transcript Weight
            </Label>
            <Range
              name="recogFontWeight"
              id="recogFontWeight"
              min={100}
              max={900}
              step={100}
              defaultValue={recogFontWeight}
              onChange={onChangeRecogFontWeight}
            />
          </div>
          <div>
            <Label htmlFor="recogFontStrokeWidth" value={recogFontStrokeWidth + 'px'}>
              Transcript Border
            </Label>
            <Range
              name="recogFontStrokeWidth"
              id="recogFontStrokeWidth"
              min={0}
              max={32}
              step={1}
              defaultValue={recogFontStrokeWidth}
              onChange={onChangeRecogFontStrokeWidth}
            />
          </div>
          <div>
            <Label htmlFor="transFontSize" value={transFontSize + 'px'}>
              Translation Size
            </Label>
            <Range
              name="transFontSize"
              id="transFontSize"
              min={8}
              max={64}
              step={2}
              defaultValue={transFontSize}
              onChange={onChangeTransFontSize}
            />
          </div>
          <div>
            <Label htmlFor="transFontWeight" value={transFontWeight + ''}>
              Translation Weight
            </Label>
            <Range
              name="transFontWeight"
              id="transFontWeight"
              min={100}
              max={900}
              step={100}
              defaultValue={transFontWeight}
              onChange={onChangeTransFontWeight}
            />
          </div>
          <div>
            <Label htmlFor="transFontStrokeWidth" value={transFontStrokeWidth + 'px'}>
              Translation Border
            </Label>
            <Range
              name="transFontStrokeWidth"
              id="transFontStrokeWidth"
              min={0}
              max={32}
              step={1}
              defaultValue={transFontStrokeWidth}
              onChange={onChangeTransFontStrokeWidth}
            />
          </div>
        </div>

        <div className="mt-8 grid lg:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="recogLang">
              Transcript Speech &nbsp;
              <sup>
                <a
                  href="https://stackoverflow.com/questions/14257598"
                  target="_blank"
                  rel="noreferrer"
                >
                  (supported languages)
                </a>
              </sup>
            </Label>
            <span className="inline-flex gap-x-4">
              <LanguageSelect
                id="recogLang"
                defaultValue={recogLang}
                onChange={onChangeRecogLang}
              />
            </span>
          </div>
          <div>
            <Label htmlFor="recogFont">Transcript Font</Label>
            <FontPicker
              autoLoad
              inputId="recogFont"
              defaultValue={recogFont}
              value={(font: string) => onChangeRecogFont(font)}
            />
          </div>
          <div>
            <Label htmlFor="transLang">
              Translation &nbsp;
              <sup>
                <a
                  href="https://cloud.google.com/translate/docs/languages"
                  target="_blank"
                  rel="noreferrer"
                >
                  (supported languages)
                </a>
              </sup>
            </Label>
            <span className="inline-flex gap-x-4">
              <LanguageSelect
                id="transLang"
                defaultValue={transLang}
                onChange={onChangeTransLang}
              />
            </span>
          </div>
          <div>
            <Label htmlFor="transFont">Translation Font</Label>
            <FontPicker
              autoLoad
              inputId="transFont"
              defaultValue={transFont}
              value={(font: string) => onChangeTransFont(font)}
            />
          </div>
        </div>
        <div className="mt-8 grid lg:grid-cols-2 gap-4">
          <div>
            <CopyLinkButton />
          </div>
          <span className="inline-flex gap-x-4 h-4 items-baseline">
            <input
              id="showFontTest"
              name="showFontTest"
              type="checkbox"
              checked={showFontTest}
              onChange={onChangeShowFontTest}
              className="disabled:opacity-50"
            />
            <Label htmlFor="showFontTest">Show font test?</Label>
          </span>
        </div>
      </div>
    </>
  )
}
