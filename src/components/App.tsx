import { useState } from 'react'
import FontPicker from 'react-fontpicker-ts-lite'
import 'react-fontpicker-ts-lite/dist/index.css'
import './FontPicker.css' // Custom styling to match react-select somewhat
import { defaults, getConfig, saveConfig } from '../lib/config'
import { getParam } from '../lib/url'
import { Subtitler } from './Subtitler'
import { Input } from './Input'
import { Label } from './Label'
import { Range } from './Range'
import { CopyLinkButton } from './CopyLinkButton'
import { ColorInput } from './ColorInput'
import { LanguageSelect } from './LanguageSelect'

export function App() {
  const config = getConfig()
  const [apiKey, setApiKey] = useState(getParam('apiKey') || config.apiKey)
  const minPhraseSepTime = 100
  const [phraseSepTime, setPhraseSepTime] = useState<number>(
    getParam('phraseSepTime') || config.phraseSepTime || defaults.phraseSepTime
  )
  const [recogLang, setRecogLang] = useState<string>(
    getParam('recogLang') || config.recogLang || defaults.recogLang
  )
  const [transLang, setTransLang] = useState<string>(
    getParam('transLang') || config.transLang || defaults.transLang
  )
  const [recogFont, setRecogFont] = useState<string>(
    getParam('recogFont') || config.recogFont || defaults.recogFont
  )
  const [transFont, setTransFont] = useState<string>(
    getParam('transFont') || config.transFont || defaults.transFont
  )
  const [recogFontSize, setRecogFontSize] = useState<number>(
    Number(getParam('recogFontSize')) || config.recogFontSize || defaults.recogFontSize
  )
  const [recogFontWeight, setRecogFontWeight] = useState<number>(
    Number(getParam('recogFontWeight')) || config.recogFontWeight || defaults.recogFontWeight
  )
  const [recogFontStrokeWidth, setRecogFontStrokeWidth] = useState<number>(
    Number(getParam('recogFontStrokeWidth')) || config.recogFontStrokeWidth || defaults.recogFontStrokeWidth
  )
  const [transFontSize, setTransFontSize] = useState<number>(
    Number(getParam('transFontSize')) || config.transFontSize || defaults.transFontSize
  )
  const [transFontWeight, setTransFontWeight] = useState<number>(
    Number(getParam('transFontWeight')) || config.transFontWeight || defaults.transFontWeight
  )
  const [transFontStrokeWidth, setTransFontStrokeWidth] = useState<number>(
    Number(getParam('transFontStrokeWidth')) || config.transFontStrokeWidth || defaults.transFontStrokeWidth
  )
  const [recogFontColor, setRecogFontColor] = useState<string>(
    getParam('recogFontColor') || config.recogFontColor || defaults.recogFontColor
  )
  const [transFontColor, setTransFontColor] = useState<string>(
    getParam('transFontColor') || config.transFontColor || defaults.transFontColor
  )
  const [recogFontStrokeColor, setRecogFontStrokeColor] = useState<string>(
    getParam('recogFontStrokeColor') || config.recogFontStrokeColor || defaults.recogFontStrokeColor
  )
  const [transFontStrokeColor, setTransFontStrokeColor] = useState<string>(
    getParam('transFontStrokeColor') || config.transFontStrokeColor || defaults.transFontStrokeColor
  )
  const [bgColor, setBgColor] = useState<string>(
    getParam('bgColor') || config.bgColor || defaults.bgColor
  )
  const [showFontTest, setShowFontTest] = useState<boolean>(
    getParam('showFontTest') || config.showFontTest || defaults.showFontTest
  )

  const onChangeApiKey = (e: any) => {
    const newApiKey = e?.target?.value ?? ''
    setApiKey(newApiKey)
    saveConfig({ ...config, apiKey: newApiKey })
  }

  const onChangePhraseSepTime = (e: any) => {
    const newValue = e?.target?.value
    let newNum = Number(newValue) || phraseSepTime
    if (newNum < minPhraseSepTime) {
      newNum = minPhraseSepTime
    }
    setPhraseSepTime(newNum)
    saveConfig({ ...config, phraseSepTime: newNum })
  }

  const onChangeRecogLang = (e: any) => {
    const newValue = e?.target?.value || recogLang
    setRecogLang(newValue)
    saveConfig({ ...config, recogLang: newValue })
  }

  const onChangeTransLang = (e: any) => {
    const newValue = e?.target?.value || transLang
    setTransLang(newValue)
    saveConfig({ ...config, transLang: newValue })
  }

  const onChangeRecogFont = (font: string) => {
    setRecogFont(font)
    saveConfig({ ...config, recogFont: font })
  }

  const onChangeTransFont = (font: string) => {
    setTransFont(font)
    saveConfig({ ...config, transFont: font })
  }

  const onChangeRecogFontColor = (e: any) => {
    const newValue = e?.target?.value || recogFontColor
    setRecogFontColor(newValue)
    saveConfig({ ...config, recogFontColor: newValue })
  }

  const onChangeTransFontColor = (e: any) => {
    const newValue = e?.target?.value || transFontColor
    setTransFontColor(newValue)
    saveConfig({ ...config, transFontColor: newValue })
  }

  const onChangeRecogFontStrokeColor = (e: any) => {
    const newValue = e?.target?.value || recogFontStrokeColor
    setRecogFontStrokeColor(newValue)
    saveConfig({ ...config, recogFontStrokeColor: newValue })
  }

  const onChangeTransFontStrokeColor = (e: any) => {
    const newValue = e?.target?.value || transFontStrokeColor
    setTransFontStrokeColor(newValue)
    saveConfig({ ...config, transFontStrokeColor: newValue })
  }

  const onChangeBgColor = (e: any) => {
    const newValue = e?.target?.value || bgColor
    setBgColor(newValue)
    saveConfig({ ...config, bgColor: newValue })
  }

  const onChangeRecogFontSize = (e: any) => {
    const newValue = e?.target?.value
    const newNum = Number(newValue) || recogFontSize
    setRecogFontSize(newNum)
    saveConfig({ ...config, recogFontSize: newNum })
  }

  const onChangeRecogFontWeight = (e: any) => {
    const newValue = e?.target?.value
    const newNum = Number(newValue) || recogFontWeight
    setRecogFontWeight(newNum)
    saveConfig({ ...config, recogFontWeight: newNum })
  }

  const onChangeRecogFontStrokeWidth = (e: any) => {
    const newValue = e?.target?.value
    const newNum = Number(newValue) ?? recogFontStrokeWidth
    setRecogFontStrokeWidth(newNum)
    saveConfig({ ...config, recogFontStrokeWidth: newNum })
  }

  const onChangeTransFontSize = (e: any) => {
    const newValue = e?.target?.value
    const newNum = Number(newValue) || transFontSize
    setTransFontSize(newNum)
    saveConfig({ ...config, transFontSize: newNum })
  }

  const onChangeTransFontWeight = (e: any) => {
    const newValue = e?.target?.value
    const newNum = Number(newValue) || transFontWeight
    setTransFontWeight(newNum)
    saveConfig({ ...config, transFontWeight: newNum })
  }

  const onChangeTransFontStrokeWidth = (e: any) => {
    const newValue = e?.target?.value
    const newNum = Number(newValue) ?? transFontStrokeWidth
    setTransFontStrokeWidth(newNum)
    saveConfig({ ...config, transFontStrokeWidth: newNum })
  }

  const onChangeShowFontTest = () => {
    const newValue = !showFontTest
    setShowFontTest(newValue)
    saveConfig({ ...config, showFontTest: newValue })
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
          <form>
            <div>
              {/* Better user experience storing API key as "password" in browser's password manager if we include a dummy username */}
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
              <Label htmlFor="password">API Key</Label>
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
            <Label htmlFor="recogFontColor">Transcript Border Color</Label>
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
            <Label htmlFor="transLang">Translation Font Color</Label>
            <ColorInput
              type="color"
              name="transFontColor"
              id="transFontColor"
              defaultValue={transFontColor}
              onChange={onChangeTransFontColor}
            />
          </div>
          <div>
            <Label htmlFor="transFont">Translation Border Color</Label>
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
            <Label>Transcript Size</Label>
            <Range min={8} max={64} step={2} defaultValue={recogFontSize} onChange={onChangeRecogFontSize} />
          </div>
          <div>
            <Label>Transcript Weight</Label>
            <Range min={100} max={900} step={100} defaultValue={recogFontWeight} onChange={onChangeRecogFontWeight} />
          </div>
          <div>
            <Label>Transcript Border</Label>
            <Range min={0} max={32} step={1} defaultValue={recogFontStrokeWidth} onChange={onChangeRecogFontStrokeWidth} />
          </div>
          <div>
            <Label>Translation Size</Label>
            <Range min={8} max={64} step={2} defaultValue={transFontSize} onChange={onChangeTransFontSize}/>
          </div>
          <div>
            <Label>Translation Weight</Label>
            <Range min={100} max={900} step={100} defaultValue={transFontWeight} onChange={onChangeTransFontWeight} />
          </div>
          <div>
            <Label>Translation Border</Label>
            <Range min={0} max={32} step={1} defaultValue={transFontStrokeWidth} onChange={onChangeTransFontStrokeWidth} />
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
                name="recogLang"
                id="recogLang"
                defaultVal={recogLang}
                onChange={onChangeRecogLang}
              />
            </span>
          </div>
          <div>
            <Label htmlFor="recogFont">Transcript Font</Label>
            <FontPicker
              //autoLoad
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
                name="transLang"
                id="transLang"
                defaultVal={transLang}
                onChange={onChangeTransLang}
              />
            </span>
          </div>
          <div>
            <Label htmlFor="transFont">Translation Font</Label>
            <FontPicker
              //autoLoad
              defaultValue={transFont}
              value={(font: string) => onChangeTransFont(font)}
            />
          </div>
        </div>
        <div className="mt-8 grid lg:grid-cols-2 gap-4">
          <div>
            <CopyLinkButton config={config} />
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
