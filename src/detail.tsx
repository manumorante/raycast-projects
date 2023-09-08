/* eslint-disable @typescript-eslint/no-explicit-any */
import { paths } from './settings'
import { checkIfFolderExists, cuteURL } from 'utils'
import { Action, ActionPanel, Color, Detail, Icon } from '@raycast/api'
import { useEffect, useState } from 'react'
import { ProjectProps } from 'types'

export default function ProjectDetails({ project }: { project: ProjectProps }) {
  const [installed, setInstalled] = useState<boolean>(false)

  useEffect(() => {
    async function asyncEffect(folder: string) {
      const folderExists = await checkIfFolderExists(folder)
      setInstalled(folderExists)
    }

    asyncEffect(`${paths.projectsFolder}/${project.id}`)
  }, [])

  const ssh = `git@github.com:manumorante/${project.id}.git`

  const markdown = `
  # ${project.name}
  
  ${project.description}

  <img src="${paths.host}/${project.image}" />
  `

  return (
    <Detail
      markdown={markdown}
      metadata={
        <Detail.Metadata>
          <Detail.Metadata.TagList title='Status'>
            {project.featured && <Detail.Metadata.TagList.Item text='Featured' color='yellow' />}
            {project.published && <Detail.Metadata.TagList.Item text='Published' color='green' />}
            {!project.published && <Detail.Metadata.TagList.Item text='Offline' color='red' />}
          </Detail.Metadata.TagList>

          <Detail.Metadata.Separator />

          {installed ? (
            <Detail.Metadata.Label
              icon={{ source: Icon.Folder, tintColor: Color.Blue }}
              title={`Folder ${project.id}`}
              text='Present'
            />
          ) : (
            <Detail.Metadata.Label icon={Icon.AppWindowGrid2x2} title={`Folder ${project.id}`} text='Not present' />
          )}
          <Detail.Metadata.Link title='URL' target={project.url} text={`${cuteURL(project?.url)}`} />

          <Detail.Metadata.TagList title='Tags'>
            {project.tags.map((tag: string) => (
              <Detail.Metadata.TagList.Item key={`${project.id}/${tag}`} text={tag} />
            ))}
          </Detail.Metadata.TagList>
        </Detail.Metadata>
      }
      actions={
        <ActionPanel>
          <ActionPanel.Section title={project.name}>
            <Action.OpenInBrowser icon={Icon.ArrowNe} title={`Visit the site`} url={project.url} />
            <Action.OpenInBrowser icon={Icon.Code} title='Go to Github' url={project.repository} />
            <Action.CopyToClipboard icon={Icon.Clipboard} title='Copy clone SSH' content={ssh} />
            <Action.Open icon={Icon.Folder} title='Open folder' target={`${paths.projectsFolder}/${project.id}`} />
          </ActionPanel.Section>
        </ActionPanel>
      }
    />
  )
}
