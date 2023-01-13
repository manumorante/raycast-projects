/* eslint-disable @typescript-eslint/no-explicit-any */
import { Grid, List } from '@raycast/api'
import ProjectListItem from 'components/ProjectListItem'
import ProjectGridtem from 'components/ProjectGridtem'
import OptionsDropdown from 'components/OptionsDropdown'
import { useState } from 'react'
import { projectType } from 'types'

const Projects = ({ projects }: { projects: projectType[] }) => {
  const [option, setOption] = useState<string>('list')
  const searchBarAccessory = <OptionsDropdown onChange={(value: string) => setOption(value)} />

  if (option === 'list') {
    return (
      <List searchBarAccessory={searchBarAccessory}>
        <List.Section title={`${projects.length} projects as ${option}`}>
          {projects.map((item) => (
            <ProjectListItem key={item.id} project={item} />
          ))}
        </List.Section>
      </List>
    )
  }

  return (
    <Grid searchBarAccessory={searchBarAccessory}>
      <Grid.Section fit='fill' aspectRatio='16/9' columns={3} title={`${projects.length} projects as ${option}`}>
        {projects.map((item) => (
          <ProjectGridtem key={item.id} project={item} />
        ))}
      </Grid.Section>
    </Grid>
  )
}

export default Projects
