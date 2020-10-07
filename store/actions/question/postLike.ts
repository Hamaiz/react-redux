import axios, { AxiosResponse } from "axios"
import { Dispatch } from "react"

// redux
import { action } from "../../common"

export function postLike({ slug }: { slug: string }) {
  return async (dispatch: Dispatch<action>) => {
    try {
      let formData = new FormData()
      formData.append("id", slug)

      const response: AxiosResponse = await axios.post(
        process.env.NEXT_PUBLIC_URL + "/api/get-likes",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )

      if (response.status === 200) {
        dispatch({ type: "GET_LIKE", data: response.data })
      }
    } catch ({ response }: { response: AxiosResponse }) {
      dispatch({ type: "GET_LIKE_ERROR", data: response.data.message })
    }
  }
}
