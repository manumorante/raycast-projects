import * as fs from 'fs'
import { Color, Icon } from '@raycast/api'
import { projectType } from 'types'

export const cuteURL = (url: string) => {
  url = url || '/'
  return url.split('/').at(-1)
}

// Order projects by featured > published > rest
export function sortProjects(projects: projectType[]) {
  return projects.sort((a: projectType, b: projectType) => {
    if (a.featured === b.featured) {
      return a.published === b.published ? 0 : a.published ? -1 : 1
    } else {
      return a.featured ? -1 : 1
    }
  })
}

// Project icon
export function projectIcon(project: projectType) {
  let source = Icon.Dot
  let tintColor = Color.SecondaryText
  let tooltip = 'Not published'

  if (project.published) {
    tintColor = Color.Blue
    tooltip = 'Published'
  }

  if (project.published && project.featured) {
    source = Icon.Stars
    tintColor = Color.Green
    tooltip = 'Featured'
  }

  return { value: { source, tintColor }, tooltip }
}

// Check if folder exists

export async function checkIfFolderExists(folderPath: string): Promise<boolean> {
  try {
    await fs.promises.access(folderPath)
    return true
  } catch (err) {
    return false
  }
}
