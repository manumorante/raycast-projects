import Settings, { isConfigured, paths } from 'settings'

import { useFetch } from '@raycast/utils'
import { Action, ActionPanel, Color, Grid, Icon, List, openExtensionPreferences } from '@raycast/api'
import { useState } from 'react'
import ProjectDetail from 'detail'
import { ProjectProps } from 'types'

export default function Command() {
  if (!isConfigured) return <Settings />

  const { data, isLoading } = useFetch(paths.projectsJson, { parseResponse: parseProjects })
  const [viewAs, setViewAs] = useState('')
  const optionsDropdown = <OptionsDropdown onChange={(value: string) => setViewAs(value)} />
  const props = { searchBarPlaceholder: 'Search for projects...', searchBarAccessory: optionsDropdown }
  const sectionProps = { title: `${data?.length} projects in total` }

  if (isLoading) return <List isLoading={isLoading} {...props} />

  if (viewAs === 'list')
    return (
      <List {...props}>
        <List.Section {...sectionProps}>
          {data?.map((p) => (
            <List.Item
              key={p.id}
              icon={{ source: Icon.Circle, tintColor: Color.SecondaryText }}
              title={p.name}
              accessories={[{ text: p.featured ? 'Featured' : '' }, { text: p.published ? '' : 'Unpublished' }]}
              actions={<Actions project={p} />}
            />
          ))}
        </List.Section>
      </List>
    )

  if (viewAs === 'grid')
    return (
      <Grid {...props}>
        <Grid.Section fit={Grid.Fit.Fill} aspectRatio='16/9' columns={3} {...sectionProps}>
          {data?.map((p) => (
            <Grid.Item
              key={p.id}
              content={paths.host + '/' + p.image}
              title={p.name}
              actions={<Actions project={p} />}
            />
          ))}
        </Grid.Section>
      </Grid>
    )
}

async function parseProjects(response: Response) {
  const json = await response.json()
  return json.projects.sort((a: ProjectProps, b: ProjectProps) => {
    if (a.featured === b.featured) {
      return a.published === b.published ? 0 : a.published ? -1 : 1
    } else {
      return a.featured ? -1 : 1
    }
  }) as ProjectProps[]
}

function OptionsDropdown(props: { onChange: (newValue: string) => void }) {
  const dropOptions = [
    { id: 'grid', title: 'Images' },
    { id: 'list', title: 'List' },
  ]

  return (
    <List.Dropdown tooltip='Options' storeValue={true} onChange={(value) => props.onChange(value)}>
      <List.Dropdown.Section title='View as'>
        {dropOptions.map((item) => (
          <List.Dropdown.Item key={item.id} title={item.title} value={item.id} />
        ))}
      </List.Dropdown.Section>
    </List.Dropdown>
  )
}

function Actions({ project }: { project: ProjectProps }) {
  return (
    <ActionPanel>
      <Action.Push icon={Icon.Eye} title='View project' target={<ProjectDetail project={project} />} />
      <ActionPanel.Section title='General'>
        <Action.Push icon={Icon.Gear} title='View Settings' target={<Settings />} />
        <Action icon={Icon.Gear} title='Open Extension Preferences' onAction={openExtensionPreferences} />
      </ActionPanel.Section>
    </ActionPanel>
  )
}
