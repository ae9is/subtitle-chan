import cx from 'classnames'

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
  } = props

  const textStroke = (fontStrokeWidth ?? '2') + 'px ' + (fontStrokeColor || 'black')

  // As alternative to -webkit-text-stroke, can also create text outline via drop shadow:
  //  drop-shadow-[0_2px_2px_rgba(0,0,0,1.0)]
  // ref: https://stackoverflow.com/questions/70504047/how-to-have-a-bordered-text-in-tailwind

  return (
    <>
      <div
        className={cx(
          { 'border-b': bottomBorder },
          { 'bg-pure-green': !bgColor },
          'h-40 p-8 border-gray-200 overflow-hidden'
        )}
        style={{
          backgroundColor: bgColor,
        }}
      >
        <textarea
          id={inputId}
          className="text-4xl font-bold scrollbar-hide resize-none py-1 px-2 bg-transparent h-full w-full block"
          style={{
            fontFamily,
            color: fontColor,
            WebkitTextStroke: textStroke,
            fontSize,
            fontWeight,
          }}
          value={value}
          readOnly
        />
      </div>
    </>
  )
}
