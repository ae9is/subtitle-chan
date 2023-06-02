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
      <div className="p-8 border border-gray-200">
        <h1 className="font-medium text-3xl">subtitle-chan</h1>
        <p className="text-gray-600 mt-6">
          This is a live demo showing how to use subtitle-chan.
        </p>
        <p className="text-gray-600 mt-6">
          See <a href="https://github.com/ae9is/subtitle-chan#readme">github repo</a> for
          installation instructions.
        </p>
        <form>
          <div className="mt-8 space-y-6">
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
              <label htmlFor="password" className="text-sm text-gray-700 block mb-1 font-medium">API Key</label>
              <input
                type="password"
                name="apiKey"
                id="apiKey"
                onChange={onChangeApiKey}
                defaultValue={apiKey}
                className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
              />
            </div>
            <div>
              <label htmlFor="phraseSepTime" className="text-sm text-gray-700 block mb-1 font-medium">Phrase separation time (ms)</label>
              <Input
                type="text"
                name="phraseSepTime"
                id="phraseSepTime"
                onChange={onChangePhraseSepTime}
                defaultValue={phraseSepTime}
                className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
              />
            </div>
          </div>
        </form>
      </div>

    </>
  )
}
