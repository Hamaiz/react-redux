import axios, { AxiosResponse } from "axios"
import { Dispatch } from "react"
import { questions } from "../../reducers/question/getReducer"

// dispatch
interface dispatch {
  type: string
  data: questions[] | string
}

// get() - gets all questions from backend
export function postSearch({ search }: { search: string }) {
  return async (dispatch: Dispatch<dispatch>) => {
    try {
      let formData = new FormData()
      formData.append("search", search)
      const response: AxiosResponse = await axios.post(
        process.env.NEXT_PUBLIC_URL + "/api/search",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )

      console.log(response)

      if (response.status === 200) {
        dispatch({ type: "GET_S_QUESTION", data: response.data })
      }
    } catch ({ response }: { response: AxiosResponse }) {
      dispatch({ type: "GET_S_QUESTION_ERROR", data: response.data.message })
    }
  }
}
