/**
 * Hasta donde sé, según esta definición todos las props deben existir y con el tipo indicado.
 * En el caso de imageDark, si no hay pues sera un string vacio.
 * Que sigue esistiendo, pero en vacio y de tipo string. Sigo probando ...
 */
export type projectType = {
  id: string
  name: string
  description: string
  image: string
  imageDark: string
  featured: boolean
  published: boolean
  url: string
  repository: string
  tags: string
}
