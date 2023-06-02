import { ChangeEvent, useState } from 'react'
import { getConfig, saveConfig } from '../lib/config'
import { getParam } from '../lib/url'
import logger from '../lib/logger'
import Subtitler from './Subtitler'
import { Input } from './Input'
import './App.css'

export default function App() {
  const config = getConfig()
  const [apiKey, setApiKey] = useState(getParam('apiKey') || config.apiKey)
  const defaultPhraseSepTime = 750
  const minPhraseSepTime = 100
  const [phraseSepTime, setPhraseSepTime] = useState<number>(
    getParam('phraseSepTime') || config.phraseSepTime || defaultPhraseSepTime
  )

  const onChangeApiKey = (e: ChangeEvent<HTMLInputElement>) => {
    const newApiKey = e?.target?.value ?? ''
    setApiKey(newApiKey)
    saveConfig({ ...config, apiKey: newApiKey })
  }

  const onChangePhraseSepTime = (e: any) => {
    const newValue = e?.target?.value
    let newPhraseSepTime = Number(newValue) || defaultPhraseSepTime
    if (newPhraseSepTime < minPhraseSepTime) {
      newPhraseSepTime = minPhraseSepTime
    }
    logger.log(newPhraseSepTime)
    setPhraseSepTime(newPhraseSepTime)
    saveConfig({ ...config, phraseSepTime: newPhraseSepTime })
  }

  return (
    <>
      <Subtitler apiKey={apiKey} phraseSepTime={phraseSepTime} />
      <hr />
      <div>
        <h1>subtitle-chan</h1>
        <p>This is a live demo showing how to use subtitle-chan.</p>
        <p>
          See <a href="https://github.com/ae9is/subtitle-chan#readme">github repo</a> for
          installation instructions.
        </p>
      </div>
      <div>
        API Key:
        {/* Better user experience storing API key as "password" in browser's password manager if we include a dummy username */}
        <input
          type="username"
          name="dummyUser"
          id="dummyUser"
          size={0}
          hidden={true}
          defaultValue="subtitle-chan"
        />
        <input
          type="password"
          name="apiKey"
          id="apiKey"
          size={60}
          onChange={onChangeApiKey}
          defaultValue={apiKey}
        />
      </div>
      <div>
        Phrase separation time (ms):
        <Input
          type="text"
          name="phraseSepTime"
          id="phraseSepTime"
          size={10}
          onChange={onChangePhraseSepTime}
          defaultValue={phraseSepTime}
        />
      </div>
    </>
  )
}
