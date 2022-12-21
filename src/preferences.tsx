import { openCommandPreferences, ActionPanel, Action, Icon, List, Color } from '@raycast/api'
import { paths } from '../config'

const isProjects = paths?.projects?.trim()
const isJson = paths?.json?.trim()

export default function Preferences() {
  return (
    <List>
      <List.Item
        key='preferences'
        icon={Icon.Gear}
        title='Open preferences'
        actions={
          <ActionPanel>
            <Action title='Open Preferences' onAction={openCommandPreferences} />
          </ActionPanel>
        }
      />

      <List.Section title='Preferences'>
        <List.Item
          key={1}
          icon={{ source: Icon.Folder, tintColor: isProjects ? Color.Green : Color.Red }}
          title='Projects'
          subtitle={isProjects ? paths.projects : 'Please, select the project folder'}
          accessories={[{ text: 'folder' }]}
          actions={
            <ActionPanel>
              {isProjects && <Action.CopyToClipboard content={paths.projects} />}
              <Action title='Open Preferences' onAction={openCommandPreferences} />
            </ActionPanel>
          }
        />

        <List.Item
          key={2}
          icon={{ source: Icon.Link, tintColor: isJson ? Color.Green : Color.Red }}
          title='JSON'
          subtitle={paths?.json}
          accessories={[{ text: 'textfiled' }]}
          actions={
            <ActionPanel>
              {isJson && <Action.CopyToClipboard content={paths.json} />}
              <Action title='Open Preferences' onAction={openCommandPreferences} />
            </ActionPanel>
          }
        />
      </List.Section>
    </List>
  )
}
