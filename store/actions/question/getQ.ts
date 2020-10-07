import axios, { AxiosResponse } from "axios"
import { Dispatch } from "react"

// redux
import { action } from "../../reducers/question/getQR"

export function getQ({ slug }: { slug: string }) {
  return async (dispatch: Dispatch<action>) => {
    try {
      const response: AxiosResponse = await axios.get(
        process.env.NEXT_PUBLIC_URL + "/api/question/" + slug,
        {
          headers: {
            "files-get-question": "files-get-question",
          },
        }
      )

      if (response.status === 200) {
        dispatch({ type: "GET_Q", data: response.data })
      }
    } catch ({ response }: { response: AxiosResponse }) {
      dispatch({ type: "GET_Q_ERROR", data: response.data.message })
    }
  }
}
