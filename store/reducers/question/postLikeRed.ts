import { action } from "../../common"

export interface getLikeQuestion {
  isDone: boolean
  like: number
  error: string | null
}

const initialState = {
  isDone: false,
  like: 0,
  error: null,
}

function postLikeRed(state: getLikeQuestion = initialState, action: action) {
  switch (action.type) {
    case "GET_LIKE":
      return {
        ...state,
        isDone: true,
        like: action.data,
        error: null,
      }
    case "GET_LIKE_ERROR":
      return {
        ...state,
        isDone: false,
        like: "",
        error: action.data,
      }
    default:
      return { ...state }
  }
}

export default postLikeRed
