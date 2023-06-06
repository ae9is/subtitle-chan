import { useState } from 'react'
import SpeechRecognition, { useSubtitles } from '../lib/useSubtitles'

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
    resetTranscript,
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

  return (
    <>
      <p>Mic {listening ? 'on' : 'off'}</p>
      <p>Transcript: {transcript}</p>
      <p>Translation: {translation}</p>
      {!enabled && <button onClick={handleStart}>Start</button>}
      {enabled && <button onClick={handleStop}>Stop</button>}
      <button onClick={resetTranscript}>Reset</button>
    </>
  )
}
