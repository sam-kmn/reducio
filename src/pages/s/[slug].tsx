import { useRouter } from "next/router"
import { useState, useEffect } from "react"

const RedirectPage = () => {
  const router = useRouter()
  const { slug } = router.query
  const [error, setError] = useState()

  useEffect(() => {
    const navigateToPage = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/links/" + slug)
        const data = await response.json()
        if (!data.success) setError(data.message)
        else window.location.href = data.data.target
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    }
    if (slug) navigateToPage()
  }, [slug])

  if (error)
    return (
      <div className="flex h-full w-full items-center justify-center text-3xl lg:text-4xl">
        {error}
      </div>
    )
  else return null
}

export default RedirectPage
