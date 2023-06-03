import cx from 'classnames'

export interface SubtitleProps {
  value?: string
  bottomBorder?: boolean
  color?: string
  textStroke?: string
  fontFamily?: string
}

export function Subtitle(props: SubtitleProps) {
  const {
    fontFamily,
    value = '',
    bottomBorder = false,
    color = 'white',
    textStroke = '2px black',
  } = props

  // As alternative to -webkit-text-stroke, can also create text outline via drop shadow:
  //  drop-shadow-[0_2px_2px_rgba(0,0,0,1.0)]
  // ref: https://stackoverflow.com/questions/70504047/how-to-have-a-bordered-text-in-tailwind

  return (
    <>
      <div
        className={cx(
          { 'border-b': bottomBorder },
          'h-40 p-8 border-gray-200 bg-pure-green overflow-hidden'
        )}
      >
        <textarea
          className="text-4xl font-bold scrollbar-hide resize-none py-1 px-2 bg-transparent h-full w-full block"
          style={{
            fontFamily: fontFamily,
            color: color,
            WebkitTextStroke: textStroke,
          }}
          value={value}
          readOnly
        />
      </div>
    </>
  )
}
