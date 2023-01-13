import { getPreferenceValues } from '@raycast/api'

interface Preferences {
  projectsPath: string
  jsonPath: string
}

const prefs = getPreferenceValues<Preferences>()

export const paths = {
  projects: prefs.projectsPath,
  json: prefs.jsonPath,
}

export const isProjects = prefs.projectsPath && prefs.projectsPath?.trim() !== ''
export const isJson = prefs.jsonPath && prefs.jsonPath?.trim() !== ''
export const isConfigured = isProjects && isJson
