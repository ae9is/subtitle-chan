export interface IconToggleProps {
  checked?: boolean
  onChange?: () => void
  icon?: React.ReactNode
  label?: string
  id?: string
}

export function IconToggle(props: IconToggleProps) {
  const { checked = false, onChange, icon, label, id } = props

  return (
    <>
      <label htmlFor={id} className="relative inline-flex items-center cursor-pointer">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="sr-only peer"
        />
        {!icon && (
          <div
            className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full
              peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-['']
              after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full
              after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"
          />
        )}
        {icon && (
          <>
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer-checked:bg-blue-600" />
            <div className="peer-checked:translate-x-full absolute top-[0px] left-[0px] h-5 w-5 transition-all">
              {icon}
            </div>
          </>
        )}
        <div className="ml-4 text-gray-600">{label}</div>
      </label>
    </>
  )
}
