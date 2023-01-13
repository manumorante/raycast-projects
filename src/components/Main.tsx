/* eslint-disable @typescript-eslint/no-explicit-any */
import { paths } from 'config'
import { sortProjects } from 'utils'
import { useFetch } from '@raycast/utils'
import Projects from 'components/Projects'

/**
 *
 * TODO:
 * - Con el id localizo el folder.
 * - Quizas deberia poner un folder a mano... pero al cosa es no tener tantos nombres iguales, id, name,repo, ...
 * - Puedo comprobar el folder y mostrar un icono (el de chip?) para indicar que esta instlaado (o al menos bajado)
 */

const Main = () => {
  const { data } = useFetch<{ data: string }>(paths.json)
  const json = JSON.parse(`${data}`)
  if (!json || !json?.projects) return null

  return <Projects projects={sortProjects(json.projects)} />
}

export default Main
