// An input that only fires onChange when the user presses enter
//  or the input loses focus, i.e. how onChange works normally outside of React.
// Meant for type: password, text, username.
// Don't use for range sliders or other inputs where you might actually want onChange to immediately fire.
// ref: https://stackoverflow.com/a/62383569
import { Component, InputHTMLAttributes } from 'react'

export interface InputProps {
  type?: string
  onChange?: (event: Event) => void
  onInput?: (event: Event) => void
}

/**
 * This component restores the 'onChange' and 'onInput' behavior of JavaScript.
 *
 * See:
 * - https://reactjs.org/docs/dom-elements.html#onchange
 * - https://github.com/facebook/react/issues/3964
 * - https://github.com/facebook/react/issues/9657
 * - https://github.com/facebook/react/issues/14857
 */
export class Input extends Component<
  Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'onInput' | 'ref'> & InputProps
> {
  private readonly registerCallbacks = (element: HTMLInputElement | null) => {
    if (element) {
      element.onchange = this.props.onChange ? this.props.onChange : null
      element.oninput = this.props.onInput ? this.props.onInput : null
    }
  }

  public render() {
    return (
      <input
        type={this.props.type}
        ref={this.registerCallbacks}
        {...this.props}
        onChange={undefined}
        onInput={undefined}
        className="disabled:opacity-50 bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
      />
    )
  }
}
