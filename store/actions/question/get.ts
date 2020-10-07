import axios, { AxiosResponse } from "axios"
import { Dispatch } from "react"
import { questions } from "../../reducers/question/getReducer"

// dispatch
interface dispatch {
  type: string
  data: questions[] | string
}

// get() - gets all questions from backend
export function get() {
  return async (dispatch: Dispatch<dispatch>) => {
    try {
      const response: AxiosResponse = await axios.get(
        process.env.NEXT_PUBLIC_URL + "/api/question",
        {
          headers: {
            "files-get-questions": "files-get-questions",
          },
        }
      )

      if (response.status === 200) {
        dispatch({ type: "GET_QUESTION", data: response.data })
      }
    } catch ({ response }: { response: AxiosResponse }) {
      dispatch({ type: "GET_QUESTION_ERROR", data: response.data.message })
    }
  }
}
