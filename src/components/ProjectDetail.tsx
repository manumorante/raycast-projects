/* eslint-disable @typescript-eslint/no-explicit-any */
import { paths } from 'config'
import { checkIfFolderExists, cuteURL } from 'utils'
import { Action, ActionPanel, Color, Detail, Icon } from '@raycast/api'
import { useEffect, useState } from 'react'
import { projectType } from 'types'

const ProjectDetails = ({ project }: { project: projectType }) => {
  const [installed, setInstalled] = useState<boolean>(false)

  useEffect(() => {
    async function asyncEffect(folder: string) {
      const folderExists = await checkIfFolderExists(folder)
      setInstalled(folderExists)
    }

    asyncEffect(`${paths.projects}/${project.id}`)
  }, [])

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
          <Detail.Metadata.Link
            title='Repository'
            target={project.repository}
            text={`${cuteURL(project?.repository)}`}
          />

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
            <Action.OpenInBrowser icon={Icon.ArrowNe} title={`${cuteURL(project.url)}`} url={project.url} />
            <Action.Open icon={Icon.Folder} title='Project folder' target={`${paths.projects}/${project.id}`} />
            <Action.OpenInBrowser icon={Icon.Code} title='Repository' url={project.repository} />
          </ActionPanel.Section>
        </ActionPanel>
      }
    />
  )
}

export default ProjectDetails
