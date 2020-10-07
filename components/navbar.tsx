import { ReactElement, KeyboardEvent, useState } from "react"
import Link from "next/link"
import Router from "next/router"

//import
import { searchIcon } from "./svg"

function NavBar(): ReactElement {
  const [search, setSearch] = useState<string>("")

  return (
    <div className="navbar">
      <div className="container">
        <div className="navbar_container">
          <Link href="/">
            <div className="navbar_logo">Files</div>
          </Link>
          <div className="navbar_search">
            <input
              type="text"
              placeholder="Search..."
              onChange={(e) => setSearch(e.target.value)}
              onKeyPress={(e: KeyboardEvent<HTMLInputElement>) =>
                e.key !== "Enter" || !search
                  ? e.preventDefault
                  : Router.push(
                      `/result?search_query=${search
                        .trim()
                        .replace(/\s+/g, "+")}`
                    )
              }
            />
            <div className="navbar_search_icon">{searchIcon}</div>
          </div>
          <div className="navbar_nav">
            <Link href="/account/signup">
              <a>Signup</a>
            </Link>
            <Link href="/account/login">
              <a>Login</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavBar
