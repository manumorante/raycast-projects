/* eslint-disable @typescript-eslint/no-explicit-any */
import { Action, ActionPanel, Grid } from '@raycast/api'
import ProjectDetails from './ProjectDetail'

const ProjectGridtem = ({ project }: { project: any }) => {
  return (
    <Grid.Item
      key={project.id}
      content={project.image}
      title={project.name}
      actions={
        <ActionPanel>
          <Action.Push title={`${project.name}`} target={<ProjectDetails project={project} />} />
        </ActionPanel>
      }
    />
  )
}

export default ProjectGridtem
