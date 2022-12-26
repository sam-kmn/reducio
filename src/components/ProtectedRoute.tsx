import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { ReactNode, useEffect } from "react"

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") router.push("/auth")
  }, [router, status])

  if (["unauthenticated", "loading"].includes(status)) return null

  return <>{children}</>
}
