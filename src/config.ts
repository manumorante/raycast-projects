import { getPreferenceValues } from '@raycast/api'

interface Preferences {
  projectsPath: string
  jsonPath: string
  host: string
}

const prefs = getPreferenceValues<Preferences>()

export const paths = {
  projects: prefs.projectsPath,
  json: prefs.jsonPath,
  host: prefs.host,
}

export const isHost = prefs.host && prefs.host?.trim() !== ''
export const isProjects = prefs.projectsPath && prefs.projectsPath?.trim() !== ''
export const isJson = prefs.jsonPath && prefs.jsonPath?.trim() !== ''
export const isConfigured = isHost && isProjects && isJson
