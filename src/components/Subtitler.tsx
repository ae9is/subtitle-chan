import { useState } from 'react'
import SpeechRecognition, { useSubtitles } from '../lib/useSubtitles'
import { MicIcon } from './MicIcon'

export interface SubtitlerProps {
  apiKey: string
  phraseSepTime: number
}

export default function Subtitler(props: SubtitlerProps) {
  const { apiKey, phraseSepTime } = props
  const [enabled, setEnabled] = useState(false)

  // Confirmed supported recognition languages:
  // https://github.com/JamesBrill/react-speech-recognition/blob/master/docs/API.md#language-string
  const recogLang = 'ko'

  // Supported translation languages:
  // https://cloud.google.com/translate/docs/languages
  const transLang = 'en'

  const {
    transcript,
    listening,
    reset,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
    translation,
  } = useSubtitles({
    recogLang,
    transLang,
    apiKey,
    phraseSepTime,
    enabled,
  })

  const handleStart = () => {
    setEnabled(true)
    SpeechRecognition.startListening({
      language: recogLang,
      continuous: true,
    })
  }

  const handleStop = () => {
    setEnabled(false)
    SpeechRecognition.abortListening()
  }

  const handleReset = () => {
    reset()
  }

  let error
  if (!browserSupportsSpeechRecognition) {
    error = "Your browser doesn't support speech recognition :("
  } else if (!isMicrophoneAvailable) {
    error = 'Please allow this page to access your microphone'
  } else if (!navigator.onLine) {
    error = 'Device offline! Speech recognition requires an internet connection'
  }
  if (error) {
    return (
      <>
        <p>{error}</p>
      </>
    )
  }

  const testText = `
    Qui accusamus iure qui tempora laboriosam ut ut. Ut voluptatem ut repudiandae. Ipsam distinctio aut sed architecto est velit fugit velit. Soluta nesciunt consequatur labore.
    Et et consequuntur reiciendis aut. Sunt exercitationem repellendus id est officiis iure inventore illo. Vel expedita omnis incidunt dolor numquam est odit ipsa. Quis ut occaecati architecto. Rem nisi repudiandae in id corporis. Quia ut dolor quo alias ut rerum ad.
    Quia doloribus repellendus in ratione ab molestiae vitae. Quam quisquam consequuntur in sunt debitis. Ratione et voluptas praesentium aspernatur suscipit sint quia amet. Rerum voluptate aspernatur vel.
    Commodi deserunt iste quas. Animi sit blanditiis voluptatem itaque dolore. Non ut quaerat aut explicabo amet. Enim repellat et facere. Ut natus possimus eum inventore. Quaerat rerum sit quo aut tempore optio.
    Nulla architecto corrupti et debitis rem. Ut soluta dolorum soluta sint qui dolores possimus amet. Modi beatae cumque officia consectetur numquam aperiam ut et.
  `

  // TODO FIXME autoscroll text area to bottom

  // TODO fade edges of text area text

  return (
    <>
    {/*
      <div className="h-40 p-8 border border-gray-200 bg-green-500 overflow-hidden">
        <textarea
          className="scrollbar-hide resize-none py-1 px-2 bg-transparent h-full w-full block"
          value={testText}
          readOnly
        />
      </div>
    */}
      <div className="h-40 p-8 border border-gray-200 bg-green-500 overflow-hidden">
        <textarea
          className="scrollbar-hide resize-none py-1 px-2 bg-transparent h-full w-full block"
          value={transcript}
          readOnly
        />
      </div>
      <div className="h-40 p-8 border border-gray-200 bg-green-500 overflow-hidden">
        <textarea
          className="scrollbar-hide resize-none py-1 px-2 bg-transparent h-full w-full block"
          value={translation}
          readOnly
        />
      </div>
      <div className="p-8 border border-gray-200">
        <div className="flex space-x-4">
          <span className="py-2 px-4">
            <MicIcon stroke={listening ? 'red' : 'black'} fill={listening ? 'red' : 'none'} />
          </span>
          {!enabled && <button onClick={handleStart} className="w-32 py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 active:bg-green-700 disabled:opacity-50">Start</button>}
          {enabled && <button onClick={handleStop} className="w-32 py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600 active:bg-red-700 disabled:opacity-50">Stop</button>}
          <button onClick={handleReset} className="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50">Reset</button>
        </div>
      </div>
    </>
  )
}
