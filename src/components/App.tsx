import { saveConfigFromUrlParams } from '../lib/config'
import { Main } from './Main'

export function App() {
  // Parse url params into localstorage config once on page load
  saveConfigFromUrlParams()

  return <Main />
}
