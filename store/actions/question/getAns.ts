import axios, { AxiosResponse } from "axios"
import { Dispatch } from "react"

// dispatch
interface dispatch {
  type: string
  data: string
}

export function getAns({ slug }: { slug: string }) {
  return async (dispatch: Dispatch<dispatch>) => {
    try {
      const response: AxiosResponse = await axios.get(
        process.env.NEXT_PUBLIC_URL + "/api/answer/" + slug,
        {
          headers: {
            "files-get-answer": "files-get-answer",
          },
        }
      )

      if (response.status === 200) {
        dispatch({ type: "GET_ONE_ANS", data: response.data })
      }
    } catch ({ response }: { response: AxiosResponse }) {
      dispatch({ type: "GET_ONE_ANS_ERROR", data: response.data.message })
    }
  }
}
