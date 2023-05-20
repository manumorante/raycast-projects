/* eslint-disable @typescript-eslint/no-explicit-any */
import { projectIcon } from 'utils'
import { Action, ActionPanel, Icon, List } from '@raycast/api'
import ProjectDetail from 'components/ProjectDetail'
import { projectType } from 'types'

const ProjectListItem = ({ project }: { project: projectType }) => {
  return (
    <List.Item
      key={project.id}
      icon={projectIcon(project)}
      title={project.name}
      accessories={[{ text: project.tags.join(' ') }]}
      keywords={[...project.tags]}
      actions={
        <ActionPanel>
          <Action.Push icon={Icon.Box} title={`${project.name}`} target={<ProjectDetail project={project} />} />
        </ActionPanel>
      }
    />
  )
}

export default ProjectListItem
