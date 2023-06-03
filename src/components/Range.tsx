import cx from 'classnames'

export function Range(
  props: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
) {
  const { min = 0, max = 100, step = 1, className, type, ...rest } = props

  return (
    <input
      type="range"
      className={cx(
        className,
        'transparent h-1.5 w-full cursor-pointer appearance-none rounded-lg border-transparent bg-neutral-200'
      )}
      min={min}
      max={max}
      step={step}
      {...rest}
    />
  )
}
