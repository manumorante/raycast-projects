import { getPreferenceValues } from '@raycast/api'

interface Preferences {
  projectsPath: string
  jsonPath: string
}

const preferences = getPreferenceValues<Preferences>()

export const paths = {
  projects: preferences.projectsPath,
  json: preferences.jsonPath,
}
