import axios, { AxiosResponse } from "axios"
import { Dispatch } from "react"

// redux
import { action } from "../../common"

export function getMAns({ slug }: { slug: string }) {
  return async (dispatch: Dispatch<action>) => {
    try {
      const response: AxiosResponse = await axios.get(
        process.env.NEXT_PUBLIC_URL + "/api/answers/" + slug,
        {
          headers: {
            "files-get-answers": "files-get-answers",
          },
        }
      )

      if (response.status === 200) {
        dispatch({ type: "GET_ANS", data: response.data })
      }
    } catch ({ response }: { response: AxiosResponse }) {
      dispatch({ type: "GET_ANS_ERROR", data: response.data.message })
    }
  }
}
