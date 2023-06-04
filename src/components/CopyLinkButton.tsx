import { getAllConfig, toUrlParams } from '../lib/config'
import { CopyIcon } from './CopyIcon'

export interface CopyLinkButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  config?: Record<string, string>
}

// Construct a link that will open up the app with all settings pre-populated,
//  and copy it to the clipboard so the user can open and/or bookmark it.
export function CopyLinkButton(props?: CopyLinkButtonProps) {

  const handleClick = () => {
    const base = window.location.href.split('?')[0]
    const url = base + toUrlParams(getAllConfig())
    navigator.clipboard.writeText(url)
  }

  return (
    <button
      onClick={handleClick}
      className="py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 active:bg-green-700 disabled:opacity-50 inline-flex items-center"
      {...props}
    >
      <span className="inline-flex gap-x-2">
        <CopyIcon />
        Copy Link
      </span>
    </button>
  )
}
