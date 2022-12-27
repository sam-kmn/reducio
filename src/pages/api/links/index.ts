import { type NextApiRequest, type NextApiResponse } from "next"
import getServerAuthSession from "@/utils/getServerAuthSession"
import { prisma } from "@/utils/prismaClient"
import { z } from "zod"

const linkSchema = z.object({
  target: z.string(),
  slug: z.string(),
})

const links = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerAuthSession({ req, res })

  if (!session?.user?.id)
    return res.status(401).send({
      error:
        "You must be signed in to view the protected content on this page.",
    })

  switch (req.method) {
    case "GET": {
      try {
        const links = await prisma.link.findMany({
          where: {
            userId: session.user.id,
          },
        })
        if (!links)
          return res
            .status(404)
            .json({ success: false, message: "There are no links in a table." })
        res.status(200).json({ success: true, data: links })
      } catch (error) {
        res
          .status(400)
          .json({ success: false, message: "Unable to get data from table." })
      }
      break
    }

    case "POST": {
      try {
        // Check for request body
        if (!req.body)
          return res
            .status(406)
            .json({ success: false, message: "Body is required!" })
        // Type safety
        const typeCheck = linkSchema.safeParse(req.body)
        if (!typeCheck.success)
          return res
            .status(406)
            .json({ success: typeCheck.success, message: "Invalid type!" })
        // Checking characters
        if (!/^\w+$/.test(req.body.slug))
          return res
            .status(406)
            .json({
              success: false,
              message: "Slug contains not allowed characters",
            })
        // Is slug unique?
        const links = await prisma.link.findMany({
          where: { slug: req.body.slug },
        })
        if (links.length)
          return res
            .status(406)
            .json({ success: false, message: "Slug is already used!" })
        // Create link
        const link = await prisma.link.create({
          data: {
            ...req.body,
            userId: session.user.id,
          },
        })
        res.status(200).json({ success: true, data: link })
      } catch (error) {
        res.status(400).json({ error })
      }
      break
    }

    default: {
      res.status(405).json({ error: "This method is not allowed" })
      break
    }
  }
}

export default links
