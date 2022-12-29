import { useLinks } from "@/utils/store"
import Link from "next/link"
import { useCallback } from "react"

const Links = () => {
  const links = useLinks((state) => state.links)
  const deleteLink = useLinks((state) => state.deleteLink)
  const copyLink = useCallback((link: string) => navigator.clipboard.writeText(link), [])

  if (links.length)
    return (
      <div className="flex h-full w-full flex-col gap-7 overflow-y-scroll scroll-smooth   ">
        {links.map((link) => (
          <div
            onClick={() => copyLink("http://localhost:3000/s/" + link.slug)}
            key={link.id}
            className="group flex cursor-pointer items-start justify-between gap-5"
          >
            <div className="flex flex-1 flex-col flex-wrap gap-2 overflow-hidden">
              <Link
                href={link.target}
                passHref={true}
                className=" text-xl font-medium transition duration-200 group-hover:text-purple-500"
              >
                {link.slug}
              </Link>
              <p className="break-all text-xs sm:text-sm text-neutral-500">
                {link.target}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button className="bi bi-link-45deg text-3xl transition duration-200 group-hover:text-purple-500"></button>
              <button
                onClick={() => deleteLink(link.slug)}
                className="bi bi-trash3 text-2xl transition duration-200 hover:text-red-500"
              ></button>
            </div>
          </div>
        ))}
      </div>
    )
  else return null
}

export default Links
