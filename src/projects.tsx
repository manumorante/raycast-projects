/* eslint-disable @typescript-eslint/no-explicit-any */
import { paths } from '../config'
import { useFetch } from '@raycast/utils'
import ProjectList from './ProjectList'

/**
 *
 * TODO:
 * - Con el id localizo el folder.
 * - Quizas deberia pnoer un folder a mano... pero al cosa es no tener tantos nombres iguales, id, name,repo, ...
 * - Puedo comprobar el folder y mostrar un icono (el de chip?) para indicar que esta instlaado (o al menos bajado)
 * - Mostar Gallery de proyectoe en modo Grid, asi puedo mostar la imagen OG que todos tienen.
 */

const Projects = () => {
  const { data } = useFetch<{ data: string }>(paths.json)
  const json = JSON.parse(`${data}`)
  return <ProjectList data={json.projects} />
}

export default Projects
