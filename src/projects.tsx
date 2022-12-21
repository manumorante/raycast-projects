/* eslint-disable @typescript-eslint/no-explicit-any */
import { paths } from '../config'
import { Action, ActionPanel, Color, Icon, List } from '@raycast/api'
import { useFetch } from '@raycast/utils'

const Projects = () => {
  const { data, isLoading } = useFetch<{ data: string }>(paths.json)

  return (
    <List isLoading={isLoading}>
      {PROJECTS(`${data}`).map((item: any) => {
        const icon = Icon.Dot
        const title = item.name
        const subtitle = ''
        const accessories = [
          { text: item.tags },
          iconAlert('Link', item.url?.trim()),
          iconAlert('Image', item.image?.trim()),
          // iconAlert('Moon', item.imageDark?.trim()),
          iconAlert('Snippets', item.repository?.trim()),
        ]
        return (
          <List.Item
            key={item.id}
            icon={icon}
            title={title}
            subtitle={subtitle}
            accessories={accessories}
            actions={
              <ActionPanel>
                <ActionPanel.Section title={title}>
                  <Action.OpenInBrowser title={`${item.url}`} url={item.url} />
                  <Action.OpenInBrowser title='Open repository' url={item.repository} />
                  <Action.Open title='Open repository' target={paths.projects} />
                </ActionPanel.Section>
                <ActionPanel.Section title='General'>
                  <Action.Open title='Open projects folder' target={paths.projects} />
                  <Action.Open title='Open extension folder' target={__dirname} />
                </ActionPanel.Section>
              </ActionPanel>
            }
          />
        )
      })}
    </List>
  )
}

const PROJECTS = (data: string) => {
  const json = JSON.parse(data)
  return json.projects
}

const iconAlert = (icon: string, bool: boolean) => {
  if (bool) return {}
  return { icon: { source: (Icon as any)[icon], tintColor: Color.Red } }
}

export default Projects
