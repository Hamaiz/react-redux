import { Dispatch } from "react"

// redux
import { action } from "../../common"

export function errorDispatch({ error }: { error: string }) {
  return (dispatch: Dispatch<action>) => {
    dispatch({ type: "GET_ERROR", data: error })

    // setTimeout(() => {}, 5000)
  }
}
