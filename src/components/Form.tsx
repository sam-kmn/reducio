import { useLinks } from "@/utils/store"
import { useState, useCallback } from "react"
import type { ChangeEvent } from "react"

const Form = () => {
  const error = useLinks((state) => state.error)
  const postLink = useLinks((state) => state.postLink)
  const [form, setForm] = useState({ target: "", slug: "" })
  const handleForm = useCallback(
    (e: ChangeEvent<HTMLInputElement>) =>
      setForm({ ...form, [e.target.name]: e.target.value }),
    [form]
  )

  return (
    <form
      className="flex w-full flex-col  gap-5"
      onSubmit={async (event) => {
        event.preventDefault()
        const response = await postLink(form)
        if (response.success) setForm({ target: "", slug: "" })
      }}
    >
      <input
        name="target"
        placeholder="Type URL here..."
        type="text"
        className="rounded-xl bg-neutral-800/70 px-6 py-2 text-lg ring-purple-800 transition duration-200 focus:outline-none focus:ring-2"
        value={form.target}
        onChange={(e) => handleForm(e)}
        required
      />
      <div className="flex items-center justify-between gap-5  ">
        <input
          name="slug"
          placeholder="Custom slug"
          type="text"
          className="flex-1 rounded-xl bg-neutral-800/70 px-6 py-2 text-lg lowercase ring-purple-800 transition duration-200 focus:outline-none focus:ring-2"
          value={form.slug}
          required
          onChange={(e) => {
            if (/^\w*$/.test(e.target.value)) handleForm(e)
          }}
        />
        <button
          type="submit"
          className=" h-full rounded-full bg-neutral-800/70 px-4 transition duration-200 hover:bg-purple-500 hover:text-white focus:bg-purple-700 sm:px-8 "
        >
          <span className="hidden sm:inline-block">Reduce</span>
          <span className="bi bi-box sm:hidden"></span>
        </button>
      </div>
      <p className="text-red-500">{error}</p>
    </form>
  )
}

export default Form
