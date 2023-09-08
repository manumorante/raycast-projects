import * as fs from 'fs'
import { Color, Icon } from '@raycast/api'
import { ProjectProps } from 'types'

export const cuteURL = (url: string) => {
  url = url || '/'
  return url.split('/').at(-1)
}

// Project icon
export function projectIcon(project: ProjectProps) {
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
