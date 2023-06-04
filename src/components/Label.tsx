export interface LabelProps {
  children?: React.ReactNode
  htmlFor?: string
  value?: string
}

export function Label(props: LabelProps) {
  const { children, htmlFor, value } = props
  return (
    <div className="flex flex-row justify-between">
      <label htmlFor={htmlFor} className="text-sm text-gray-700 block mb-1 font-medium">
        {children}
      </label>
      {value && <div className="text-sm text-gray-500 block mb-1 font-normal">{value}</div>}
    </div>
  )
}
