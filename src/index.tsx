import { paths } from '../config'
import Preferences from './preferences'
import Projects from './projects'
const isConfigured = paths?.json?.trim() && paths?.projects?.trim()

export default function Command() {
  if (!isConfigured) return <Preferences />

  return <Projects />
}
