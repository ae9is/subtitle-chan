export interface IconProps {
  fill?: string
  stroke?: string
  className?: string

  // Pass through the SVG <path>'s for the specific icon
  outlined?: React.ReactNode
  filled?: React.ReactNode
}

export function Icon(props: IconProps) {
  const { fill = 'none', stroke = 'currentColor', className = 'w-6 h-6', outlined, filled } = props

  if (!fill || fill === 'none') {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill={fill}
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke={stroke}
        className={className}
      >
        {outlined}
      </svg>
    )
  }
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={fill} className={className}>
      {filled}
    </svg>
  )
}
