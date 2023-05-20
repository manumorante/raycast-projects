/* eslint-disable @typescript-eslint/no-explicit-any */
import { paths } from 'config'
import { sortProjects } from 'utils'
import { useFetch } from '@raycast/utils'
import Projects from 'components/Projects'
import { projectType } from 'types'

const Main = () => {
  interface Projects {
    projects: projectType[]
  }

  const { data } = useFetch<Projects>(paths.json)

  if (data && data.projects) {
    return <Projects projects={sortProjects(data.projects)} />
  }

  return null
}

export default Main
