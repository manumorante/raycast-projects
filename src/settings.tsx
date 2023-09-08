import { getPreferenceValues, openExtensionPreferences, ActionPanel, Action, Icon, List, Color } from '@raycast/api'
const prefs = getPreferenceValues()

export const paths = {
  projectsFolder: prefs.projectsFolder?.trim(),
  projectsJson: prefs.projectsJson?.trim(),
  host: prefs.host?.trim(),
}

const isProjectsFolder = paths.projectsFolder !== ''
const isProjectsJson = paths.projectsJson !== ''
const isHost = paths.host !== ''

export const isConfigured = isProjectsFolder && isProjectsJson && isHost

const Item = ({ icon, title, value, isReady }: { icon: Icon; title: string; value: string; isReady: boolean }) => {
  return (
    <List.Item
      icon={{ source: icon, tintColor: isReady ? Color.Green : Color.Red }}
      title={title}
      subtitle={isReady ? '' : 'Please, select this setting'}
      accessories={[{ text: isReady ? value : '' }]}
      actions={
        <ActionPanel>
          <Action icon={Icon.Gear} title='Open Extension Preferences' onAction={openExtensionPreferences} />
        </ActionPanel>
      }
    />
  )
}

export default function Command() {
  return (
    <List>
      <List.Section title='Settings'>
        <Item isReady={isProjectsFolder} icon={Icon.Folder} title='Projects folder' value={paths.projectsFolder} />
        <Item isReady={isProjectsJson} icon={Icon.Code} title='JSON' value={paths.projectsJson} />
        <Item isReady={isHost} icon={Icon.Globe} title='Host' value={paths.host} />
      </List.Section>
    </List>
  )
}
