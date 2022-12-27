import { signOut, useSession } from "next-auth/react"
import Link from "next/link"

const Navbar = () => {
  const { data: session } = useSession()

  return (
    <nav className=" flex items-center justify-between">
      <Link
        href="/"
        className="font-mono text-2xl font-semibold  tracking-wider"
      >
        Reducio 🔮
      </Link>
      {session?.user?.id ? (
        <button
          onClick={() => signOut()}
          className="rounded-full bg-white/10 px-8 py-2 font-semibold text-white no-underline transition hover:bg-white/20"
        >
          Logout
        </button>
      ) : null}
    </nav>
  )
}

export default Navbar
