import { useEffect, useRef } from 'react'
import cx from 'classnames'
import './Subtitle.css'

export interface SubtitleProps {
  value?: string
  bottomBorder?: boolean
  fontColor?: string
  fontStrokeColor?: string
  fontFamily?: string
  bgColor?: string
  fontSize?: number
  fontWeight?: number
  fontStrokeWidth?: number
  inputId?: string
  scrollBottom?: boolean
  height?: number
}

export function Subtitle(props: SubtitleProps) {
  const {
    fontFamily,
    value = '',
    bottomBorder = false,
    fontColor,
    fontStrokeColor,
    bgColor,
    fontSize,
    fontWeight,
    fontStrokeWidth,
    inputId,
    scrollBottom = true,
    height = 10,
  } = props

  // As alternative to -webkit-text-stroke, can also create text outline via drop shadow:
  //  drop-shadow-[0_2px_2px_rgba(0,0,0,1.0)]
  // ref: https://stackoverflow.com/questions/70504047/how-to-have-a-bordered-text-in-tailwind
  const textStroke = (fontStrokeWidth ?? '2') + 'px ' + (fontStrokeColor || 'black')

  const textarea = useRef<HTMLTextAreaElement>(null)
  const scrollToBottom = () => {
    if (textarea?.current) {
      textarea.current.scrollTop = 999999
    }
  }
  useEffect(() => {
    if (scrollBottom) {
      scrollToBottom()
    }
  }, [value, scrollBottom])

  return (
    <>
      <div
        className={cx(
          { 'border-b': bottomBorder },
          { 'bg-pure-green': !bgColor },
          { hidden: !height },
          'p-4 border-gray-200 overflow-hidden'
        )}
        style={{
          backgroundColor: bgColor,
        }}
      >
        <textarea
          ref={textarea}
          id={inputId}
          //className="schan-v-fade"
          className={cx(
            'outline-none border-none leading-tight text-4xl font-bold scrollbar-hide resize-none py-1 px-2 bg-transparent h-full w-full block'
          )}
          style={{
            fontFamily,
            color: fontColor,
            WebkitTextStroke: textStroke,
            fontSize,
            fontWeight,
            height: height + 'rem',
          }}
          value={value}
          onChange={scrollToBottom}
          readOnly
        />
      </div>
    </>
  )
}
