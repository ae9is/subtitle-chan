// ref: https://stackoverflow.com/a/62383569
import { Component, InputHTMLAttributes } from 'react'

export interface InputProps {
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
        ref={this.registerCallbacks}
        {...this.props}
        onChange={undefined}
        onInput={undefined}
      />
    )
  }
}
