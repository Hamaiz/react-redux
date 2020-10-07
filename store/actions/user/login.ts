import axios, { AxiosResponse } from "axios"
import { Dispatch } from "react"

// redux
import { action } from "../../common"

export function login({
  email,
  password,
}: {
  email: string
  password: string
}) {
  return async (dispatch: Dispatch<action>) => {
    try {
      let formData = new FormData()
      formData.append("email", email)
      formData.append("password", password)

      const response: AxiosResponse = await axios.post(
        process.env.NEXT_PUBLIC_URL + "/account/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )

      if (response.status === 200) {
        dispatch({ type: "POST_LOGIN", data: response.data })
      }
    } catch ({ response }: { response: AxiosResponse }) {
      console.log(response)

      dispatch({ type: "POST_LOGIN_ERROR", data: response.data.message })
    }
  }
}
