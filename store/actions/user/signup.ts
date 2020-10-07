import axios, { AxiosResponse } from "axios"
import { Dispatch } from "react"

// redux
import { action } from "../../common"

export function signup({
  name,
  email,
  password,
}: {
  name: string
  email: string
  password: string
}) {
  return async (dispatch: Dispatch<action>) => {
    try {
      let formData = new FormData()
      formData.append("name", name)
      formData.append("email", email)
      formData.append("password", password)

      const response: AxiosResponse = await axios.post(
        process.env.NEXT_PUBLIC_URL + "/account/signup",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )

      if (response.status === 200) {
        dispatch({ type: "POST_SIGNUP", data: response.data })
      }
    } catch ({ response }: { response: AxiosResponse }) {
      dispatch({ type: "POST_SIGNUP_ERROR", data: response.data.message })
    }
  }
}
