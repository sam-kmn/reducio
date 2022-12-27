import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useEffect } from "react"
import Layout from "./layout"

const AuthPage = () => {
  const { status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "authenticated") router.push("/dash")
  }, [status, router])

  return (
    <Layout>
      <main className="flex h-full flex-col items-center justify-center gap-7">
        <h1 className="text-4xl font-medium">Sign in with</h1>
        <button
          onClick={() => signIn("discord")}
          className="bi bi-discord flex items-center justify-center gap-2 rounded bg-violet-500 px-5 py-2 text-xl"
        >
          Discord
        </button>

        <button
          disabled
          onClick={() => signIn("google")}
          className="bi bi-google flex items-center justify-center gap-2 rounded bg-white px-5 py-2 text-xl text-black"
        >
          Google
        </button>
      </main>
    </Layout>
  )
}

export default AuthPage
