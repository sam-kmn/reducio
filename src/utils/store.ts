import { Link, LinkInput, LinkStore } from "@/types/link"
import create from "zustand"

export const useLinks = create<LinkStore>((set) => ({
  error: "",
  links: [],
  getLinks: async () => {
    try {
      const response = await fetch("api/links")
      const data = await response.json()
      if (data.success) set({ links: data.data })
    } catch (error) {
      console.log(error)
    }
  },
  postLink: async (body: LinkInput) => {
    try {
      const response = await fetch("api/links", {
        method: "POST",
        body: JSON.stringify(body),
        headers: new Headers({
          "Content-Type": "application/json",
          Accept: "application/json",
        }),
      })
      const data = await response.json()
      if (!data.success) throw Error(data.message)
      set((state: LinkStore) => ({ links: [...state.links, data.data] }))
      return { success: true }
    } catch (error) {
      console.log(error)
      set({ error: error!.toString() })
      return { success: false }
    }
  },
  deleteLink: async (slug: string) => {
    try {
      const response = await fetch("api/links/" + slug, {
        method: "DELETE",
        headers: new Headers({
          "Content-Type": "application/json",
          Accept: "application/json",
        }),
      })
      const data = await response.json()
      if (!data.success) return set({ error: data.message })
      set((state: LinkStore) => ({
        links: [
          ...state.links.filter((link: Link) => link.id !== data.data.id),
        ],
      }))
    } catch (error) {
      console.log(error)
    }
  },
}))
