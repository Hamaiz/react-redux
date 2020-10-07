import React from "react"
import Head from "next/head"

// Imports
import NavBar from "./navbar"
import Footer from "./footer"
import Error from "./error"

type LayoutProps = {
  children: React.ReactNode
  keyword?: string
  title?: string
  errorType?: boolean
}

function Layout({
  children,
  keyword = "files, question, answer",
  title = "",
  errorType = false,
}: LayoutProps) {
  return (
    <>
      <Head>
        <title>Files {title}</title>
        <meta
          name="description"
          content="Files is a questioning and answer site"
        />
        <meta name="keywords" content={keyword} />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <NavBar />
      <Error type={errorType} />
      {children}
      <Footer />
    </>
  )
}

export default Layout
