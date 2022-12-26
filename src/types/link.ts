export interface Link {
  id: number
  slug: string
  target: string
  createdAt: string
  updatedAt: string
  userId: string
}

export interface LinkInput {
  slug: string
  target: string
}

export interface LinkStore {
  error: string
  links: Link[]
  getLinks: () => void
  postLink: (body: LinkInput) => void
  deleteLink: (slug: string) => void
}
