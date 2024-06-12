import { useEffect, useState } from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import axios, { AxiosResponse } from 'axios'
import logger from './logger'
import { appendToFixedSizeString } from './history'
import { E_ALREADY_LOCKED, Mutex, tryAcquire } from 'async-mutex'

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
  showHistory?: boolean
}

export function useSubtitles(props: useSubtitlesProps = {}) {
  const [translation, setTranslation] = useState('')

  const maxLogSize = 5000 // Fairly arbitrary, rendering plaintext is cheap
  const [transcriptLog, setTranscriptLog] = useState('')
  const [translationLog, setTranslationLog] = useState('')

  const {
    recogLang = 'ko',
    transLang = 'en',
    interimResults = true,
    apiKey,
    phraseSepTime = 750, // ms
    minPhraseLength = 20,
    // Should be <2000 char per translation query.
    // A generous max rate of speech roughly 600 wpm * 5 char/word ~ 50 char/s.
    // This yields max delay of 2000 / 50 = 40s.
    // More realistic max rate of speech is 300 wpm i.e. 80s.
    // I.e. max delay in practice can be whatever the user wants.
    maxPhraseLength = 200, // <2000
    maxDelay = 5000, // ms, must be less than about a minute, see above
    usePost = false,
    showHistory = false,
  } = props

  const transUrl = 'https://script.google.com/macros/s/' + apiKey + '/exec'

  // Note: transcript = final + ' ' + interim
  const {
    transcript,
    //interimTranscript,
    finalTranscript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition()

  useEffect(() => {
    const maxDelayTimer = setTimeout(() => {
      if (finalTranscript) {
        requestTranslationQuery()
      }
    }, maxDelay)
    let phraseTimer: NodeJS.Timeout
    if (finalTranscript) {
      if (finalTranscript.length > maxPhraseLength) {
        requestTranslationQuery()
      } else {
        phraseTimer = setTimeout(() => {
          if (finalTranscript.length > minPhraseLength) {
            requestTranslationQuery()
          }
        }, phraseSepTime)
      }
    }
    return () => {
      if (maxDelayTimer) {
        clearTimeout(maxDelayTimer)
      }
      if (phraseTimer) {
        clearTimeout(phraseTimer)
      }
    }
  }, [finalTranscript, maxDelay, maxPhraseLength, minPhraseLength, phraseSepTime]) // User settings changes split transcript, could rework this

  // Can be called multiple times at once, but uses a mutex to prevent function logic from concurrent execution
  const mutex = new Mutex()
  const requestTranslationQuery = async () => {
    try {
      // Immediately fails if lock isn't available
      await tryAcquire(mutex).runExclusive(async () => {
        const text = finalTranscript?.trim()
        setTranscriptLog((prev) => appendToFixedSizeString(prev, ' ' + text, maxLogSize))
        resetTranscript()
        if (apiKey) {
          await doQuery(text, usePost)
        }
      })
    } catch (e) {
      if (e !== E_ALREADY_LOCKED) {
        logger.error('Error querying translation: ' + e)
      }
    }
  }

  const reset = async () => {
    resetTranscript()
    setTranslation('')
    setTranscriptLog('')
    setTranslationLog('')
  }

  // Google Apps Script can throw CORS errors sometimes, even on GET
  // ref: https://stackoverflow.com/a/68933465

  const doQuery = async (text: string, usePost = false) => {
    let query
    if (usePost) {
      query = `${transUrl}?source=${recogLang}&target=${transLang}`
      logger.log('query: POST ' + query + ', body: ' + text)
    } else {
      query = `${transUrl}?text=${text}&source=${recogLang}&target=${transLang}`
      logger.log('query: GET ' + query)
    }
    try {
      const requestConfig = {
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
      }
      let resp: AxiosResponse
      if (usePost) {
        resp = await axios.post(query, text, requestConfig)
      } else {
        resp = await axios.get(query, requestConfig)
      }
      const trans = resp?.data ?? ''
      logger.log('resp: ' + trans)
      if (trans) {
        setTranslation(trans)
        setTranslationLog((prev) => appendToFixedSizeString(prev, ' ' + trans, maxLogSize))
      }
    } catch (e) {
      logger.error(e)
    }
  }

  const returnedTranscript = showHistory
    ? transcriptLog
    : interimResults
      ? transcript
      : finalTranscript
  const returnedTranslation = showHistory ? translationLog : translation

  return {
    transcript: returnedTranscript,
    translation: returnedTranslation,
    listening,
    reset,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  }
}
