import { type NextApiRequest, type NextApiResponse } from "next"
import getServerAuthSession from "@/utils/getServerAuthSession"
import { prisma } from "@/utils/prismaClient"

const link = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerAuthSession({ req, res })

  const { slug } = req.query
  if (!slug)
    return res.send({
      error: "Slug is undefined.",
    })

  switch (req.method) {
    case "GET": {
      try {
        const link = await prisma.link.findUnique({
          where: { slug: slug as string },
        })

        if (!link)
          return res
            .status(400)
            .json({ success: false, message: "Link does not extsts!" })
        res.status(200).json({ success: true, data: link })
      } catch (error) {
        res
          .status(400)
          .json({ success: false, message: "Unable to get data from table." })
      }
      break
    }

    case "DELETE": {
      try {
        const link = await prisma.link.findUnique({
          where: {
            slug: slug as string,
          },
        })

        if (!link)
          return res
            .status(400)
            .json({ success: false, message: "Link doesnt exists" })

        if (link.userId !== session?.user?.id)
          return res
            .status(401)
            .json({ success: false, message: "You are not authenticated" })

        await prisma.link.delete({
          where: {
            id: link.id,
          },
        })

        res.status(200).json({ success: true, data: link })
      } catch (error) {
        res
          .status(400)
          .json({ success: false, message: "Unable to get data from table." })
      }
    }
    default: {
      res.status(404).json({ error: "This method is not allowed" })
      break
    }
  }
}

export default link
