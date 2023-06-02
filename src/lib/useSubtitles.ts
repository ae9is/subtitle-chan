import { useEffect, useState } from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import axios from 'axios'
import logger from './logger'

export default SpeechRecognition

export interface useSubtitlesProps {
  recogLang?: string
  transLang?: string
  interimResults?: boolean
  apiKey?: string
  enabled?: boolean
  phraseSepTime?: number
  minPhraseLength?: number
  maxPhraseLength?: number
  maxDelay?: number
  usePost?: boolean
}

export function useSubtitles(props: useSubtitlesProps = {}) {
  const [translation, setTranslation] = useState('')

  const {
    recogLang = 'kr',
    transLang = 'en',
    interimResults = true,
    apiKey,
    phraseSepTime = 750,  // ms
    minPhraseLength = 20,
    // Should be <2000 char per translation query.
    // A generous max rate of speech roughly 600 wpm * 5 char/word ~ 50 char/s.
    // This yields max delay of 2000 / 50 = 40s.
    // More realistic max rate of speech is 300 wpm i.e. 80s.
    // I.e. max delay in practice can be whatever the user wants.
    maxPhraseLength = 1000,  // a bit less than 2000
    maxDelay = 5000,  // ms, must be less than about a minute, see above
    usePost = false,
  } = props

  const transUrl = 'https://script.google.com/macros/s/' + apiKey + '/exec'

  // Note: transcript = final + ' ' + interim
  const {
    transcript,
    interimTranscript,
    finalTranscript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition()

  // Every time finalTranscript is updated the timer resets
  useEffect(() => {
    // Don't set a new timer if finalTranscript has just been reset i.e. is still empty
    let timer: NodeJS.Timeout
    if (finalTranscript) {
      timer = setTimeout(() => {
        if (finalTranscript?.trim().length > 0) {
          queryTranslation()
        }
      }, phraseSepTime)
    }
    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
  }, [finalTranscript, phraseSepTime])

  const queryTranslation = async () => {
    const text = finalTranscript
    resetTranscript()
    if (apiKey) {
      if (usePost) {
        await doPost(text)
      } else {
        await doGet(text)
      }
    }
  }

  const reset = async () => {
    resetTranscript()
    setTranslation('')
  }

  // Google Apps Script can throw CORS errors sometimes, even on GET
  // ref: https://stackoverflow.com/a/68933465

  const doPost = async (text: string) => {
    const query = `${transUrl}?source=${recogLang}&target=${transLang}`
    logger.log('query: POST ' + query + ', body: ' + text)
    try {
      const resp = await axios.post(query, text, {
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
      })
      const trans = resp?.data || ''
      logger.log('resp: ' + trans)
      if (trans) {
        setTranslation(trans)
      }
    } catch (e) {
      logger.error(e)
    }
  }

  const doGet = async (text: string) => {
    const query = `${transUrl}?text=${text}&source=${recogLang}&target=${transLang}`
    logger.log('query: GET ' + query)
    try {
      const resp = await axios.get(query, {
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
      })
      const trans = resp?.data || ''
      logger.log('resp: ' + trans)
      if (trans) {
        setTranslation(trans)
      }
    } catch (e) {
      logger.error(e)
    }
  }

  return {
    transcript: interimResults ? transcript : finalTranscript,
    listening,
    reset,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
    translation,
  }
}
