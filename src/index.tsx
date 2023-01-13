import { isConfigured } from 'config'
import Preferences from 'components/preferences'
import Main from 'components/Main'

export default function Command() {
  if (isConfigured) return <Main />

  return <Preferences />
}
