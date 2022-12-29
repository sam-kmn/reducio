import Layout from "../layout"
import Links from "@/components/Links"
import Form from "@/components/Form"
import { ProtectedRoute } from "@/components/ProtectedRoute"
import { useLinks } from "@/utils/store"
import { useEffect } from "react"

const Dashboard = () => {
  const getLinks = useLinks((state) => state.getLinks)

  useEffect(() => {
    getLinks()
  }, [getLinks])

  return (
    <ProtectedRoute>
      <Layout>
        <main className="   flex h-full w-full max-w-xl flex-col gap-10  border-red-500 pt-10  ">
          <h1 className="text-center text-3xl font-medium sm:text-4xl lg:text-5xl">
            Let&apos;s reduce your link!
          </h1>
          <Form />
          <Links />
        </main>
      </Layout>
    </ProtectedRoute>
  )
}

export default Dashboard
