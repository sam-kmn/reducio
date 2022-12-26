import { type NextPage } from "next"
import Link from "next/link"
import Layout from "./layout"

const Home: NextPage = () => {
  return (
    <Layout>
      <main className="mx-auto flex h-full max-w-lg flex-col items-center justify-start gap-10  pt-32 md:max-w-2xl ">
        <div className="space-y-2 text-center">
          <p className="tracking-widest text-purple-500 md:text-lg">
            DON’T WASTE YOUR TIME
          </p>
          <h1 className="text-5xl font-medium tracking-wide text-white  md:text-6xl lg:text-7xl ">
            Reduce your links
          </h1>
          <h3 className="max-w-2xl text-lg  tracking-wider text-neutral-400 md:text-xl lg:text-2xl">
            With our easy-to-use platform, you can quickly and easily shorten
            and store links for easy sharing.{" "}
          </h3>
        </div>
        <div className="flex items-center justify-center gap-10 text-lg font-medium tracking-wide">
          <Link
            href="/dash"
            className="flex animate-pulse items-center gap-2 text-purple-400"
          >
            <i className="bi bi-rocket-takeoff"></i>
            Getting started
          </Link>
          <Link
            href="https://github.com/sam-kmn"
            passHref={true}
            className="flex items-center gap-2"
          >
            <i className="bi bi-star"></i>
            Give me star
          </Link>
        </div>
        <Link
          href="https://github.com/sam-kmn"
          passHref={true}
          className="fixed inset-x-0 bottom-0 pb-10 text-center font-medium text-neutral-400"
        >
          &copy; 2022 Samuel Kaminski
          <br /> All rights reserved.
        </Link>
      </main>
    </Layout>
  )
}

export default Home
