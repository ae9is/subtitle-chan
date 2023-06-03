import { useState } from 'react'
import FontPicker from 'react-fontpicker-ts-lite'
import 'react-fontpicker-ts-lite/dist/index.css'
import './FontPicker.css' // Custom styling to match react-select somewhat
import { defaults, getConfig, saveConfig } from '../lib/config'
import { getParam } from '../lib/url'
import logger from '../lib/logger'
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

  const onChangeApiKey = (e: any) => {
    const newApiKey = e?.target?.value ?? ''
    setApiKey(newApiKey)
    saveConfig({ ...config, apiKey: newApiKey })
  }

  const onChangePhraseSepTime = (e: any) => {
    const newValue = e?.target?.value
    let newPhraseSepTime = Number(newValue) || defaults.phraseSepTime
    if (newPhraseSepTime < minPhraseSepTime) {
      newPhraseSepTime = minPhraseSepTime
    }
    logger.log(newPhraseSepTime)
    setPhraseSepTime(newPhraseSepTime)
    saveConfig({ ...config, phraseSepTime: newPhraseSepTime })
  }

  const onChangeRecogLang = (e: any) => {
    const newValue = e?.target?.value || defaults.recogLang
    setRecogLang(newValue)
  }

  const onChangeTransLang = (e: any) => {
    const newValue = e?.target?.value || defaults.transLang
    setTransLang(newValue)
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
      />
      <div className="p-8 border border-gray-200">
        <h1 className="font-medium text-3xl">subtitle-chan</h1>
        <p className="text-gray-600 mt-6">This is a live demo showing how to use subtitle-chan.</p>
        <p className="text-gray-600 mt-6">
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

        <div className="mt-8 grid lg:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="recogFontColor">Transcript Font Color</Label>
            <ColorInput
              name="recogFontColor"
              id="recogFontColor"
              defaultValue={defaults.recogFontColor}
            />
          </div>
          <div>
            <Label htmlFor="recogFontColor">Transcript Border Color</Label>
            <ColorInput
              name="recogFontStrokeColor"
              id="recogFontStrokeColor"
              defaultValue={defaults.recogFontStrokeColor}
            />
          </div>
          <div>
            <Label htmlFor="transLang">Translation Font Color</Label>
            <ColorInput
              type="color"
              name="transFontColor"
              id="transFontColor"
              defaultValue={defaults.transFontColor}
            />
          </div>
          <div>
            <Label htmlFor="transFont">Translation Border Color</Label>
            <ColorInput
              type="color"
              name="transFontStrokeColor"
              id="transFontStrokeColor"
              defaultValue={defaults.transFontStrokeColor}
            />
          </div>
        </div>

        <div className="mt-8 grid lg:grid-cols-3 gap-4">
          <div>
            <Label>Transcript Size</Label>
            <Range min={8} max={64} step={2} defaultValue={defaults.recogFontSize} />
          </div>
          <div>
            <Label>Transcript Weight</Label>
            <Range min={100} max={900} step={100} defaultValue={defaults.recogFontWeight} />
          </div>
          <div>
            <Label>Transcript Border</Label>
            <Range min={0} max={32} step={1} defaultValue={defaults.recogFontStrokeWidth} />
          </div>
          <div>
            <Label>Translation Size</Label>
            <Range min={8} max={64} step={2} defaultValue={defaults.transFontSize} />
          </div>
          <div>
            <Label>Translation Weight</Label>
            <Range min={100} max={900} step={100} defaultValue={defaults.transFontWeight} />
          </div>
          <div>
            <Label>Translation Border</Label>
            <Range min={0} max={32} step={1} defaultValue={defaults.transFontStrokeWidth} />
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
                defaultVal={defaults.recogLang}
                onChange={onChangeRecogLang}
              />
            </span>
          </div>
          <div>
            <Label htmlFor="recogFont">Transcript Font</Label>
            <FontPicker
              //autoLoad
              defaultValue={defaults.recogFont}
              value={(font: string) => setRecogFont(font)}
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
                defaultVal={defaults.transLang}
                onChange={onChangeTransLang}
              />
            </span>
          </div>
          <div>
            <Label htmlFor="transFont">Translation Font</Label>
            <FontPicker
              //autoLoad
              defaultValue={defaults.transFont}
              value={(font: string) => setTransFont(font)}
            />
          </div>
        </div>
        <div className="mt-8 space-y-6">
          <CopyLinkButton config={config} />
        </div>
      </div>
    </>
  )
}
