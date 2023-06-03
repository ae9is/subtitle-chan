export interface LabelProps {
  children?: React.ReactNode
  htmlFor?: string
}

export function Label(props: LabelProps) {
  const { children, htmlFor } = props
  return (
    <label htmlFor={htmlFor} className="text-sm text-gray-700 block mb-1 font-medium">
      {children}
    </label>
  )
}
